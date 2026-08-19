import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { RangePicker } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { Tinymce } from '@/components/Tinymce';
import { categoryPage } from '@/api/Page/gonggao';

export const columns: BasicColumn[] = [
  { title: '标题', dataIndex: 'title', fixed: 'left' },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '优先级', dataIndex: 'priority', width: 90 },
  { title: '置顶', dataIndex: 'isTop', width: 80 },
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
    label: '优先级',
    component: 'Select',
    defaultValue: 0,
    required: true,
    colProps: { span: 12 },
    componentProps: {
      options: [
        { label: '普通', value: 0 },
        { label: '重要', value: 1 },
        { label: '紧急', value: 2 },
      ],
    },
  },
  {
    field: 'categoryId',
    label: '公告分类',
    component: 'ApiSelect',
    required: true,
    colProps: { span: 12 },
    componentProps: {
      api: categoryPage,
      labelField: 'name',
      valueField: 'id',
      params: { page: 1, pageSize: 100 },
      resultField: 'records',
    },
  },
  {
    field: 'isTop',
    label: '首页置顶',
    component: 'Switch',
    defaultValue: false,
    colProps: { span: 12 },
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
    helpMessage: '开启后公告将显示在小程序首页"社区公告"',
  },
  {
    field: 'time',
    label: '生效日期段',
    component: 'Input',
    colProps: { span: 24 },
    render: ({ model, field }) => {
      // model[field] 存字符串数组 ['YYYY-MM-DD', 'YYYY-MM-DD']
      const raw = model[field];
      const value: [Dayjs, Dayjs] | undefined =
        Array.isArray(raw) && raw[0] && raw[1] ? [dayjs(raw[0]), dayjs(raw[1])] : undefined;
      return h(RangePicker, {
        value,
        format: 'YYYY-MM-DD',
        style: { width: '100%' },
        'onUpdate:value': (val: any) => {
          if (Array.isArray(val) && val[0] && val[1]) {
            model[field] = [
              (val[0] as Dayjs).format('YYYY-MM-DD'),
              (val[1] as Dayjs).format('YYYY-MM-DD'),
            ];
          } else {
            model[field] = [];
          }
        },
      });
    },
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
