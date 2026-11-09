<template>
  <div class="flex p-4 access-page">
    <!-- 左侧组织机构树：选中小区的设备才会列出 -->
    <div class="mr-3 w-1/5 min-w-[200px]">
      <BasicTree
        title="组织机构"
        :tree-data="treeData"
        :field-names="{ title: 'name', key: 'id', children: 'children' }"
        :default-expand-all="true"
        :selected-keys="selectedKeys"
        search
        ref="BasicTreeRef"
        @select="onTreeSelect"
      />
    </div>

    <div class="flex-1">
      <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :loading="syncing" @click="handleSync"> 同步设备 </a-button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'online'">
          <Tag :color="isOnline(record) ? 'green' : 'default'">
            {{ isOnline(record) ? '在线' : '离线' }}
          </Tag>
        </template>
        <template v-if="column.key === 'doorScope'">
          <Tag v-if="isCommunityDoor(record)" color="blue">小区公共门</Tag>
          <Tag v-else color="cyan">单元门</Tag>
        </template>
        <template v-if="column.key === 'buildingName'">
          <Tag v-if="isCommunityDoor(record) && !record.communityId" color="warning">未指定小区</Tag>
          <span v-else-if="isCommunityDoor(record)">{{ record.communityName }} · 全小区可开</span>
          <Tag v-else-if="!record.buildingId" color="warning">未绑定</Tag>
          <span v-else>
            {{ record.communityName }} · {{ record.buildingName
            }}{{ record.unit && record.unit !== '0' ? ` · ${record.unit}单元` : '' }}
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '开门',
                onClick: handleControl.bind(null, record, 'open'),
              },
              {
                label: '关门',
                onClick: handleControl.bind(null, record, 'close'),
              },
              {
                label: '常开',
                onClick: handleControl.bind(null, record, 'always_open'),
              },
              {
                label: '恢复',
                onClick: handleControl.bind(null, record, 'resume'),
              },
              {
                label: '绑定',
                onClick: handleBind.bind(null, record),
              },
              {
                label: isEnabled(record) ? '停用' : '启用',
                onClick: handleToggleStatus.bind(null, record),
              },
            ]"
          />
        </template>
        </template>
      </BasicTable>
    </div>

    <!-- 绑定/归属弹窗 -->
    <a-modal
      :open="bindVisible"
      :title="`${bindForm.doorScope === 2 ? '绑定小区' : '绑定楼栋'} - ${bindDoor?.name || ''}`"
      @ok="submitBind"
      @cancel="bindVisible = false"
      :confirmLoading="bindSubmitting"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="小区" required>
          <a-select
            v-model:value="bindForm.communityId"
            placeholder="请选择小区"
            :options="communityOptions"
            @change="onCommunityChange"
          />
        </a-form-item>
        <a-form-item v-if="bindForm.doorScope !== 2" label="楼栋" required>
          <a-select
            v-model:value="bindForm.buildingId"
            placeholder="请选择楼栋"
            :options="buildingOptions"
            :disabled="!bindForm.communityId"
          />
        </a-form-item>
        <a-alert
          v-if="bindForm.doorScope === 2"
          type="info"
          show-icon
          message="小区公共门（如小区大门/北门）不绑定楼栋，该小区所有审核通过的业主、家人、租客在小程序上都可开启。"
        />
        <a-alert
          v-else-if="bindDoor?.unit && bindDoor.unit !== '0'"
          type="info"
          show-icon
          :message="`该设备厂商位置为 ${bindDoor.unit} 单元，绑定后业主端将显示在对应楼栋下`"
        />

        <!-- 门类型默认按设备自动识别；识别错了再手动改 -->
        <a-form-item v-if="showTypeSwitch" label="门类型">
          <a-radio-group v-model:value="bindForm.doorScope" @change="onScopeChange">
            <a-radio :value="1">单元门（仅本楼栋可开）</a-radio>
            <a-radio :value="2">小区公共门（全小区可开）</a-radio>
          </a-radio-group>
        </a-form-item>
        <div v-else class="type-switch-tip">
          <a @click="showTypeSwitch = true">门类型识别有误？点击修改</a>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, unref } from 'vue';
  import { Tag, message } from 'ant-design-vue';
  import { BasicTree } from '@/components/Tree';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import {
    accessSync,
    doorPage,
    doorUpdate,
    doorControl,
    communityEnabled,
    buildingByCommunity,
  } from '@/api/Page/access';
  import { orgList } from '@/api/sys/org';
  import { three } from '@/utils/three';
  import { doorColumns } from './data';

  const syncing = ref(false);
  const bindVisible = ref(false);
  const bindSubmitting = ref(false);
  const bindDoor = ref<Recordable | null>(null);
  const showTypeSwitch = ref(false);
  const communityOptions = ref<any[]>([]);
  const buildingOptions = ref<any[]>([]);
  const bindForm = reactive({
    communityId: undefined as string | undefined,
    buildingId: undefined as string | undefined,
    doorScope: 1 as number,
  });

  // 左侧组织机构树
  const treeData = ref<any[]>([]);
  const selectedKeys = ref<string[]>([]);
  const currentOrgId = ref<string | undefined>(undefined);
  const unboundMode = ref(false);
  const unboundCount = ref(0);
  const BasicTreeRef = ref<any>(null);
  const UNBOUND_KEY = 'unbound';

  const [registerTable, { reload, setProps }] = useTable({
    title: '门禁设备',
    api: (params) => {
      if (unboundMode.value) {
        return doorPage({ ...params, unbound: true });
      }
      if (!currentOrgId.value) {
        return Promise.resolve({ records: [], total: 0 });
      }
      return doorPage({ ...params, orgId: currentOrgId.value });
    },
    columns: doorColumns,
    pagination: true,
    striped: true,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 340,
    },
  });

  onMounted(() => {
    handleOrgList();
  });

  async function handleOrgList() {
    const res = await orgList({});
    const data = three(res);
    // 顶部虚拟节点：所有无法正常授权的设备（单元门未绑楼栋 / 小区门未指定小区）
    treeData.value = [{ id: UNBOUND_KEY, name: '未绑定设备' }, ...data];
    // 默认选中第一个叶子节点，避免首屏空白
    if (data.length > 0) {
      let targetNode = data[0] as any;
      while (targetNode?.children?.length > 0) {
        targetNode = targetNode.children[0];
      }
      selectedKeys.value = [targetNode?.id];
      currentOrgId.value = targetNode?.id;
    }
    await loadUnboundCount();
    await reload();
    unref(BasicTreeRef)?.expandAll(true);
  }

  // 未绑定设备数量，显示在树节点上
  async function loadUnboundCount() {
    try {
      const res = await doorPage({ current: 1, size: 1, unbound: true });
      unboundCount.value = res?.total || 0;
      const node = treeData.value.find((n) => n.id === UNBOUND_KEY);
      if (node) {
        node.name = unboundCount.value > 0 ? `未绑定设备 (${unboundCount.value})` : '未绑定设备';
      }
    } catch (e) {
      console.error('获取未绑定设备数量失败', e);
    }
  }

  function onTreeSelect(keys: string[]) {
    selectedKeys.value = keys;
    if (keys[0] === UNBOUND_KEY) {
      unboundMode.value = true;
      currentOrgId.value = undefined;
    } else {
      unboundMode.value = false;
      currentOrgId.value = keys[0];
    }
    setProps({ title: unboundMode.value ? '未绑定设备' : '门禁设备' });
    reload();
  }

  // 后端开启了 write_numbers_as_strings，数字字段是字符串，统一用 Number 比较
  function isOnline(record: Recordable) {
    return Number(record.online) === 1;
  }
  function isCommunityDoor(record: Recordable) {
    return Number(record.doorScope) === 2;
  }
  function isEnabled(record: Recordable) {
    return Number(record.status) === 1;
  }

  // 同步设备（从门禁中间服务拉取最新设备列表与在线状态）
  async function handleSync() {
    syncing.value = true;
    try {
      const res = await accessSync();
      message.success(typeof res === 'string' ? res : '同步完成');
      await loadUnboundCount();
      reload();
    } finally {
      syncing.value = false;
    }
  }

  // 远程控制
  async function handleControl(record: Recordable, action: string) {
    const labels = { open: '开门', close: '关门', always_open: '常开', resume: '恢复' };
    const doorLabel = record.communityName
      ? `${record.communityName} ${record.buildingName || ''}（${record.name}）`
      : record.name;
    try {
      await doorControl(record.id, action);
      message.success(`${doorLabel} ${labels[action]}成功`);
      reload();
    } catch (e) {
      console.error(e);
    }
  }

  // 打开绑定弹窗
  async function handleBind(record: Recordable) {
    bindDoor.value = record;
    bindForm.communityId = record.communityId || undefined;
    bindForm.buildingId = record.buildingId || undefined;
    bindForm.doorScope = isCommunityDoor(record) ? 2 : 1;
    showTypeSwitch.value = false;
    bindVisible.value = true;
    if (communityOptions.value.length === 0) {
      const communities = await communityEnabled();
      communityOptions.value = (communities || []).map((c) => ({
        label: c.name,
        value: c.id,
      }));
    }
    if (bindForm.communityId) {
      await loadBuildings(bindForm.communityId);
    } else {
      buildingOptions.value = [];
    }
  }

  async function onCommunityChange(communityId: string) {
    bindForm.buildingId = undefined;
    await loadBuildings(communityId);
  }

  // 切换门类型：小区公共门不需要楼栋；改回单元门且已选小区则补加载楼栋
  async function onScopeChange() {
    if (bindForm.doorScope === 2) {
      bindForm.buildingId = undefined;
    } else if (bindForm.communityId) {
      await loadBuildings(bindForm.communityId);
    }
  }

  async function loadBuildings(communityId: string) {
    const buildings = await buildingByCommunity(communityId);
    buildingOptions.value = (buildings || []).map((b) => ({
      label: b.name,
      value: b.id,
    }));
  }

  // 提交绑定
  async function submitBind() {
    if (!bindForm.communityId) {
      message.warning('请选择小区');
      return;
    }
    if (bindForm.doorScope !== 2 && !bindForm.buildingId) {
      message.warning('请选择楼栋');
      return;
    }
    bindSubmitting.value = true;
    try {
      await doorUpdate({
        id: bindDoor.value?.id,
        communityId: bindForm.communityId,
        buildingId: bindForm.doorScope === 2 ? null : bindForm.buildingId,
        doorScope: bindForm.doorScope,
      });
      message.success('绑定成功');
      bindVisible.value = false;
      await loadUnboundCount();
      reload();
    } finally {
      bindSubmitting.value = false;
    }
  }

  // 启用/停用
  async function handleToggleStatus(record: Recordable) {
    const next = isEnabled(record) ? 0 : 1;
    await doorUpdate({
      id: record.id,
      status: next,
      communityId: record.communityId,
      buildingId: record.buildingId,
      doorScope: record.doorScope,
    });
    message.success(next === 1 ? '已启用' : '已停用（业主端不再显示）');
    reload();
  }
</script>

<style scoped lang="less">
  .access-page {
    :deep .ant-tree {
      padding: 10px;
    }
    .vben-basic-table {
      padding: 0;
    }
  }
  .type-switch-tip {
    text-align: right;
    margin-top: 8px;
    a {
      font-size: 12px;
      color: #999;
    }
  }
</style>
