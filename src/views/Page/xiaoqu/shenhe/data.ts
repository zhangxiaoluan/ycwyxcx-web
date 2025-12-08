import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户昵称',
    dataIndex: 'realName',
  },
  {
    title: '小区名称',
    dataIndex: 'communityName',
  },
  {
    title: '楼栋',
    dataIndex: 'buildingName',
  },
  {
    title: '房间号',
    dataIndex: 'roomNumber',
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'auditRemark',
    label: '审核备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
];
