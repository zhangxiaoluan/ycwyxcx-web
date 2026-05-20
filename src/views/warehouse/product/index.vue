<template>
  <div class="flex p-4 warehouse-product">
    <div class="mr-3 w-1/5 min-w-[200px]">
      <BasicTree
        title="组织机构"
        :tree-data="treeData"
        :field-names="{ title: 'name', key: 'id', children: 'children' }"
        :default-expand-all="true"
        :selected-keys="selectedKeys"
        ref="BasicTreeRef"
        search
        @select="onTreeSelect"
      />
    </div>

    <div class="flex-1">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate" :disabled="!currentOrgId">
            添加商品
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag :color="record.status === 1 ? 'green' : 'red'">
              {{ record.status === 1 ? '启用' : '停用' }}
            </Tag>
          </template>

          <template v-if="column.key === 'stockQuantity'">
            <span :style="{ color: record.stockQuantity <= record.warningQuantity ? 'red' : '' }">
              {{ record.stockQuantity }}
            </span>
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
                    title: '是否确认删除？',
                    placement: 'left',
                    confirm: handleDelete.bind(null, record),
                  },
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>

      <ProductDrawer @register="registerDrawer" @success="handleSuccess" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, unref } from 'vue';
  import { Tag, message } from 'ant-design-vue';
  import { BasicTree } from '@/components/Tree';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getProductPage, deleteProduct } from '@/api/warehouse/product';
  import { useDrawer } from '@/components/Drawer';
  import { orgList } from '@/api/sys/org';
  import { closeParent, three } from '@/utils/three';
  import ProductDrawer from './ProductDrawer.vue';
  import { columns, searchFormSchema } from './data';

  const treeData = ref<any[]>([]);

  const selectedKeys = ref<string[]>([]);

  const currentOrgId = ref<string | undefined>(undefined);

  const BasicTreeRef = ref<any>(null);

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '商品管理',
    api: (params) => {
      if (!currentOrgId.value) {
        return Promise.resolve({ records: [], total: 0 });
      }
      return getProductPage({ communityId: currentOrgId.value, ...params });
    },
    columns,
    pagination: true,
    striped: true,
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      baseColProps: { xxl: 6, lg: 12, sm: 24, xs: 24 },
    },
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 180,
    },
  });

  onMounted(() => {
    handleOrgList();
  });

  // 处理组织树
  const handleOrgList = async () => {
    const res = await orgList({});
    const data = three(res);
    closeParent(data);
    treeData.value = data;
    // 获取第一个叶子节点（递归查找没有子节点的节点）
    let targetNode = data[0] as any;
    while (targetNode?.children?.length > 0) {
      targetNode = targetNode.children[0];
    }
    const self = [targetNode?.id];
    selectedKeys.value = self;
    currentOrgId.value = self[0];
    await reload();
    unref(BasicTreeRef).expandAll(true);
  };

  function onTreeSelect(keys: string[]) {
    selectedKeys.value = keys;
    currentOrgId.value = keys[0];
    reload();
  }

  function handleCreate() {
    openDrawer(true, { isUpdate: false, communityId: currentOrgId.value });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, { record, isUpdate: true, communityId: currentOrgId.value });
  }

  async function handleDelete(record: Recordable) {
    await deleteProduct(record.id);
    message.success('删除成功');
    await reload();
  }

  function handleSuccess() {
    reload();
  }
</script>

<style scoped lang="less">
  .warehouse-product {
    :deep .ant-tree {
      padding: 10px;
    }
    .vben-basic-table {
      padding: 0;
    }
  }
</style>
