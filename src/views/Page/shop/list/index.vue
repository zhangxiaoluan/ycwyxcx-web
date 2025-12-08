<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <Tag color="red" v-if="record.status == 0">下架</Tag>
          <Tag color="green" v-if="record.status == 1">上架</Tag>
        </template>

        <template v-if="column.key === 'image'">
          <TableImg :imgList="[record.image]" />
        </template>

        <template v-if="column.key === 'images'">
          <TableImg :imgList="[record.images]" />
        </template>

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
                label: '删除',
                color: 'error',
                popConfirm: {
                  title: '是否删除？',
                  placement: 'left',
                  confirm: restPas.bind(null, record),
                },
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
  import { BasicTable, useTable, TableAction, TableImg } from '@/components/Table';
  import { Tag } from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { productDel, productList } from '@/api/Page/shop';

  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '商品列表',
    api: productList,
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
      // slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  // 新增
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  // 编辑
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  // 删除
  const restPas = (record: Recordable) => {
    productDel(record.id).then((res) => {
      if (res) {
        createMessage.success('成功');
        reload();
      }
    });
  };

  function handleSuccess() {
    reload();
  }
</script>

<style></style>
