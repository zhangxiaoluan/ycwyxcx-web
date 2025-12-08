<template>
  <div class="p-4">
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
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Tag } from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { bindingList } from '@/api/Page/xiaoqu';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '审核列表',
    api: bindingList,
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
      // slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  // 编辑
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

<style></style>
