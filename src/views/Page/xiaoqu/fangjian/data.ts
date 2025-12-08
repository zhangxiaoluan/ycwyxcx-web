import { BasicColumn, FormSchema } from '@/components/Table';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';
import { communityStatus } from '@/api/Page/community';

type CheckedType = boolean | string | number;

export const columns: BasicColumn[] = [
  { title: '房间号', dataIndex: 'roomNumber', fixed: 'left' },
  { title: '单元', dataIndex: 'unit' },
  { title: '楼层', dataIndex: 'floor' },
  { title: '户主', dataIndex: 'ownerName' },
  { title: '户主电话', dataIndex: 'ownerPhone' },
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
    field: 'unit',
    label: '单元',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'floor',
    label: '楼层',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'roomNumber',
    label: '房间号',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'ownerName',
    label: '户主',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'ownerPhone',
    label: '户主电话',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    required: false,
    colProps: { span: 24 },
  },
];
