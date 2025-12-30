import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '@/api/sys/role';
import { useMessage } from '@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  { title: '角色名称', dataIndex: 'name' },
  // { title: '角色值', dataIndex: 'code' },
  { title: '排序', dataIndex: 'ordinal' },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        // @ts-ignore
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setRoleStatus({ id: record.id, status: newStatus })
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
  { title: '创建时间', dataIndex: 'createdAt' },
  { title: '备注', dataIndex: 'desc' },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name__like', label: '角色名称', component: 'Input', colProps: { span: 5 } },
  { field: 'code', label: '角色编码', component: 'Input', colProps: { span: 5 } },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 5 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  // {
  //   field: 'code',
  //   label: '角色编码',
  //   required: true,
  //   component: 'Input',
  //   colProps: { span: 12 },
  // },
  {
    field: 'ordinal',
    label: '顺序',
    required: false,
    colProps: { span: 12 },
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    colProps: { span: 12 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    label: '备注',
    field: 'desc',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
  {
    label: '',
    field: 'frontMenu',
    slot: 'frontMenuSlot',
    // component: 'Input',
    defaultValue: [],
    colProps: { span: 11, offset: 1 },
  },
  {
    label: '',
    field: 'menus',
    slot: 'menusSlot',
    // component: 'Input',
    defaultValue: [],
    colProps: { span: 11, offset: 1 },
  },
];
