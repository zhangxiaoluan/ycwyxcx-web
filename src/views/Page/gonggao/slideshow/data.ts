import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';
import { uploadApi } from '@/api/sys/upload';

export const columns: BasicColumn[] = [
  { title: '文章标题', dataIndex: 'title', fixed: 'left' },
  { title: '轮播图', dataIndex: 'coverImage' },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '文章标题',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'coverImage',
    label: '轮播图',
    component: 'ImageUpload',
    colProps: { span: 24 },
    componentProps: {
      api: uploadApi,
    },
  },
  {
    field: 'sortOrder',
    label: '排序',
    component: 'InputNumber',
    colProps: { span: 24 },
  },
  {
    field: 'author',
    label: '作者',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'viewCount',
    label: '浏览次数',
    component: 'InputNumber',
    colProps: { span: 24 },
  },
  {
    field: 'content',
    component: 'Input',
    label: '文章内容',
    defaultValue: '',
    colProps: { span: 24 },
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'summary',
    label: '摘要',
    component: 'Input',
    colProps: { span: 24 },
  },
];
