<template>
  <div>
    <BasicTable @register="registerTable" class="p-4">
      <template #toolbar>
        <AButton type="primary" @click="addOrEdit({}, 'add')">前端功能新增</AButton>
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

        <template v-if="column.key === 'icon'">
          <TableImg
            :size="38"
            class="TableImg"
            :simpleShow="false"
            :imgList="[record.icon || '']"
          />
        </template>
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, TableImg } from '@/components/Table';
  import { columns, searchFormSchema } from './table.data';
  import { menuPage, delMenu } from '@/api/Page/prosceniumUser/frontMenu';
  import { message } from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';
  import AButton from '@/components/Button/src/BasicButton.vue';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '前台菜单',
    api: menuPage,
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
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  // 新增 or 编辑
  const addOrEdit = (type, val) => openDrawer(true, { type: type, val });

  // 删除
  const handleDelete = (v) => {
    delMenu(v.id).then((res) => {
      res ? message.success('删除成功！') : message.error('删除失败！');
      reload();
    });
  };

  // 弹窗关闭刷新
  const handleSuccess = () => reload();
</script>
<style style="" lang="scss">
  .TableImg {
    background: #0960bd;
    margin: 0 auto;
    border-radius: 5px;
    padding: 5px;
    .ant-image {
      margin: 0;
    }
  }
</style>
