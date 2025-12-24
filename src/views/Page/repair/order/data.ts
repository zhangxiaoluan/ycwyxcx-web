import { BasicColumn, FormSchema } from '@/components/Table';
import { allRoles } from '@/api/sys/role';

export const columns: BasicColumn[] = [
  { title: 'userName', dataIndex: 'userName' },
  { title: 'userPhone', dataIndex: 'userPhone' },
  { title: 'categoryName', dataIndex: 'categoryName' },
  { title: 'categoryName', dataIndex: 'categoryName' },
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
