<template>
  <div class="flex p-4 renyuan-list">
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
      <BasicTable @register="registerTable" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, unref } from 'vue';
  import { BasicTree } from '@/components/Tree';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { communityUserPage } from '@/api/Page/xiaoqu';
  import { orgList } from '@/api/sys/org';
  import { three } from '@/utils/three';

  const treeData = ref<any[]>([]);
  const selectedKeys = ref<string[]>([]);
  const currentOrgId = ref<string | undefined>(undefined);
  const BasicTreeRef = ref<any>(null);

  const [registerTable, { reload }] = useTable({
    title: '人员列表',
    api: (params) => {
      if (!currentOrgId.value) {
        return Promise.resolve({ records: [], total: 0 });
      }
      return communityUserPage({ ...params, orgId: currentOrgId.value });
    },
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    isTreeTable: false,
    pagination: true,
    striped: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  onMounted(() => {
    handleOrgList();
  });

  const handleOrgList = async () => {
    const res = await orgList({});
    const data = three(res);
    treeData.value = data;
    if (data.length > 0) {
      let targetNode = data[0] as any;
      while (targetNode?.children?.length > 0) {
        targetNode = targetNode.children[0];
      }
      selectedKeys.value = [targetNode?.id];
      currentOrgId.value = targetNode?.id;
    }
    await reload();
    unref(BasicTreeRef)?.expandAll(true);
  };

  function onTreeSelect(keys: string[]) {
    selectedKeys.value = keys;
    currentOrgId.value = keys[0];
    reload();
  }
</script>

<style scoped lang="less">
  .renyuan-list {
    :deep .ant-tree {
      padding: 10px;
    }
    .vben-basic-table {
      padding: 0;
    }
  }
</style>
