import { defHttp } from '@/utils/http/axios';
import type {
  DevicePageParams,
  DevicePageResult,
  Device,
  DeviceAddParams,
  DeviceUpdateParams,
} from './model/deviceModel';

enum Api {
  page = '/device/common',
  all = '/device/common/all',
  add = '/device/common',
  detail = '/device/common',
  update = '/device/common',
  delete = '/device/common',
}

export function getDevicePage(params: DevicePageParams) {
  return defHttp.get<DevicePageResult>({ url: Api.page, params }, { errorMessageMode: 'message' });
}

export function getDeviceAll() {
  return defHttp.get<Device[]>({ url: Api.all }, { errorMessageMode: 'message' });
}

export function addDevice(params: DeviceAddParams) {
  return defHttp.post({ url: Api.add, params }, { errorMessageMode: 'message' });
}

export function getDeviceDetail(id: number | string) {
  return defHttp.get<Device>({ url: `${Api.detail}/${id}` }, { errorMessageMode: 'message' });
}

export function updateDevice(params: DeviceUpdateParams) {
  return defHttp.put({ url: Api.update, params }, { errorMessageMode: 'message' });
}

export function deleteDevice(id: number | string) {
  return defHttp.delete({ url: `${Api.delete}/${id}` }, { errorMessageMode: 'message' });
}
