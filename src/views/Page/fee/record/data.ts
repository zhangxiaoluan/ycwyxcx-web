import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '房号', dataIndex: 'roomNumber', fixed: 'left', width: 150 },
  { title: '缴费人', dataIndex: 'ownerName', width: 100 },
  { title: '费用类型', dataIndex: 'feeType', width: 100 },
  { title: '起始月份', dataIndex: 'startMonth', width: 100 },
  { title: '截止月份', dataIndex: 'endMonth', width: 100 },
  { title: '金额(元)', dataIndex: 'amount', width: 100 },
  { title: '车牌号', dataIndex: 'plateNumber', width: 120 },
  { title: '缴费方式', dataIndex: 'paymentMethod', width: 100 },
  { title: '缴费日期', dataIndex: 'payTime', width: 120 },
  { title: '录入人', dataIndex: 'operator', width: 100 },
  { title: '备注', dataIndex: 'remark', ellipsis: true },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'feeType',
    label: '费用类型',
    component: 'Input',
  },
  // {
  //   field: 'startMonth',
  //   label: '起始月份',
  //   component: 'DatePicker',
  //   componentProps: { picker: 'month', format: 'YYYY-MM', valueFormat: 'YYYY-MM' },
  // },
  // {
  //   field: 'endMonth',
  //   label: '截止月份',
  //   component: 'DatePicker',
  //   componentProps: { picker: 'month', format: 'YYYY-MM', valueFormat: 'YYYY-MM' },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roomNumber',
    label: '房号',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'ownerName',
    label: '缴费人',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'feeType',
    label: '费用类型',
    component: 'Select',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: '物业费', value: '物业费' },
        { label: '停车费', value: '停车费' },
        { label: '水费', value: '水费' },
        { label: '电费', value: '电费' },
        { label: '燃气费', value: '燃气费' },
        { label: '其他', value: '其他' },
      ],
    },
  },
  {
    field: 'startMonth',
    label: '起始月份',
    component: 'DatePicker',
    required: true,
    colProps: { span: 12 },
    componentProps: {
      picker: 'month',
      format: 'YYYY-MM',
      valueFormat: 'YYYY-MM',
      style: { width: '100%' },
    },
  },
  {
    field: 'endMonth',
    label: '截止月份',
    component: 'DatePicker',
    required: true,
    colProps: { span: 12 },
    componentProps: {
      picker: 'month',
      format: 'YYYY-MM',
      valueFormat: 'YYYY-MM',
      style: { width: '100%' },
    },
  },
  {
    field: 'amount',
    label: '缴费金额(元)',
    component: 'InputNumber',
    required: true,
    colProps: { span: 24 },
    componentProps: { min: 0, precision: 2, style: { width: '100%' } },
  },
  {
    field: 'plateNumber',
    label: '车牌号',
    component: 'Input',
    colProps: { span: 24 },
    helpMessage: '停车费时必填',
  },
  {
    field: 'paymentMethod',
    label: '缴费方式',
    component: 'Select',
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: '现金', value: '现金' },
        { label: '微信', value: '微信' },
        { label: '支付宝', value: '支付宝' },
        { label: '银行转账', value: '银行转账' },
      ],
    },
  },
  {
    field: 'payTime',
    label: '缴费日期',
    component: 'DatePicker',
    colProps: { span: 24 },
    componentProps: { format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD', style: { width: '100%' } },
  },
  {
    field: 'operator',
    label: '录入人',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
    componentProps: { rows: 3 },
  },
];
