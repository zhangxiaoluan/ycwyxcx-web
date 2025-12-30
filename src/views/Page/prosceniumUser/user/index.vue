<template>
  <div class="user-home">
    <BasicTable @register="registerTable">
      <!-- 操作 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
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
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { columns, searFormSchemas } from './user.data';
  import { userPage, delUser } from '@/api/Page/prosceniumUser/user/';

  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    title: '用户管理',
    api: userPage,
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searFormSchemas,
    },
    useSearchForm: true,
    isTreeTable: false,
    pagination: true,
    canResize: false,
    showTableSetting: true,
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  // 删除
  const handleDelete = (v) => {
    delUser(v.id).then((res) => {
      res ? createMessage.success('删除成功！') : createMessage.error('删除失败！');
      reload();
    });
  };
</script>
<style lang="less" scoped>
  .user-home {
    height: 100%;
    overflow: hidden;
  }
</style>
