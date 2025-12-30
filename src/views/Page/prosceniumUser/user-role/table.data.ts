import { BasicColumn, FormSchema } from '@/components/Table';
import { roleOption } from '@/api/Page/prosceniumUser/user-role';
import { userPage } from '@/api/Page/prosceniumUser/user';

export const columns: BasicColumn[] = [
  { title: '用户姓名', dataIndex: 'userName' },
  { title: '角色名称', dataIndex: 'roleName' },
  { title: '用户分组', dataIndex: 'group' },
  { title: '创建时间', dataIndex: 'createdAt' },
  { title: '修改时间', dataIndex: 'updatedAt' },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'userName', label: '用户姓名', component: 'Input', colProps: { span: 5 } },
];

// 编辑或者新增
export const addOrEditForm: FormSchema[] = [
  {
    field: 'userId',
    component: 'ApiSelect',
    label: '用户',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      api: () => {
        return userPage({ size: 99999 }).then((res) => {
          const records = res.records || [];
          return records;
        });
      },
      labelField: 'name',
      valueField: 'id',
      showSearch: true,
    },
  },
  {
    field: 'roleIds',
    component: 'ApiSelect',
    label: '角色',
    colProps: {
      span: 24,
    },
    componentProps: {
      api: () => roleOption().then((res) => res.records),
      mode: 'multiple',
      labelField: 'name',
      valueField: 'id',
      showSearch: true,
      immediate: true,
    },
  },
  {
    field: 'group',
    component: 'Input',
    label: '用户分组',
    colProps: {
      span: 24,
    },
    componentProps: {},
  },
];
