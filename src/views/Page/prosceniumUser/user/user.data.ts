import { BasicColumn, FormSchema } from '@/components/Table';
import { three } from '@/utils/three';
import { orgList } from '@/api/sys/org';
import { regionTree } from '@/api/Page/prosceniumUser/user';

export const columns: BasicColumn[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '登录账号', dataIndex: 'loginName' },
  { title: 'id', dataIndex: 'id', width: 200 },
  { title: '手机号', dataIndex: 'cellphone' },
  { title: '工号', dataIndex: 'employeeNumber' },
  { title: '区域', dataIndex: 'region' },
  { title: '公司名称', dataIndex: 'deptName' },
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

// 编辑或者新增
export const addOrEditForm: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    colProps: { span: 12 },
    required: true,
    componentProps: {
      maxLength: 10,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: {
      span: 12,
    },
    // rules: [
    //   {
    //     required: true,
    //     validator: async (_rule, value) => {
    //       if (!Regexp.email['test'](value)) {
    //         return Promise.reject('请输入正确的邮箱');
    //       }
    //       return Promise.resolve(value);
    //     },
    //   },
    // ],
    componentProps: {
      maxLength: 25,
    },
  },
  {
    field: 'emailVerifiedAt',
    component: 'DatePicker',
    label: '邮箱确认时间',
    colProps: {
      span: 12,
    },
    componentProps: {
      'show-time': true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    required: true,
  },
  {
    field: 'cellphone',
    component: 'Input',
    label: '手机号',
    colProps: {
      span: 12,
    },
    // rules: [
    //   {
    //     required: true,
    //     validator: (_rule, value) => {
    //       if (!Regexp.phone['test'](value)) {
    //         return Promise.reject('请输入正确的手机号码');
    //       }
    //       return Promise.resolve(value);
    //     },
    //   },
    // ],
    componentProps: {
      maxLength: 11,
    },
  },
  {
    field: 'employeeNumber',
    component: 'Input',
    label: '员工号',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      maxLength: 10,
      type: 'number',
    },
  },
  {
    field: 'post',
    component: 'Input',
    label: '职位',
    colProps: {
      span: 12,
    },
    componentProps: {
      maxLength: 25,
    },
  },
  {
    field: 'fixedPhone',
    component: 'Input',
    label: '固定电话',
    colProps: {
      span: 12,
    },
    componentProps: {
      maxLength: 20,
    },
  },
  {
    field: 'deptId',
    component: 'ApiTreeSelect',
    label: '组织ID',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      api: async () => {
        return three(await orgList(undefined));
      },
      valueField: 'id',
      labelField: 'name',
      // treeDefaultExpandAll: true,
    },
  },
  {
    field: 'qywUserid',
    component: 'Input',
    label: '企微用户编号',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'loginName',
    component: 'Input',
    label: '登录账号',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      maxLength: 20,
    },
  },
  {
    field: 'region',
    component: 'Input',
    label: '区域名称',
    colProps: {
      span: 12,
    },
    show: false,
  },
  {
    field: 'regionId',
    component: 'ApiTreeSelect',
    label: '区域名称',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      api: async () => {
        return three(await regionTree());
      },
      resultField: 'list',
      valueField: 'id',
      labelField: 'name',
      // replaceFields: {
      //   title: 'name',
      //   key: 'id',
      //   value: 'id',
      // },
    },
  },
  {
    field: 'insideOutsideStaff',
    label: '内外部员工',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      api: async () => {
        return [
          { key: '内部员工', value: '内部员工' },
          { key: '外部员工', value: '外部员工' },
        ];
      },
      labelField: 'value',
      valueField: 'key',
    },
  },
];
