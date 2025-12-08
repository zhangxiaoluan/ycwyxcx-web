import { BasicColumn, FormSchema } from '@/components/Table';
import { categoryAll } from '@/api/Page/community';

export const columns: BasicColumn[] = [
  { title: '名称', dataIndex: 'name' },
  { title: '电话', dataIndex: 'phone' },
  { title: '地址', dataIndex: 'address' }
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'categoryId',
    label: '分类',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      api: categoryAll,
      // resultField: 'result',
      labelField: 'name',
      showSearch: true,
      valueField: 'id',
    },
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'address',
    label: '地址',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    colProps: { span: 24 },
  },
];
