<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
        <Tooltip title="导出所有数据" class="export-icon">
          <UploadOutlined :style="{ fontSize: '15pt' }" @click="handleExport" />
        </Tooltip>
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

        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:sync-outlined',
                label: '密码重置',
                color: 'warning',
                popConfirm: {
                  title: '是否重置密码？',
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
  import { Tooltip, Tag, message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import FormDrawer from './FormDrawer.vue';
  import { columns } from './data';
  import { communityPage } from '@/api/Page/community';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '社区列表',
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
  // function handleDelete(record: Recordable) {
  //   remove(record.id);
  //   reload();
  // }

  // 重置密码
  const restPas = (pas) => {
    resetPasswd(pas.userId).then((res) => {
      if (res) {
        message.success('密码重置成功');
      }
    });
  };

  function handleExport() {
    window.location.href = exportExcel();
  }

  function handleSuccess() {
    reload();
  }

  // function onFetchSuccess() {
  //   // 演示默认展开所有表项
  //   nextTick(expandAll);
  // }
</script>

<style></style>
