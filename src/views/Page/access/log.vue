<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <Tag :color="actionColor[record.action] || 'default'">{{ actionLabel[record.action] || record.action }}</Tag>
        </template>
        <template v-if="column.key === 'source'">
          <Tag :color="isAppSource(record) ? 'blue' : 'purple'">
            {{ isAppSource(record) ? '小程序' : '物业后台' }}
          </Tag>
        </template>
        <template v-if="column.key === 'result'">
          <Tag :color="isSuccess(record) ? 'green' : 'red'">
            {{ isSuccess(record) ? '成功' : '失败' }}
          </Tag>
          <div v-if="!isSuccess(record)" class="fail-reason">{{ record.failReason }}</div>
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
  import { Tag } from 'ant-design-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { logPage } from '@/api/Page/access';
  import { logColumns } from './data';

  const actionLabel = { open: '开门', close: '关门', always_open: '常开', resume: '恢复' };
  const actionColor = { open: 'green', close: 'default', always_open: 'orange', resume: 'blue' };

  // 后端开启了 write_numbers_as_strings，数字字段是字符串
  function isAppSource(record: Recordable) {
    return Number(record.source) === 1;
  }
  function isSuccess(record: Recordable) {
    return Number(record.result) === 1;
  }

  const [registerTable] = useTable({
    title: '门禁操作记录',
    api: logPage,
    columns: logColumns,
    pagination: true,
    striped: true,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });
</script>

<style scoped>
  .fail-reason {
    font-size: 12px;
    color: #999;
  }
</style>
