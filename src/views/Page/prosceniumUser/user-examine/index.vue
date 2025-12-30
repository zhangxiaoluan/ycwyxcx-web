<template>
  <div>
    <BasicTable @register="registerTable" class="p-4">
      <template #toolbar>
        <AButton type="primary" @click="addOrEdit({}, 'add')">新增审核</AButton>
      </template>

      <!-- 操作 -->
      <template #bodyCell="{ column, record }">
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

        <template v-if="column.key === 'orgName'">
          <Tag
            color="blue"
            v-for="(item, index) in record['orgNames']"
            :key="index"
            class="!mr-2 !mb-2"
          >
            <span>{{ item }}</span>
          </Tag>
        </template>
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { columns, searchFormSchema } from './table.data';
  import { userExamineList, delUserExamine } from '@/api/Page/prosceniumUser/user-examine';
  import { Tag } from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '用户审核',
    api: userExamineList,
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
  const handleDelete = async (v) => {
    delUserExamine(v.roleId, v.userId).then((res) => {
      res ? createMessage.success('删除成功！') : createMessage.error('删除失败！');
      reload();
    });
  };

  // 弹窗关闭刷新
  const handleSuccess = () => reload();
</script>
