import { BasicColumn, FormSchema } from '@/components/Table';
// import { getProductList } from '@/api/warehouse/product';

export const columns: BasicColumn[] = [
  { title: '商品名称', dataIndex: 'productName', fixed: 'left' },
  { title: '类型', dataIndex: 'type' },
  { title: '数量', dataIndex: 'quantity' },
  // { title: '操作人', dataIndex: 'operator', width: 100 },
  { title: '备注', dataIndex: 'remark', ellipsis: true },
  { title: '操作时间', dataIndex: 'createdAt' },
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

// const baseColProps = { xxl: 12, lg: 12, sm: 24, xs: 24 };
export const stockFormSchema: FormSchema[] = [
  {
    field: 'productId',
    label: '商品',
    component: 'Select',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'quantity',
    label: '数量',
    component: 'InputNumber',
    required: true,
    colProps: { span: 24 },
    componentProps: { min: 1, style: { width: '100%' } },
  },
  // {
  //   field: 'operator',
  //   label: '操作人',
  //   component: 'Input',
  //   required: true,
  //   colProps: { span: 24 },
  // },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
    componentProps: { rows: 3 },
  },
];
