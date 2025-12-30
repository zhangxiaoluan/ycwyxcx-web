import { BasicColumn, FormSchema } from '@/components/Table';
import { roleOption } from '@/api/Page/prosceniumUser/user-role';
import { orgList } from '@/api/sys/org';
import { three } from '@/utils/three';
import { userList } from '@/api/Page/vehicle/driver';

export const columns: BasicColumn[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '角色', dataIndex: 'roleName' },
  { title: '部门', dataIndex: 'orgName' },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '姓名', component: 'Input', colProps: { span: 5 } },
  { field: 'deptName', label: '组织名称', component: 'Input', colProps: { span: 5 } },
  { field: 'auditName', label: '角色名称', component: 'Input', colProps: { span: 5 } },
];

// 编辑或者新增
export const addOrEditForm: FormSchema[] = [
  {
    field: 'userId',
    component: 'ApiSelect',
    label: '用户',
    colProps: { span: 24 },
    // required: true,
    componentProps: {
      labelField: 'name',
      api: userList,
      valueField: 'id',
      showSearch: true,
      filterOption: (input, option) => {
        const label = option?.label || '';
        return label.search(input) != -1;
      },
    },

  },
  {
    field: 'orgIds',
    component: 'ApiTreeSelect',
    label: '部门',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      api: async () => {
        return three(await orgList(undefined));
      },
      valueField: 'id',
      labelField: 'name',
      // multiple: true,
      // treeDefaultExpandAll: true,
      // replaceFields: {
      //   title: 'name',
      //   key: 'id',
      //   value: 'id',
      // },
    },
  },
  {
    field: 'roleId',
    component: 'ApiSelect',
    label: '角色',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      api: () => roleOption().then((res) => res.records),
      labelField: 'name',
      valueField: 'id',
      showSearch: true,
    },
  },
];
