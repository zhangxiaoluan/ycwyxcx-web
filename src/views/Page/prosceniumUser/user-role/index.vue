<template>
  <div>
    <BasicTable @register="registerTable" class="p-4">
      <template #toolbar>
        <a-button type="primary" @click="addOrEdit({}, 'add')">新增角色</a-button>
      </template>

      <!-- 操作 -->
      <template #bodyCell="{ column, record }">
        <!-- 角色插槽 -->
        <template v-if="column.key === 'roleName'">
          <Tag
            v-for="(role, index) in record.roleInfos"
            :key="index"
            class="roleInfo"
            color="rgb(52 124 203)"
          >
            {{ role.roleName }}
          </Tag>
        </template>

        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                label: '编辑',
                onClick: addOrEdit.bind(null, 'edit', record),
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
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { columns, searchFormSchema } from './table.data';
  import { userRolePage, delUserRole } from '@/api/Page/prosceniumUser/user-role';
  import { message, Tag } from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: userRolePage,
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    isTreeTable: false,
    pagination: true,
    striped: true,
    canResize: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  // 新增 or 编辑
  const addOrEdit = (type, val) => openDrawer(true, { type: type, val });

  // 删除
  const handleDelete = (v) => {
    delUserRole(v.userId).then((res) => {
      res ? message.success('删除成功！') : message.error('删除失败！');
      reload();
    });
  };

  // 弹窗关闭刷新
  const handleSuccess = () => reload();
</script>

<style>
  .roleInfo {
    margin-bottom: 5px;
    margin-right: 5px !important;
    padding: 0 5px;
  }
</style>
