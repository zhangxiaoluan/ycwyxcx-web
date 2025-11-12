import { BasicColumn, FormSchema } from '@/components/Table';
import { allRoles } from '@/api/sys/role';

export const columns: BasicColumn[] = [
  { title: '登录帐号', dataIndex: 'account', fixed: 'left' },
  { title: '用户名', dataIndex: 'username' },
  { title: '手机号码', dataIndex: 'cellphone' },
  { title: '过期时间', dataIndex: 'expiredAt' },
  { title: '所属机构', dataIndex: 'orgName' },
  { title: '角色', dataIndex: 'roles' },
];

export const formSchema: FormSchema[] = [
  {
    field: 'account',
    label: '登录帐号',
    component: 'Input',
    required: true,
    dynamicDisabled: false,
    show: true,
    colProps: { span: 24 },
  },
  {
    field: 'passwd',
    required: true,
    label: '登录密码',
    component: 'InputPassword',
    dynamicDisabled: false,
    show: true,
    colProps: { span: 24 },
  },
  {
    field: 'username',
    label: '用户名',
    required: true,
    component: 'Input',
  },
  {
    field: 'cellphone',
    label: '手机号码',
    required: true,
    component: 'Input',
  },
  {
    field: 'orgId',
    label: '所属机构',
    required: false,
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'roles',
    label: '所属角色',
    component: 'ApiSelect',
    required: false,
    componentProps: {
      api: allRoles,
      mode: 'multiple',
      resultField: 'result',
      labelField: 'name',
      valueField: 'id',
      immediate: true,
    },
  },
];
