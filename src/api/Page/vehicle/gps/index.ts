import { defHttp } from '/@/utils/http/axios';
enum Api {
  gpsPage = `/gps/devices/page`,
  gps = `/gps/devices`,
}

// gps设备分页列表
export function gpsPage(params: object) {
  return defHttp.get({ url: Api.gpsPage, params: params }, { errorMessageMode: 'message' });
}

// 删除gps设备
export function delGps(id: string | number) {
  return defHttp.delete({ url: `${Api.gps}/${id}` }, { errorMessageMode: 'message' });
}

// 新增gps设备
export function addGps(params: object) {
  return defHttp.post({ url: Api.gps, params: params }, { errorMessageMode: 'message' });
}

// 修改gps设备
export function editGps(params: object) {
  return defHttp.put({ url: Api.gps, params: params }, { errorMessageMode: 'message' });
}
