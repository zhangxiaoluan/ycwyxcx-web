import { BasicColumn, FormSchema } from '@/components/Table';
import { uploadApi } from '@/api/sys/upload';
import { merchantType } from '@/api/Page/shop';

export const columns: BasicColumn[] = [
  { title: '名称', dataIndex: 'name', fixed: 'left' },
  { title: '描述', dataIndex: 'description' },
  { title: '地址', dataIndex: 'address' },
  { title: '电话', dataIndex: 'phone' },
  { title: '营业时间', dataIndex: 'businessHours' },
  { title: '评分', dataIndex: 'rating' },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'address',
    label: '地址',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'businessHours',
    label: '营业时间',
    component: 'DatePicker',
    colProps: { span: 24 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:MM:ss',
      format: 'YYYY-MM-DD HH:MM:ss',
      showTime: true,
      // type: 'datetimerange',
    },
  },
  {
    field: 'categoryId',
    label: '客户类型',
    component: 'ApiSelect',
    colProps: { span: 24 },
    componentProps: {
      api: merchantType,
      showSearch: true,
      // apiSearch: {
      //   show: true,
      //   searchName: 'name',
      // },
      // resultField: 'result',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'images',
    label: '店铺图片',
    component: 'ImageUpload',
    colProps: { span: 24 },
    componentProps: {
      api: uploadApi,
    },
  },
  {
    field: 'rating',
    label: '评分',
    component: 'InputNumber',
    colProps: { span: 24 },
    componentProps: {
      min: 0,
      max: 5,
    },
  },
];
