import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '名称', dataIndex: 'name', width: 200 },
  { title: '机构编码', dataIndex: 'code', width: 180 },
  { title: '级别', dataIndex: 'level', width: 50 },
  {
    title: '公司',
    dataIndex: 'orgType',
    width: 120,
    customRender: ({ record }) => {
      const orgType = record.orgType;
      let title = '';
      switch (orgType) {
        case '1':
          title = '厅';
          break;
        case '2':
          title = '局';
          break;
        case '3':
          title = '中心';
          break;
        case '4':
          title = '分中心';
          break;
        case '5':
          title = '分局';
          break;
        case '6':
          title = '养护站';
          break;
        case '7':
          title = '大队';
          break;
        case '8':
          title = '科室';
          break;
        case '9':
          title = '集团公司';
          break;
        case '10':
          title = '公司';
          break;
        case '11':
          title = '事业部';
          break;
        case '12':
          title = '站所';
          break;
        case '13':
          title = '其他';
          break;
      }
      return title;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name__like', label: '名称', component: 'Input', colProps: { span: 4 } },
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
    field: 'orgType',
    colProps: { span: 24 },
    label: '组织类型',
    component: 'Select',
    defaultValue: 'company',
    componentProps: {
      options: [
        { label: '厅', value: '1' },
        { label: '局', value: '2' },
        { label: '中心', value: '3' },
        { label: '分中心', value: '4' },
        { label: '分局', value: '5' },
        { label: '养护站', value: '6' },
        { label: '大队', value: '7' },
        { label: '科室', value: '8' },
        { label: '集团公司', value: '9' },
        { label: '公司', value: '10' },
        { label: '事业部', value: '11' },
        { label: '站所', value: '12' },
        { label: '其他', value: '13' },
      ],
    },
  },
];
