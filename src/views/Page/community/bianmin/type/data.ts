import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [{ title: '分类名称', dataIndex: 'name', fixed: 'left' }];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
];
