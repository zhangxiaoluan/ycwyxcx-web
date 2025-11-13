<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <!--      <template #toolbar>-->
      <!--        <a-button type="primary" @click="handleCreate"> 添加 </a-button>-->
      <!--      </template>-->

      <!--      <template #bodyCell="{ column, record }">-->
      <!--        <template v-if="column.key === 'action'">-->
      <!--          <TableAction-->
      <!--            :actions="[-->
      <!--              {-->
      <!--                icon: 'clarity:note-edit-line',-->
      <!--                label: '编辑',-->
      <!--                onClick: handleEdit.bind(null, record),-->
      <!--              },-->
      <!--              {-->
      <!--                icon: 'ant-design:sync-outlined',-->
      <!--                label: '密码重置',-->
      <!--                color: 'warning',-->
      <!--                popConfirm: {-->
      <!--                  title: '是否重置密码？',-->
      <!--                  placement: 'left',-->
      <!--                  confirm: restPas.bind(null, record),-->
      <!--                },-->
      <!--              },-->
      <!--            ]"-->
      <!--          />-->
      <!--        </template>-->
      <!--      </template>-->
    </BasicTable>

    <!--    <FormDrawer @register="registerDrawer" @success="handleSuccess" />-->
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  // import { useDrawer } from '@/components/Drawer';
  // import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { communityPage } from '@/api/Page/community';

  // const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable] = useTable({
    title: '社区',
    api: communityPage,
    columns,
    isTreeTable: false,
    pagination: true,
    striped: true,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    // actionColumn: {
    //   title: '操作',
    //   dataIndex: 'action',
    //   // slots: { customRender: 'action' },
    //   fixed: 'right',
    // },
  });

  // // 新增
  // function handleCreate() {
  //   openDrawer(true, {
  //     isUpdate: false,
  //   });
  // }

  // // 编辑
  // function handleEdit(record: Recordable) {
  //   openDrawer(true, {
  //     record,
  //     isUpdate: true,
  //   });
  // }

  // function handleSuccess() {
  //   reload();
  // }

  // function onFetchSuccess() {
  //   // 演示默认展开所有表项
  //   nextTick(expandAll);
  // }
</script>

<style></style>
