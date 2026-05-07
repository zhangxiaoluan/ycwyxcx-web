import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '商品名称', dataIndex: 'name', fixed: 'left' },
  { title: '分类', dataIndex: 'category' },
  { title: '单位', dataIndex: 'unit', width: 80 },
  { title: '库存数量', dataIndex: 'stockQuantity', width: 100 },
  { title: '预警数量', dataIndex: 'warningQuantity', width: 100 },
  { title: '单价(元)', dataIndex: 'price', width: 100 },
  { title: '备注', dataIndex: 'remark', ellipsis: true },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商品名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'category',
    label: '分类',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商品名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'category',
    label: '分类',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'unit',
    label: '单位',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'warningQuantity',
    label: '预警数量',
    component: 'InputNumber',
    required: true,
    colProps: { span: 24 },
    componentProps: { min: 0, style: { width: '100%' } },
  },
  {
    field: 'price',
    label: '单价(元)',
    component: 'InputNumber',
    required: true,
    colProps: { span: 24 },
    componentProps: { min: 0, precision: 2, style: { width: '100%' } },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
    componentProps: { rows: 3 },
  },
];
