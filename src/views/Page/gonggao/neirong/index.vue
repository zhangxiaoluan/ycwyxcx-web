<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'roles'">
          <Tag
            color="#0960BD"
            v-for="(item, index) in record['roles']"
            :key="index"
            class="!mr-2 !mb-2"
          >
            {{ item.roleName }}
          </Tag>
        </template>

        <template v-if="column.key === 'priority'">
          <Tag :color="record.priority === 2 ? 'red' : record.priority === 1 ? 'orange' : 'default'">
            {{ record.priority === 2 ? '紧急' : record.priority === 1 ? '重要' : '普通' }}
          </Tag>
        </template>

        <template v-if="column.key === 'status'">
          <Tag :color="record.status === 1 ? 'green' : record.status === 2 ? 'orange' : 'default'">
            {{ record.status === 1 ? '已发布' : record.status === 2 ? '已撤回' : '草稿' }}
          </Tag>
        </template>

        <template v-if="column.key === 'isTop'">
          <Tag :color="record.isTop === 1 ? 'blue' : 'default'">
            {{ record.isTop === 1 ? '置顶' : '普通' }}
          </Tag>
        </template>

        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:cloud-upload-outlined',
                label: '发布',
                ifShow: record.status !== 1,
                onClick: handlePublish.bind(null, record),
              },
              {
                icon: 'ant-design:rollback-outlined',
                label: '撤回',
                ifShow: record.status === 1,
                onClick: handleWithdraw.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                label: '编辑',
                ifShow: record.status !== 1,
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                label: '删除',
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
  import { Tag, message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { announcementPage, announcementDel, announcementPublish, announcementWithdraw } from '@/api/Page/gonggao';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '内容列表',
    api: announcementPage,
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

  // 发布
  const handlePublish = (record: Recordable) => {
    announcementPublish(record.id).then(() => {
      message.success('发布成功');
      reload();
    });
  };

  // 撤回
  const handleWithdraw = (record: Recordable) => {
    announcementWithdraw(record.id).then(() => {
      message.success('已撤回');
      reload();
    });
  };

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
    announcementDel(record.id).then(() => {
      message.success('成功');
      reload();
    });
  };

  function handleSuccess() {
    reload();
  }
</script>
