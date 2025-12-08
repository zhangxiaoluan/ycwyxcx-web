import { BasicColumn, FormSchema } from '@/components/Table';
import { uploadApi } from '@/api/sys/upload';
import { categoryAll } from '@/api/Page/shop';

export const columns: BasicColumn[] = [
  { title: '商品名称', dataIndex: 'name', fixed: 'left' },
  { title: '商品描述', dataIndex: 'description' },
  { title: '商品图片', dataIndex: 'image' },
  { title: '商品图片集合', dataIndex: 'images' },
  { title: '所需积分', dataIndex: 'points' },
  { title: '库存数量', dataIndex: 'stock' },
  { title: '已售数量', dataIndex: 'soldCount' },
  { title: '兑换限制', dataIndex: 'exchangeLimit' },
  { title: '状态', dataIndex: 'status' },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商品名称',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'categoryId',
    label: '商品分类',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      api: categoryAll,
      // resultField: 'result',
      labelField: 'name',
      showSearch: true,
      valueField: 'id',
    },
  },
  {
    field: 'points',
    label: '所需积分',
    component: 'InputNumber',
    colProps: { span: 12 },
  },
  {
    field: 'stock',
    label: '库存数量',
    component: 'InputNumber',
    colProps: { span: 12 },
  },
  {
    field: 'soldCount',
    label: '已售数量',
    component: 'InputNumber',
    colProps: { span: 12 },
  },
  {
    field: 'exchangeLimit',
    label: '兑换限制',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'image',
    label: 'image',
    component: 'ImageUpload',
    colProps: { span: 12 },
    componentProps: {
      api: uploadApi,
    },
  },
  {
    field: 'images',
    label: 'images',
    component: 'ImageUpload',
    colProps: { span: 12 },
    componentProps: {
      api: uploadApi,
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    colProps: { span: 24 },
  },
];
