import { BasicColumn, FormSchema } from '@/components/Table';
import { userList } from '@/api/Page/vehicle/driver';
import { roleOption } from '@/api/Page/prosceniumUser/user-role';

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
    colProps: {
      span: 12,
    },
    componentProps: {
      api: userList,
      labelField: 'name',
      valueField: 'id',
      showSearch: true,
      filterOption: (input, option) => {
        return option.label.search(input) != -1;
      },
    },
    required: true,
  },
  {
    field: 'roleIds',
    component: 'ApiSelect',
    label: '角色',
    colProps: {
      span: 12,
    },
    componentProps: {
      api: () => roleOption().then((res) => res.records),
      // mode: 'multiple',
      // resultField: 'result',
      labelField: 'name',
      valueField: 'id',
      // immediate: true,
    },
  },
  {
    field: 'group',
    component: 'Input',
    label: '用户分组',
    colProps: {
      span: 12,
    },
    componentProps: {},
  },
];
