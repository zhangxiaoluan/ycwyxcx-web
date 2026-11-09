import { BasicColumn, FormSchema } from '@/components/Table';

// 状态/时间列由 index.vue 的 bodyCell 插槽渲染
export const columns: BasicColumn[] = [
  { title: '申请人', dataIndex: 'applicantName', width: 110 },
  { title: '手机号', dataIndex: 'applicantPhone', width: 130 },
  { title: '申请角色', dataIndex: 'appliedRoleName', width: 120 },
  { title: '申请说明', dataIndex: 'applicationReason', ellipsis: true },
  { title: '状态', dataIndex: 'status', key: 'status', width: 90 },
  { title: '申请时间', dataIndex: 'createTime', key: 'createTime', width: 170 },
  { title: '审核人', dataIndex: 'reviewerName', width: 100 },
  { title: '审核时间', dataIndex: 'reviewTime', key: 'reviewTime', width: 170 },
  { title: '审核意见', dataIndex: 'reviewComment', ellipsis: true },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'applicantName',
    label: '申请人',
    component: 'Input',
  },
  {
    field: 'applicantPhone',
    label: '手机号',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '待审核', value: 0 },
        { label: '审核通过', value: 1 },
        { label: '审核拒绝', value: 2 },
      ],
    },
  },
];
