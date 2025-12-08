import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [{ title: '名称', dataIndex: 'name', fixed: 'left' }];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 24 },
  },
];
