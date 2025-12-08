<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'coverImage'">
          <TableImg :imgList="[record.coverImage]" />
        </template>

        <template v-if="column.key === 'status'">
          <Tag color="blue" v-if="record.status == 0">草稿</Tag>
          <Tag color="green" v-if="record.status == 1">已发布</Tag>
          <Tag color="red" v-if="record.status == 2">已下线</Tag>
        </template>

        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:arrow-up-outlined',
                label: '发布',
                ifShow: record.status == 0 || record.status == 2,
                onClick: handleStatus.bind(null, record, 2),
              },
              {
                icon: 'ant-design:arrow-down-outlined',
                label: '下线',
                ifShow: record.status == 0 || record.status == 1,
                onClick: handleStatus.bind(null, record, 1),
              },
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

  import { useMessage } from '@/hooks/web/useMessage';
  import { articlePage, articleDel, articleStatus } from '@/api/Page/gonggao';

  const { createMessage } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '轮播图列表',
    api: articlePage,
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
    articleDel(record.id).then((res) => {
      if (res) {
        createMessage.success('成功');
        reload();
      }
    });
  };

  // 发布下线
  const handleStatus = (record: Recordable, status: number) => {
    articleStatus(record.id, status).then(() => {
      createMessage.success('成功');
      reload();
    });
  };

  function handleSuccess() {
    reload();
  }
</script>

<style></style>
