import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '字典名称', dataIndex: 'label', align: 'left' },
  { title: '字典模块', dataIndex: 'module' },
  { title: '参数名称', dataIndex: 'name' },
  { title: '参数值', dataIndex: 'val' },
];

// @ts-ignore
export const addOrEditForm: FormSchema[] = [
  {
    field: 'module',
    component: 'Input',
    label: '字典模块',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      maxlength: 25,
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '参数名称',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      maxlength: 25,
    },
  },
  {
    field: 'val',
    component: 'Input',
    label: '参数值',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      maxlength: 25,
    },
  },
  {
    field: 'valType',
    label: '字典类型',
    component: 'Input',
    colProps: { span: 24 },
    componentProps: {
      maxlength: 25,
    },
  },
  {
    field: 'label',
    component: 'Input',
    label: '字典名称',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      maxlength: 25,
    },
  },
  {
    field: 'note',
    component: 'Input',
    label: '字典备注',
    colProps: { span: 24 },
    required: false,
    componentProps: {
      maxlength: 30,
    },
  },
  {
    field: 'parentId',
    label: '上级参数',
    component: 'TreeSelect',
    colProps: { span: 24 },
    componentProps: {
      fieldNames: {
        label: 'label',
        value: 'id',
        // key: 'id',
      },
    },
  },
];
