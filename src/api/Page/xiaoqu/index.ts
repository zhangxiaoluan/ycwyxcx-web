import { defHttp } from '@/utils/http/axios';

enum Api {
  xiaoquPage = `/property/community/list`,
  xiaoquAdd = `/property/community/add`,
  xiaoquEdit = `/property/community/update`,
  xiaoquDel = `/property/community/delete`,

  // 漏洞管理
  buildingPage = `/property/building/community`,
  buildingAdd = `/property/building/add`,
  buildingEdit = `/property/building/update`,
  buildingDel = `/property/building/delete`,

  // 房间管理
  buildingHouseList = `/property/room/building`,
  buildingHouseAdd = `/property/room/add`,
  buildingHouseEdit = `/property/room/update`,
  buildingHouseDel = `/property/room/delete`,

  // 审核
  bindingList = `/property/binding/all`,
  bindingAudit = `/property/binding/audit`,
  bindingUnbind = `/property/binding/unbind`,
}

// 列表
export function xiaoquPage(params) {
  return defHttp.post({ url: Api.xiaoquPage, params: params }, { errorMessageMode: 'message' });
}

// 戏赠
export function xiaoquAdd(params) {
  return defHttp.post({ url: Api.xiaoquAdd, params: params }, { errorMessageMode: 'message' });
}

// 戏赠
export function xiaoquEdit(params) {
  return defHttp.post({ url: Api.xiaoquEdit, params: params }, { errorMessageMode: 'message' });
}

// 戏赠
export function xiaoquDel(id) {
  return defHttp.post({ url: Api.xiaoquDel + '/' + id }, { errorMessageMode: 'message' });
}

export function buildingPage(id) {
  return defHttp.get({ url: Api.buildingPage + '/' + id }, { errorMessageMode: 'message' });
}

export function buildingAdd(params) {
  return defHttp.post({ url: Api.buildingAdd, params: params }, { errorMessageMode: 'message' });
}

export function buildingEdit(params) {
  return defHttp.post({ url: Api.buildingEdit, params: params }, { errorMessageMode: 'message' });
}

export function buildingDel(id) {
  return defHttp.post({ url: Api.buildingDel + '/' + id }, { errorMessageMode: 'message' });
}

export function buildingHouseList(id) {
  return defHttp.get({ url: Api.buildingHouseList + '/' + id }, { errorMessageMode: 'message' });
}

export function buildingHouseAdd(params) {
  return defHttp.post(
    { url: Api.buildingHouseAdd, params: params },
    { errorMessageMode: 'message' },
  );
}

export function buildingHouseEdit(params) {
  return defHttp.post(
    { url: Api.buildingHouseEdit, params: params },
    { errorMessageMode: 'message' },
  );
}

export function buildingHouseDel(id) {
  return defHttp.post({ url: Api.buildingHouseDel + '/' + id }, { errorMessageMode: 'message' });
}

export function bindingList(params) {
  return defHttp.post(
    { url: Api.bindingList, params: params },
    { errorMessageMode: 'message' },
  );
}

export function bindingAudit(params) {
  return defHttp.post({ url: Api.bindingAudit, params: params }, { errorMessageMode: 'message' });
}

export function bindingUnbind(params) {
  return defHttp.post(
    { url: Api.bindingUnbind + '/' + params.bindingId, params },
    { errorMessageMode: 'message' },
  );
}
