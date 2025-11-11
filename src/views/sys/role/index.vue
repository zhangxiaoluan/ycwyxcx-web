<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteRole, roleAl } from '@/api/sys/role';
  import { useDrawer } from '@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import { columns, searchFormSchema } from './role.data';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: roleAl,
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    isTreeTable: false,
    pagination: true,
    striped: true,
    canResize: false,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  // 创建打开
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  // 编辑打开
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  // 删除角色
  async function handleDelete(record: Recordable) {
    if (await deleteRole(record.id)) await reload();
  }

  function handleSuccess() {
    reload();
  }
</script>
