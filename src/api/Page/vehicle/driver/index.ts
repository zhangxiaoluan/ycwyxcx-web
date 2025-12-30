import { defHttp } from '@/utils/http/axios';

enum Api {
  driverPage = `/driver/page`,
  delDriver = `/driver`,
  addDriver = `/driver`, // 编辑or新增
  driverType = `/driver/types`,
  userList = `/system/user/list`,
  vehicleDept = `/driver/vehicle`,
}

// 驾驶员信息分页列表
export function driverPage(params) {
  return defHttp.get({ url: Api.driverPage, params: params }, { errorMessageMode: 'message' });
}
// 删除车辆信息
export function delDriver(id: string | number) {
  return defHttp.delete({ url: `${Api.delDriver}/${id}` }, { errorMessageMode: 'message' });
}
// 车辆新增
export function addDriver(params: object) {
  return defHttp.post({ url: Api.addDriver, params: params }, { errorMessageMode: 'message' });
}
// 车辆编辑
export function editDriver(params: object) {
  return defHttp.put({ url: Api.addDriver, params: params }, { errorMessageMode: 'message' });
}

// 准驾车型列表
export const driverType = () => {
  return defHttp.get({ url: Api.driverType }, { errorMessageMode: 'message' });
};

// 查询所有前台人员列表
export const userList = (params) => {
  return defHttp.get({ url: Api.userList, params: params }, { errorMessageMode: 'message' });
};

// 根据车辆查询驾驶员列表
export const vehicleDept = (vehicleId: string | number) => {
  return defHttp.get({ url: `${Api.vehicleDept}/${vehicleId}` }, { errorMessageMode: 'message' });
};
