import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tinymce } from '@/components/Tinymce';

export const columns: BasicColumn[] = [
  { title: '标题', dataIndex: 'title', fixed: 'left' },
  // { title: '用户名', dataIndex: 'username' },
  // { title: '手机号码', dataIndex: 'cellphone' },
  // { title: '过期时间', dataIndex: 'expiredAt' },
  // { title: '所属机构', dataIndex: 'orgName' },
  // { title: '角色', dataIndex: 'roles' },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'priority',
    label: '顺序',
    component: 'InputNumber',
    defaultValue: '0',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'time',
    label: '时间',
    component: 'RangePicker',
    defaultValue: [],
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'content',
    component: 'Input',
    label: '文章内容',
    defaultValue: '',
    colProps: { span: 24 },
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
