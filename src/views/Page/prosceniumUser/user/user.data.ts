import { BasicColumn, FormSchema } from '@/components/Table';
// import { three } from '@/utils/three';
// import { orgList } from '@/api/sys/org';
// import { regionTree } from '@/api/Page/prosceniumUser/user';

export const columns: BasicColumn[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '登录账号', dataIndex: 'loginName' },
  { title: '手机号', dataIndex: 'cellphone' },
];

export const searFormSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    colProps: { span: 5 },
    componentProps: { maxlength: 6 },
  },
  {
    field: 'cellphone',
    component: 'Input',
    label: '手机号',
    colProps: { span: 5 },
    componentProps: { maxlength: 11 },
  },
];
