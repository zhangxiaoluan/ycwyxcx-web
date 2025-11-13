import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '名称', dataIndex: 'name', fixed: 'left' },
  { title: '描述', dataIndex: 'description' },
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
];
