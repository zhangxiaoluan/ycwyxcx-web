import { BasicColumn, FormSchema } from '@/components/Table';
import { dictItems } from '@/api/sys/dict';

export const columns: BasicColumn[] = [
  { title: '点位名称', dataIndex: 'locationName', fixed: 'left', width: 150 },
  { title: '设备名称', dataIndex: 'name', width: 150 },
  { title: '设备类型', dataIndex: 'deviceType', width: 120 },
  { title: 'IP地址', dataIndex: 'ipAddress', width: 140 },
  { title: '序列号', dataIndex: 'serialNumber', width: 140 },
  { title: '经度', dataIndex: 'longitude', width: 120 },
  { title: '纬度', dataIndex: 'latitude', width: 120 },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name__like',
    label: '设备名称',
    component: 'Input',
  },
  {
    field: 'deviceType',
    label: '设备类型',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '全部', value: undefined },
        { label: '正常', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
];

// const baseColProps = { xxl: 12, lg: 12, sm: 24, xs: 24 };
export const formSchema: FormSchema[] = [
  {
    field: 'locationName',
    label: '点位名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'name',
    label: '设备名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'deviceType',
    label: '设备类型',
    component: 'ApiSelect',
    colProps: { span: 24 },
    componentProps: {
      api: dictItems,
      params: { module: 'device_type' },
      getPopupContainer: () => document.body,
      placeholder: '请选择分类',
      labelField: 'label',
      valueField: 'val',
      showSearch: true,
    },
  },
  {
    field: 'ipAddress',
    label: 'IP地址',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'serialNumber',
    label: '序列号',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'longitude',
    label: '经度',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'latitude',
    label: '纬度',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    required: true,
    colProps: { span: 24 },
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
];
