import { defHttp } from '/@/utils/http/axios';

enum Api {
  reviewList = `/vehicle/apply/review/list`,
  processDetail = `/vehicle/apply/`,
}

// 待审核列表
export function reviewList() {
  return defHttp.get({ url: Api.reviewList }, { errorMessageMode: 'message' });
}
// 待审核列表详情
export function processDetail(id: string | number) {
  return defHttp.get({ url: Api.processDetail, params: id }, { errorMessageMode: 'message' });
}
