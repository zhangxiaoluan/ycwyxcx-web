<template>
  <div class="flex p-4 shenhe-list">
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
        <template #toolbar> </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag v-if="record.status == 1" color="blue">待审核</Tag>
            <Tag v-if="record.status == 2" color="green">通过</Tag>
            <Tag v-if="record.status == 3" color="red">拒绝</Tag>
          </template>

          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  label: '审核',
                  ifShow: record.status == 1,
                  onClick: handleEdit.bind(null, record, '2'),
                },
                {
                  icon: 'clarity:note-edit-line',
                  label: '解除绑定',
                  ifShow: record.status == 2,
                  onClick: handleEdit.bind(null, record, '3'),
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
  import { Tag } from 'ant-design-vue';
  import { BasicTree } from '@/components/Tree';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { bindingList } from '@/api/Page/xiaoqu';
  import { orgList } from '@/api/sys/org';
  import { three } from '@/utils/three';

  const treeData = ref<any[]>([]);
  const selectedKeys = ref<string[]>([]);
  const currentOrgId = ref<string | undefined>(undefined);
  const BasicTreeRef = ref<any>(null);

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '审核列表',
    api: (params) => {
      if (!currentOrgId.value) {
        return Promise.resolve({ records: [], total: 0 });
      }
      return bindingList({ ...params, orgId: currentOrgId.value });
    },
    columns,
    isTreeTable: false,
    pagination: false,
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
    },
  });

  onMounted(() => {
    handleOrgList();
  });

  const handleOrgList = async () => {
    const res = await orgList({});
    const data = three(res);
    treeData.value = data;
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

  function handleEdit(record: Recordable, type) {
    openDrawer(true, {
      record,
      isUpdate: type == 2,
    });
  }

  function handleSuccess() {
    reload();
  }
</script>

<style scoped lang="less">
  .shenhe-list {
    :deep .ant-tree {
      padding: 10px;
    }
    .vben-basic-table {
      padding: 0;
    }
  }
</style>
