import { defHttp } from '/@/utils/http/axios';
enum Api {
  accessoryKv = `/repair/type/tree`,
  repair = `/repair/type`,
  accessoryKvMe = `/repair/type/tree/without/me`,
}

// 维修类型
export function accessoryKv() {
  return defHttp.get({ url: Api.accessoryKv }, { errorMessageMode: 'message' });
}

// 创建维修类型
export function addRepairType(params) {
  return defHttp.post({ url: Api.repair, params: params }, { errorMessageMode: 'message' });
}

// 修改维修类型
export function editRepairType(params) {
  return defHttp.put({ url: Api.repair, params: params }, { errorMessageMode: 'message' });
}

// 删除维修类型
export function delRepairType(id) {
  return defHttp.delete({ url: `${Api.repair}/${id}` }, { errorMessageMode: 'message' });
}

// 维修类型排除自己
export function accessoryKvMe(id) {
  return defHttp.get({ url: Api.accessoryKvMe, params: id }, { errorMessageMode: 'message' });
}
