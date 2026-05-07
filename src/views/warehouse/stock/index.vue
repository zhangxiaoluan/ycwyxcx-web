<template>
  <div class="flex p-4">
    <div class="mr-3 w-1/4 min-w-[250px]">
      <BasicTree
        title="组织机构"
        :tree-data="treeData"
        :field-names="{ title: 'name', key: 'id', children: 'children' }"
        :default-expand-all="true"
        :selected-keys="selectedKeys"
        search
        @select="onTreeSelect"
      />
    </div>

    <div class="flex-1">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleStockIn" :disabled="!currentOrgId">
            入库
          </a-button>
          <a-button @click="handleStockOut" :disabled="!currentOrgId" class="ml-2">
            出库
          </a-button>
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
  import { ref, onMounted } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { BasicTree } from '@/components/Tree';
  import { BasicTable, useTable } from '@/components/Table';
  import { getStockRecordPage } from '@/api/warehouse/stock';
  import { useDrawer } from '@/components/Drawer';
  import { orgList } from '@/api/sys/org';
  import { three } from '@/utils/three';
  import StockDrawer from './StockDrawer.vue';
  import { columns, searchFormSchema } from './data';

  const treeData = ref<any[]>([]);
  const selectedKeys = ref<string[]>([]);
  const currentOrgId = ref<string | undefined>(undefined);

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
      schemas: searchFormSchema,
    },
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    canResize: false,
  });

  onMounted(async () => {
    const res = await orgList({});
    treeData.value = three(res);
  });

  function onTreeSelect(keys: string[]) {
    selectedKeys.value = keys;
    currentOrgId.value = keys[0];
    reload();
  }

  function handleStockIn() {
    openDrawer(true, { type: 1, communityId: currentOrgId.value });
  }

  function handleStockOut() {
    openDrawer(true, { type: 2, communityId: currentOrgId.value });
  }

  function handleSuccess() {
    reload();
  }
</script>
