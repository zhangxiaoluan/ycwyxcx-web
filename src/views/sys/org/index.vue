<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加部门 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
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
    <OrgDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { orgList, deleteOrg } from '@/api/sys/org';
  import { useDrawer } from '@/components/Drawer';
  import OrgDrawer from './OrgDrawer.vue';
  import { columns, searchFormSchema } from './org.data';
  import { three } from '@/utils/three';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '组织机构列表',
    api: (e) => {
      return new Promise((resolve) => {
        orgList(e).then((res) => {
          resolve(three(res));
        });
      });
    },
    columns,
    formConfig: {
      labelWidth: 50,
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    pagination: true,
    striped: true,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  const handleCreate = () => {
    console.log('hello...');
    openDrawer(true, {
      isUpdate: false,
    });
  };

  const handleEdit = (record) => {
    console.log('hello...', record);
    openDrawer(true, {
      record: { ...record.self },
      isUpdate: true,
    });
  };

  const handleDelete = (record) => {
    console.log('delete...', record);
    deleteOrg(record.self.id);
    reload();
  };

  const handleSuccess = () => {
    console.log('drawer success');
    reload();
  };
</script>

<style></style>
