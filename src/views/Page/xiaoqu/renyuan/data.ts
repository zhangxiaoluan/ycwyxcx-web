import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 60,
    customRender: ({ record }) => {
      if (record.avatar) {
        return h('img', {
          src: record.avatar,
          style: { width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' },
        });
      }
      return h('div', {
        style: {
          width: '36px', height: '36px', borderRadius: '50%',
          background: '#e8e8e8', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#999', fontSize: '14px',
        },
      }, (record.name || '?').substring(0, 1));
    },
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'cellphone',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    customRender: ({ text }) => {
      if (text === '1' || text === '男') return '男';
      if (text === '2' || text === '女') return '女';
      return text || '-';
    },
  },
  {
    title: '人员类型',
    dataIndex: 'personnelType',
    customRender: ({ text }) => {
      const map: Record<string, string> = {
        owner: '业主',
        family: '家人',
        tenant: '租客',
        staff: '物业员工',
        other: '其他',
      };
      return map[text] || text || '-';
    },
  },
  {
    title: '关联小区',
    dataIndex: 'communityName',
    customRender: ({ text }) => text || '未绑定',
  },
  {
    title: '楼栋',
    dataIndex: 'buildingName',
    customRender: ({ text }) => text || '-',
  },
  {
    title: '楼层',
    dataIndex: 'floor',
    customRender: ({ text }) => text || '-',
  },
  {
    title: '房间号',
    dataIndex: 'roomNumber',
    customRender: ({ text }) => text || '-',
  },
  {
    title: '注册时间',
    dataIndex: 'createdAt',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '人员姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'cellphone',
    label: '手机号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'buildingKeyword',
    label: '楼栋编号',
    component: 'Input',
    colProps: { span: 6 },
  },
];
