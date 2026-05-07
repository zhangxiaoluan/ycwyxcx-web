import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '商品名称', dataIndex: 'productName', fixed: 'left' },
  { title: '类型', dataIndex: 'type', width: 80 },
  { title: '数量', dataIndex: 'quantity', width: 80 },
  { title: '操作人', dataIndex: 'operator', width: 100 },
  { title: '备注', dataIndex: 'remark', ellipsis: true },
  { title: '操作时间', dataIndex: 'createdAt', width: 170 },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '全部', value: '' },
        { label: '入库', value: 1 },
        { label: '出库', value: 2 },
      ],
      placeholder: '请选择',
      allowClear: true,
    },
  },
];

export const stockFormSchema: FormSchema[] = [
  {
    field: 'productId',
    label: '商品',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      api: null,
      resultField: 'result',
      labelField: 'name',
      valueField: 'id',
      immediate: true,
    },
  },
  {
    field: 'quantity',
    label: '数量',
    component: 'InputNumber',
    required: true,
    colProps: { span: 24 },
    componentProps: { min: 1, style: { width: '100%' } },
  },
  {
    field: 'operator',
    label: '操作人',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
    componentProps: { rows: 3 },
  },
];
