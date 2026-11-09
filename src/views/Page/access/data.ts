import { BasicColumn } from '@/components/Table';

// 门类型/在线/绑定楼栋/状态列由 index.vue 的 bodyCell 插槽渲染
export const doorColumns: BasicColumn[] = [
  { title: '设备编号', dataIndex: 'vendorDeviceId', width: 110 },
  { title: '设备名称', dataIndex: 'name', width: 140 },
  { title: '门类型', dataIndex: 'doorScope', key: 'doorScope', width: 110 },
  { title: '绑定楼栋', dataIndex: 'buildingName', key: 'buildingName', width: 200 },
  { title: '在线', dataIndex: 'online', key: 'online', width: 80 },
  { title: '状态', dataIndex: 'status', width: 70 },
  { title: '最近同步', dataIndex: 'lastSyncAt', width: 150 },
];

// 动作/来源/结果列由 log.vue 的 bodyCell 插槽渲染
export const logColumns: BasicColumn[] = [
  { title: '时间', dataIndex: 'createdAt', width: 150 },
  { title: '门', dataIndex: 'doorName', width: 150 },
  { title: '动作', dataIndex: 'action', key: 'action', width: 80 },
  { title: '来源', dataIndex: 'source', key: 'source', width: 100 },
  { title: '操作人', dataIndex: 'operator', width: 180 },
  { title: '原因', dataIndex: 'reason', width: 110 },
  { title: '结果', dataIndex: 'result', key: 'result', width: 200 },
];
