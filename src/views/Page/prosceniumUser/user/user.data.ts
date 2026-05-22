import { BasicColumn, FormSchema } from '@/components/Table';
import { dictItems } from '@/api/sys/dict';

export const columns: BasicColumn[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '登录账号', dataIndex: 'loginName' },
  { title: '手机号', dataIndex: 'cellphone' },
  {
    title: '人员类型',
    dataIndex: 'personnelType',
    customRender: ({ record }) => {
      const map: Record<string, string> = {
        owner: '业主',
        family: '家属',
        tenant: '租客',
        property_staff: '物业人员',
        other: '其他',
      };
      return map[record.personnelType] || record.personnelType || '-';
    },
  },
];

export const searFormSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    colProps: { span: 5 },
    componentProps: { maxlength: 6 },
  },
  {
    field: 'cellphone',
    component: 'Input',
    label: '手机号',
    colProps: { span: 5 },
    componentProps: { maxlength: 11 },
  },
  {
    field: 'personnelType',
    component: 'ApiSelect',
    label: '人员类型',
    colProps: { span: 5 },
    componentProps: {
      api: dictItems,
      params: { module: 'personnel_type' },
      labelField: 'label',
      valueField: 'val',
      showSearch: true,
      placeholder: '请选择人员类型',
      allowClear: true,
    },
  },
];
