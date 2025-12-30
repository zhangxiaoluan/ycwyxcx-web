import { defHttp } from '/@/utils/http/axios';
enum Api {
  applyPage = `/vehicle/apply/page`,
  applyDetail = `/vehicle/apply`,
  applyReject = `/vehicle/apply/reject`,
}

// 用车申请列表
export function applyPage(params: string | object) {
  return defHttp.get({ url: Api.applyPage, params: params }, { errorMessageMode: 'message' });
}

export function applyDetail(id: string) {
  return defHttp.get({ url: `${Api.applyDetail}/${id}` }, { errorMessageMode: 'message' });
}

// 拒绝理由
export function applyReject(params) {
  return defHttp.post({ url: Api.applyReject, params: params }, { errorMessageMode: 'message' });
}
