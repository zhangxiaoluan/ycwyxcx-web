import { BasicColumn, FormSchema } from '@/components/Table';
import { allRoles } from '@/api/sys/role';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';
import { communityStatus } from '@/api/Page/community';

type CheckedType = boolean | string | number;
export const columns: BasicColumn[] = [
  { title: '标题', dataIndex: 'title', fixed: 'left' },
  { title: '内容', dataIndex: 'content' },
  { title: '原因', dataIndex: 'reason' },
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
    field: 'account',
    label: '登录帐号',
    component: 'Input',
    required: true,
    dynamicDisabled: false,
    show: true,
    colProps: { span: 24 },
  },
  {
    field: 'passwd',
    required: true,
    label: '登录密码',
    component: 'InputPassword',
    dynamicDisabled: false,
    show: true,
    colProps: { span: 24 },
  },
  {
    field: 'username',
    label: '用户名',
    required: true,
    component: 'Input',
  },
  {
    field: 'cellphone',
    label: '手机号码',
    required: true,
    component: 'Input',
  },
  {
    field: 'orgId',
    label: '所属机构',
    required: false,
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
    field: 'roles',
    label: '所属角色',
    component: 'ApiSelect',
    required: false,
    componentProps: {
      api: allRoles,
      mode: 'multiple',
      resultField: 'result',
      labelField: 'name',
      valueField: 'id',
      immediate: true,
    },
  },
];
