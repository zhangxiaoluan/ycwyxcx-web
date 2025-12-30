<template>
  <div class="user-home">
    <Row class="h-full">
      <Col :md="4" class="h-screen !h-full">
        <div class="col-4-main">
          <div class="three-main">
            <BasicTree
              class="menu-tree"
              :treeData="orgListArr"
              search
              @select="selectThree"
              :fieldNames="{ title: 'name', key: 'id' }"
            />
          </div>
        </div>
      </Col>

      <Col :md="20" class="h-full">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <AButton type="primary" @click="addOrEdit({}, 'add')">新增用户</AButton>
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
          </template>
        </BasicTable>
      </Col>
    </Row>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Row, Col } from 'ant-design-vue';
  import { orgList } from '@/api/sys/org';
  import { columns, searFormSchemas } from './user.data';
  import { userPage, delUser } from '@/api/Page/prosceniumUser/user/';
  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';
  import { three } from '@/utils/three/';
  import { BasicTree } from '@/components/Tree';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  // 组织树节点
  const orgListArr = ref<any[]>([]);

  const orgId = ref();

  orgList({}).then((res) => (orgListArr.value = three(res)));

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '用户管理',
    api: userPage,
    beforeFetch: (val) => {
      return {
        ...val,
        orgId: orgId.value,
      };
    },
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

  // 组织更新列表数据
  const selectThree = async (val) => {
    orgId.value = val[0];
    await reload();
  };

  // 新增 or 编辑
  const addOrEdit = (type, val) => openDrawer(true, { type: type, val });

  // 删除
  const handleDelete = (v) => {
    delUser(v.id).then((res) => {
      res ? createMessage.success('删除成功！') : createMessage.error('删除失败！');
      reload();
    });
  };

  // 弹窗关闭刷新
  const handleSuccess = () => reload();
</script>
<style lang="less" scoped>
  .user-home {
    height: 100%;
    overflow: hidden;
  }
  .h-screen {
    padding: 16px 0 0 16px;
  }
  .col-4-main {
    background-color: #ffffff;
    padding: 10px 10px 0 10px;
    .three-main {
      height: calc(100vh - 180px);
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  ::v-deep .scroll-container .scrollbar__wrap {
    margin-bottom: 0 !important;
  }
  .z-panel {
    background-color: #fff;
    padding: 10px;
    //overflow: hidden;
    .ant-list-item {
      padding: 12px 25px;
    }
  }
  .extra-edit .ant-btn {
    font-size: 12px;
  }
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
