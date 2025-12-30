import { defHttp } from '/@/utils/http/axios';
enum Api {
  historiesPage = `/gasoline/histories/page/time`,
  historiesStatus = `/gasoline/histories/change/status`,
  historiesAdd = `/gasoline/histories`,
  operateLis = `/gasoline/history/operate/log/list`,
  deptList = `/system/admin/dept-list`,
  lastApproved = `/gasoline/history/audit/last/approved`,
  bookAccount = `/gasoline/histories/book-account`,
  getListByStationId = `/gasoline/histories/getListByStationId`,
  history = `/gasoline/histories/bind/history`,
  historystData = `/gasoline/invoice/stData`,
}

// 油卡对账列表
export function historiesPage(params: string | object) {
  return defHttp.get({ url: Api.historiesPage, params: params }, { errorMessageMode: 'message' });
}
// 统计
export function historystData(params: string | object) {
  return defHttp.get({ url: Api.historystData, params: params }, { errorMessageMode: 'message' });
}

// 油卡对账
export function historiesStatus(params: string | object) {
  return defHttp.get({ url: Api.historiesStatus, params: params }, { errorMessageMode: 'message' });
}
// 编辑对账
export function historiesAdd(params: object) {
  return defHttp.post({ url: Api.historiesAdd, params: params }, { errorMessageMode: 'message' });
}
// 详情
export function operateLis(params: string | object) {
  return defHttp.get({ url: Api.operateLis, params: params }, { errorMessageMode: 'message' });
}
// 审核人
export function deptList(params: string | object) {
  return defHttp.get({ url: Api.deptList, params: params }, { errorMessageMode: 'message' });
}
// 审核人
export function lastApproved(params: string | object) {
  return defHttp.get({ url: Api.lastApproved, params: params }, { errorMessageMode: 'message' });
}

// 扎帐
export function bookAccount(params: string | object) {
  return defHttp.get({ url: Api.bookAccount, params: params, timeout: 60000 }, { errorMessageMode: 'message' });
}

// 系统数据
export function getListByStationId(params: string | object) {
  return defHttp.get({ url: Api.getListByStationId, params: params }, { errorMessageMode: 'message' });
}

// 确认提交
export function history(params: string | object) {
  return defHttp.get({ url: Api.history, params: params }, { errorMessageMode: 'message' });
}
