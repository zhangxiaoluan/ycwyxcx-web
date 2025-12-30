import { defHttp } from '/@/utils/http/axios';
enum Api {
  accessoryCarKv = `/repair/vehicle/type/list`,
  accessoryCarPage = `/repair/vehicle/type/page`,
  accessoryCar = `/repair/vehicle/type`,
  repairList = `/vehicle/repairs/repairer/list`,
}

// 车辆类型（列表）
export function accessoryCarPage(parmes) {
  return defHttp.get(
    { url: Api.accessoryCarPage, params: parmes },
    { errorMessageMode: 'message' },
  );
}

// 车辆类型下拉（维修）
export function accessoryCarKv() {
  return defHttp.get({ url: Api.accessoryCarKv }, { errorMessageMode: 'message' });
}

// 车辆类型新增（维修）
export function addAccessoryCar(params) {
  return defHttp.post({ url: Api.accessoryCar, params: params }, { errorMessageMode: 'message' });
}

// 车辆类型修改（维修）
export function editAccessoryCar(params) {
  return defHttp.put({ url: Api.accessoryCar, params: params }, { errorMessageMode: 'message' });
}

// 车辆类型删除（维修）
export function delAccessoryCar(id) {
  return defHttp.delete({ url: `${Api.accessoryCar}/${id}` }, { errorMessageMode: 'message' });
}

// 修理厂列表
export function repairerList() {
  return defHttp.get({ url: `${Api.repairList}` }, { errorMessageMode: 'message' });
}
