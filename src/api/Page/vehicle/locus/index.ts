import { defHttp } from '/@/utils/http/axios';
enum Api {
  followPage = `/gps/follow/page/`,
  deviceList = `/gps/devices/list`,
  playBack = `/gps/play/back`,
}

// 车辆维修分页列表
export function followPage(deviceId: string) {
  return defHttp.get({ url: Api.followPage, params: deviceId }, { errorMessageMode: 'message' });
}

// 车辆维修分页列表
export function deviceList(parasm) {
  return defHttp.get({ url: Api.deviceList, params: parasm }, { errorMessageMode: 'message' });
}

// 车辆维修分页列表
export function playBack(params: object) {
  return defHttp.get({ url: Api.playBack, params: params }, { errorMessageMode: 'message' });
}
