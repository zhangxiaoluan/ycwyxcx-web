<template>
  <div class="p-4 property-apply">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <Tag :color="statusColor(record)">{{ statusLabel(record) }}</Tag>
        </template>
        <template v-if="column.key === 'createTime'">{{ formatTime(record.createTime) }}</template>
        <template v-if="column.key === 'reviewTime'">{{ formatTime(record.reviewTime) }}</template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '审核',
                ifShow: isPending(record),
                onClick: handleReview.bind(null, record),
              },
              {
                label: '详情',
                ifShow: !isPending(record),
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <a-modal
      :open="modalVisible"
      :title="isReviewMode ? '物业申请审核' : '物业申请详情'"
      :width="560"
      :confirm-loading="submitting"
      :ok-text="isReviewMode ? '提交审核' : '关闭'"
      :cancel-button-props="{ style: { display: isReviewMode ? '' : 'none' } }"
      @ok="onOk"
      @cancel="modalVisible = false"
    >
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="申请人">
          {{ current?.applicantName }}（{{ current?.applicantPhone }}）
        </a-form-item>
        <a-form-item label="申请角色">{{ current?.appliedRoleName }}</a-form-item>
        <a-form-item label="申请说明">{{ current?.applicationReason || '无' }}</a-form-item>

        <template v-if="isReviewMode">
          <a-form-item label="审核结果" required>
            <a-radio-group v-model:value="form.status">
              <a-radio :value="1">通过</a-radio>
              <a-radio :value="2">拒绝</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item v-if="form.status === 1" label="分配角色" required>
            <a-select
              v-model:value="form.finalRoleId"
              :options="roleOptions"
              placeholder="请选择要分配的角色"
            />
          </a-form-item>
          <a-form-item v-if="form.status === 2" label="拒绝原因" required>
            <a-textarea v-model:value="form.rejectReason" :rows="3" placeholder="请填写拒绝原因" />
          </a-form-item>
          <a-form-item label="审核意见">
            <a-textarea v-model:value="form.reviewComment" :rows="2" placeholder="可选" />
          </a-form-item>
        </template>

        <template v-else>
          <a-form-item label="审核结果">
            <Tag :color="statusColor(current)">{{ statusLabel(current) }}</Tag>
          </a-form-item>
          <a-form-item label="审核人">{{ current?.reviewerName || '-' }}</a-form-item>
          <a-form-item label="审核时间">{{ formatTime(current?.reviewTime) }}</a-form-item>
          <a-form-item label="审核意见">{{ current?.reviewComment || '-' }}</a-form-item>
          <a-form-item v-if="Number(current?.status) === 2" label="拒绝原因">
            {{ current?.rejectReason || '-' }}
          </a-form-item>
          <a-form-item v-if="Number(current?.status) === 1" label="分配角色">
            {{ current?.finalRoleName || current?.appliedRoleName }}
          </a-form-item>
        </template>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Tag, message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import {
    propertyApplyPage,
    propertyApplyReview,
    availablePropertyRoles,
  } from '@/api/Page/property';
  import { columns, searchFormSchema } from './data';

  const [registerTable, { reload }] = useTable({
    title: '物业申请审核',
    api: propertyApplyPage,
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
      width: 120,
    },
  });

  const modalVisible = ref(false);
  const isReviewMode = ref(true);
  const submitting = ref(false);
  const current = ref<Recordable | null>(null);
  const roleOptions = ref<any[]>([]);

  const form = reactive({
    status: 1,
    finalRoleId: undefined as string | undefined,
    reviewComment: '',
    rejectReason: '',
  });

  // 后端开启了 write_numbers_as_strings，数字字段是字符串
  function statusValue(record: Recordable | null) {
    return Number(record?.status);
  }
  function statusLabel(record: Recordable | null) {
    const map: Record<number, string> = { 0: '待审核', 1: '审核通过', 2: '审核拒绝' };
    return map[statusValue(record)] || '未知';
  }
  function statusColor(record: Recordable | null) {
    const map: Record<number, string> = { 0: 'orange', 1: 'green', 2: 'red' };
    return map[statusValue(record)] || 'default';
  }
  function isPending(record: Recordable) {
    return statusValue(record) === 0;
  }
  function formatTime(value?: string) {
    return value ? String(value).replace('T', ' ').substring(0, 19) : '-';
  }

  // 兼容后端可能返回数组或分页对象；ID 统一转成字符串，避免数字/字符串不一致导致下拉匹配不上
  function normalizeRoleList(res: any): any[] {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.records)) return res.records;
    if (Array.isArray(res?.list)) return res.list;
    if (Array.isArray(res?.result)) return res.result;
    return [];
  }

  function toIdString(value: any) {
    return value === undefined || value === null || value === '' ? undefined : String(value);
  }

  function resetForm(record: Recordable) {
    form.status = 1;
    // 默认沿用申请人选择的角色，审核人可改为其他物业角色
    form.finalRoleId = toIdString(record.appliedRoleId);
    form.reviewComment = '';
    form.rejectReason = '';
  }

  async function loadRoles() {
    if (roleOptions.value.length > 0) return;
    try {
      const roles = await availablePropertyRoles();
      roleOptions.value = normalizeRoleList(roles)
        .filter((role) => role && role.id !== undefined && role.id !== null)
        .map((role) => ({
          label: role.name || role.roleName || role.code || String(role.id),
          value: String(role.id),
        }));
    } catch (e) {
      message.error('获取可分配角色失败，请稍后重试');
    }
  }

  // 如果申请的角色不在下拉列表中，补一条，保证选中值能显示角色名称而不是 ID
  function ensureCurrentRoleInOptions(record: Recordable) {
    const currentId = form.finalRoleId;
    if (!currentId) return;
    if (roleOptions.value.some((option) => option.value === currentId)) return;
    roleOptions.value = [
      ...roleOptions.value,
      {
        label: record.appliedRoleName || record.finalRoleName || String(currentId),
        value: String(currentId),
      },
    ];
  }

  async function handleReview(record: Recordable) {
    current.value = record;
    resetForm(record);
    isReviewMode.value = true;
    modalVisible.value = true;
    await loadRoles();
    ensureCurrentRoleInOptions(record);
  }

  function handleDetail(record: Recordable) {
    current.value = record;
    isReviewMode.value = false;
    modalVisible.value = true;
  }

  function onOk() {
    if (!isReviewMode.value) {
      modalVisible.value = false;
      return;
    }
    submitReview();
  }

  async function submitReview() {
    if (!current.value) return;
    if (form.status === 1 && !form.finalRoleId) {
      message.warning('请选择要分配的角色');
      return;
    }
    if (form.status === 2 && !form.rejectReason.trim()) {
      message.warning('请填写拒绝原因');
      return;
    }
    submitting.value = true;
    try {
      await propertyApplyReview({
        applicationId: current.value.id,
        status: form.status,
        finalRoleId: form.status === 1 ? form.finalRoleId : null,
        reviewComment: form.reviewComment || null,
        rejectReason: form.status === 2 ? form.rejectReason : null,
      });
      message.success(form.status === 1 ? '审核通过，已分配角色' : '已拒绝该申请');
      modalVisible.value = false;
      reload();
    } finally {
      submitting.value = false;
    }
  }
</script>

<style lang="less" scoped>
  .property-apply {
    :deep(.ant-table-wrapper) {
      padding: 0;
    }
  }
</style>
