import { BasicColumn, FormSchema } from '@/components/Table';
import { repairList } from '@/api/Page/repair';

export const columns: BasicColumn[] = [
  { title: '用户名', dataIndex: 'userName' },
  { title: '联系电话', dataIndex: 'userPhone' },
  { title: '维修类型', dataIndex: 'categoryName' },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'contactPhone',
    label: '联系电话',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'difficultyType',
    label: '困难类型',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请选择困难类型',
      options: [
        { label: '家庭困难', value: '1' },
        { label: '工作压力', value: '2' },
        { label: '其他', value: '9' },
      ],
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'handlerId',
    label: '处理人',
    colProps: { span: 24 },
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: repairList,
      placeholder: '请选择处理人',
      resultField: 'name',
      labelField: 'name',
      valueField: 'id',
      showSearch: true,
    },
  },
  {
    field: 'remark',
    label: '描述',
    colProps: { span: 24 },
    component: 'InputTextArea',
    required: true,
  },
];

// 基本信息展示配置
export const basicInfoSchema = [
  { field: 'requestNo', label: '报修单号' },
  { field: 'userName', label: '用户姓名' },
  { field: 'userPhone', label: '用户电话' },
  { field: 'userAvatar', label: '用户头像' },
  { field: 'categoryName', label: '报修类型' },
  { field: 'title', label: '报修标题' },
  { field: 'description', label: '报修描述' },
  { field: 'location', label: '报修位置' },
  { field: 'urgentLevelDesc', label: '紧急程度' },
  { field: 'imageList', label: '图片地址列表' },
  { field: 'contactTime', label: '期望联系时间' },
  { field: 'statusDesc', label: '状态' },
  { field: 'handlerName', label: '处理人' },
  { field: 'handlerAvatar', label: '处理人头像' },
  { field: 'handleTime', label: '受理时间' },
  { field: 'startTime', label: '开始处理时间' },
  { field: 'completeTime', label: '完成时间' },
  { field: 'remark', label: '处理备注' },
  { field: 'rating', label: '评分' },
  { field: 'feedback', label: '用户反馈' },
  { field: 'feedbackTime', label: '反馈时间' },
  { field: 'createdAt', label: '创建时间' },
  { field: 'updatedAt', label: '更新时间' },
  { field: 'handleDuration', label: '处理时长（小时）' },
  { field: 'isOverdue', label: '是否逾期' },
  { field: 'progressList', label: '进度信息' },
];
