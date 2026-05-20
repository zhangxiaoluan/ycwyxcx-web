<template>
  <div class="flex p-4 warehouse-stock">
    <div class="mr-3 w-1/5 min-w-[200px]">
      <BasicTree
        title="组织机构"
        :tree-data="treeData"
        :field-names="{ title: 'name', key: 'id', children: 'children' }"
        :default-expand-all="true"
        :selected-keys="selectedKeys"
        search
        ref="BasicTreeRef"
        @select="onTreeSelect"
      />
    </div>

    <div class="flex-1">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleStockIn" :disabled="!currentOrgId">
            入库
          </a-button>
          <a-button @click="handleStockOut" :disabled="!currentOrgId" class="ml-2"> 出库 </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'type'">
            <Tag :color="record.type === 1 ? 'green' : 'orange'">
              {{ record.type === 1 ? '入库' : '出库' }}
            </Tag>
          </template>
        </template>
      </BasicTable>

      <StockDrawer @register="registerDrawer" @success="handleSuccess" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, unref } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { BasicTree } from '@/components/Tree';
  import { BasicTable, useTable } from '@/components/Table';
  import { getStockRecordPage } from '@/api/warehouse/stock';
  import { useDrawer } from '@/components/Drawer';
  import { orgList } from '@/api/sys/org';
  import { closeParent, three } from '@/utils/three';
  import StockDrawer from './StockDrawer.vue';
  import { columns, searchFormSchema } from './data';

  const treeData = ref<any[]>([]);

  const selectedKeys = ref<string[]>([]);

  const currentOrgId = ref<string | undefined>(undefined);

  const BasicTreeRef = ref<any>(null);

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '出入库记录',
    api: (params) => {
      if (!currentOrgId.value) {
        return Promise.resolve({ records: [], total: 0 });
      }
      return getStockRecordPage({ communityId: currentOrgId.value, ...params });
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

  // 选择组织树
  function onTreeSelect(keys: string[]) {
    selectedKeys.value = keys;
    currentOrgId.value = keys[0];
    reload();
  }

  // 入库
  function handleStockIn() {
    openDrawer(true, { type: 1, communityId: currentOrgId.value });
  }

  // 出库
  function handleStockOut() {
    openDrawer(true, { type: 2, communityId: currentOrgId.value });
  }

  function handleSuccess() {
    reload();
  }
</script>

<style scoped lang="less">
  .warehouse-stock {
    :deep .ant-tree {
      padding: 10px;
    }
    .vben-basic-table {
      padding: 0;
    }
  }
</style>
