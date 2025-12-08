import { BasicColumn, FormSchema } from '@/components/Table';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';
import { communityStatus } from '@/api/Page/community';

type CheckedType = boolean | string | number;

export const columns: BasicColumn[] = [
  { title: '名称', dataIndex: 'name', fixed: 'left' },
  { title: '地址', dataIndex: 'address' },
  { title: '辖区', dataIndex: 'district' },
  { title: '开发商', dataIndex: 'developer' },
  { title: '建筑面积', dataIndex: 'buildArea' },
  { title: '绿化面积', dataIndex: 'greenRate' },
  { title: '建筑物总数', dataIndex: 'totalBuildings' },
  { title: '总计单位', dataIndex: 'totalUnits' },
  { title: '停车位', dataIndex: 'parkingSpaces' },
  { title: '物业', dataIndex: 'propertyCompany' },
  { title: '描述', dataIndex: 'description' },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '1',
        checkedChildren: '停用',
        unCheckedChildren: '启用',
        loading: record.pendingStatus,
        onChange(checked: CheckedType) {
          record.pendingStatus = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          communityStatus({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '小区名称',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'address',
    label: '地址',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'district',
    label: '区域',
    component: 'Select',
    required: true,
    colProps: { span: 12 },
    componentProps: {
      options: [
        { value: '西夏区', label: '西夏区' },
        { value: '金凤区', label: '金凤区' },
        { value: '兴庆区', label: '兴庆区' },
        { value: '贺兰县', label: '贺兰县' },
        { value: '永宁县', label: '永宁县' },
      ],
      placeholder: '请选择',
    },
  },
  {
    field: 'developer',
    label: '开发商',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'propertyCompany',
    label: '物业公司',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'buildArea',
    label: '建筑面积(㎡)',
    component: 'InputNumber',
    required: false,
    colProps: { span: 12 },
  },
  // {
  //   field: 'greenRate',
  //   label: '绿化率(%)',
  //   component: 'InputNumber',
  //   required: false,
  //   colProps: { span: 12 },
  // },
  {
    field: 'totalBuildings',
    label: '建筑物总数',
    component: 'InputNumber',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'totalUnits',
    label: '总户数',
    component: 'InputNumber',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'parkingSpaces',
    label: '停车位数量',
    component: 'InputNumber',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    required: false,
    colProps: { span: 24 },
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   required: true,
  //   defaultValue: 0,
  //   componentProps: {
  //     options: [
  //       { label: '关闭', value: 0 },
  //       { label: '启用', value: 1 },
  //     ],
  //   },
  //   colProps: { span: 24 },
  // },
];
