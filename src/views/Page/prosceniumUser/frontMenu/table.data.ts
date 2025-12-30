import { BasicColumn, FormSchema } from '@/components/Table';
import { uploadApi } from '@/api/sys/upload';
import { frontMenuKv } from '@/api/Page/prosceniumUser/frontMenu';

export const columns: BasicColumn[] = [
  { title: '标题', dataIndex: 'title' },
  { title: '名称', dataIndex: 'name' },
  { title: '图片', dataIndex: 'icon' },
  { title: '页面地址', dataIndex: 'url' },
  { title: '所在模块', dataIndex: 'moduleName' },
  { title: '所在分组', dataIndex: 'inGroup' },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '名称', component: 'Input', colProps: { span: 5 } },
];

// 编辑或者新增
export const addOrEditForm: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {},
  },
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {},
  },
  {
    field: 'type',
    component: 'Input',
    label: '类型',
    colProps: {
      span: 12,
    },
    defaultValue: 'img',
    required: true,
    componentProps: {},
  },
  {
    field: 'url',
    component: 'Input',
    label: '页面地址',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {},
  },
  {
    field: 'module',
    component: 'ApiSelect',
    label: '所在模块',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      api: frontMenuKv,
      labelField: 'value',
      valueField: 'key',
      showSearch: true,
    },
  },
  {
    field: 'inGroup',
    component: 'Input',
    label: '所在分组',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {},
  },
  {
    field: 'icon',
    component: 'ImageUpload',
    label: 'Icon图',
    colProps: {
      span: 12,
    },
    required: true,
    defaultValue: [],
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
    },
  },
];
