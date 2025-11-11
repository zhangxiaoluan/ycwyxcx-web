<template>
  <div>
    <BasicTable @register="registerTable" class="p-4">
      <template #toolbar>
        <a-button type="primary" @click="addOrEdit('add', {})">新增字典</a-button>
      </template>
      <!-- 操作 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: addOrEdit.bind(null, 'edit', record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
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
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { columns } from './dict.data';
  import { dictTree, delDict } from '@/api/sys/dict';
  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';
  import { three } from '@/utils/three';

  export default defineComponent({
    name: 'Dict',
    components: { BasicTable, TableAction, DetailDrawer },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();

      const [registerTable, { reload }] = useTable({
        title: '字典列表',
        api: () => {
          return new Promise((resolve) => {
            dictTree().then((res) => {
              resolve(three(res));
            });
          });
        },
        columns,
        isTreeTable: true,
        pagination: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: false,
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'bodyCell' },
          fixed: undefined,
        },
      });

      // 新增 or 编辑
      const addOrEdit = (type, record) => {
        openDrawer(true, { type: type, record });
      };

      // 删除
      const handleDelete = async (record) => {
        let id = record.id;
        await delDict(id).then((res) => {
          res ? message.success('删除成功！') : message.error('删除失败！');
          reload();
        });
      };

      // 弹窗关闭刷新
      const handleSuccess = () => reload();

      return {
        registerTable,
        registerDrawer,
        addOrEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
