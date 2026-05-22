<template>
  <div class="flex p-4 xiaoqu-list">
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
          <a-button type="primary" @click="handleCreate"> 添加 </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  icon: 'ant-design:insert-row-left-outlined',
                  label: '楼栋',
                  onClick: handleLou.bind(null, record),
                },
                {
                  icon: 'clarity:note-edit-line',
                  label: '编辑',
                  onClick: handleEdit.bind(null, record),
                },
                {
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  label: '删除',
                  popConfirm: {
                    title: '是否确认删除',
                    placement: 'left',
                    confirm: handleDelete.bind(null, record),
                  },
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>

      <FormDrawer @register="registerDrawer" @success="handleSuccess" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, unref } from 'vue';
  import { BasicTree } from '@/components/Tree';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { xiaoquDel, xiaoquPage } from '@/api/Page/xiaoqu';
  import { useMessage } from '@/hooks/web/useMessage';
  import { router } from '@/router';
  import { orgList } from '@/api/sys/org';
  import { three } from '@/utils/three';

  const { push } = router;
  const { createMessage } = useMessage();

  const treeData = ref<any[]>([]);
  const selectedKeys = ref<string[]>([]);
  const currentOrgId = ref<string | undefined>(undefined);
  const BasicTreeRef = ref<any>(null);

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '小区列表',
    api: (params) => {
      if (!currentOrgId.value) {
        return Promise.resolve({ records: [], total: 0 });
      }
      return xiaoquPage({ ...params, orgId: currentOrgId.value });
    },
    columns,
    isTreeTable: false,
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
      width: 220,
    },
  });

  onMounted(() => {
    handleOrgList();
  });

  const handleOrgList = async () => {
    const res = await orgList({});
    const data = three(res);
    treeData.value = data;
    // 默认选中第一个节点
    if (data.length > 0) {
      let targetNode = data[0] as any;
      while (targetNode?.children?.length > 0) {
        targetNode = targetNode.children[0];
      }
      selectedKeys.value = [targetNode?.id];
      currentOrgId.value = targetNode?.id;
    }
    await reload();
    unref(BasicTreeRef)?.expandAll(true);
  };

  function onTreeSelect(keys: string[]) {
    selectedKeys.value = keys;
    currentOrgId.value = keys[0];
    reload();
  }

  function handleCreate() {
    openDrawer(true, { isUpdate: false });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, { record, isUpdate: true });
  }

  const handleDelete = (record: Recordable) => {
    xiaoquDel(record.id).then(() => {
      reload();
      createMessage.success('成功');
    });
  };

  const handleLou = (record: Recordable) => {
    push({ path: '/xiaoqu/loudong', query: { id: record.id, name: record.name } });
  };

  function handleSuccess() {
    reload();
  }
</script>

<style scoped lang="less">
  .xiaoqu-list {
    :deep .ant-tree {
      padding: 10px;
    }
    .vben-basic-table {
      padding: 0;
    }
  }
</style>
