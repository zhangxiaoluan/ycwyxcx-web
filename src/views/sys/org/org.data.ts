import { BasicColumn, FormSchema } from '@/components/Table';
// import { orgList } from '@/api/sys/org';
// import { three } from '@/utils/three';

export const columns: BasicColumn[] = [
  { title: '名称', dataIndex: 'name', width: 200 },
  { title: '机构编码', dataIndex: 'code', width: 180 },
  { title: '级别', dataIndex: 'level', width: 50 },
  {
    title: '类型',
    dataIndex: 'orgType',
    width: 120,
    customRender: ({ record }) => {
      const map: Record<string, string> = {
        root: '根组织',
        company: '公司',
        community: '小区',
      };
      return map[record.orgType] || record.orgType || '-';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '名称', component: 'Input', colProps: { span: 4 } },
  { field: 'code', label: '编码', component: 'Input', colProps: { span: 4 } },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '机构名称',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'parentId',
    label: '上级部门',
    colProps: { span: 24 },
    component: 'Select',
    // componentProps: {
    //   api: () => {
    //     return new Promise((resolve) => {
    //       orgList({}).then((res) => {
    //         resolve(three(res));
    //       });
    //     });
    //   },
    //   labelField: 'name',
    //   valueField: 'id',
    //   getPopupContainer: () => document.body,
    // },
  },
  {
    field: 'orgType',
    colProps: { span: 24 },
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '根组织', value: 'root' },
        { label: '公司', value: 'company' },
        { label: '小区', value: 'community' },
      ],
    },
  },
];
