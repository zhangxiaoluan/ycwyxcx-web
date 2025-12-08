<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
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

    <FormDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { buildingHouseList, buildingHouseDel } from '@/api/Page/xiaoqu';
  import { useMessage } from '@/hooks/web/useMessage';
  import { router } from '@/router';

  const { createMessage } = useMessage();

  const { currentRoute } = router;

  let query = currentRoute.value.query || {};

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: `${query.name}（房间列表）`,
    api: () => {
      return buildingHouseList(query.id);
    },
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
      fixed: 'right',
    },
  });

  // 新增
  function handleCreate() {
    openDrawer(true, {
      buildingId: query.id,
      communityId: query.communityId,
      isUpdate: false,
    });
  }

  // 编辑
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      buildingId: query.id,
      communityId: query.communityId,
      isUpdate: true,
    });
  }

  // 删除
  const handleDelete = (record: Recordable) => {
    buildingHouseDel(record.id).then(() => {
      reload();
      createMessage.success('成功');
    });
  };

  function handleSuccess() {
    reload();
  }
</script>

<style></style>
