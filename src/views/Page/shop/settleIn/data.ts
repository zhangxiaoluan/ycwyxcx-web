import { BasicColumn, FormSchema } from '@/components/Table';
//

export const columns: BasicColumn[] = [
  { title: '商户名称', dataIndex: 'merchantName', fixed: 'left' },
  { title: '联系人', dataIndex: 'contactName' },
  { title: '联系电话', dataIndex: 'contactPhone' },
  { title: '分成比例', dataIndex: 'splitRate' },
];

export const formSchema: FormSchema[] = [
  {
    field: 'merchantName',
    label: '商户名称',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'contactName',
    label: '联系人',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'contactPhone',
    label: '联系电话',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'splitRate',
    label: '分成比例',
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
      max: 5,
    },
  },
];
