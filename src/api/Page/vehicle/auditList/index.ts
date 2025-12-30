import { defHttp } from '/@/utils/http/axios';
enum Api {
  applyList = `/gasoline/history/audit/apply/list`,
  auditList = `/gasoline/history/audit/list`,
  changeStatus = `/gasoline/history/audit/change/status`,
}

// 油卡申请列表
export function applyList(params: string | object) {
  return defHttp.get({ url: Api.applyList, params: params }, { errorMessageMode: 'message' });
}
// 油卡审核列表
export function auditList(params: string | object) {
  return defHttp.get({ url: Api.auditList, params: params }, { errorMessageMode: 'message' });
}
// 审核状态
export function changeStatus(params: string | object) {
    return defHttp.get({ url: Api.changeStatus, params: params }, { errorMessageMode: 'message' });
  }


