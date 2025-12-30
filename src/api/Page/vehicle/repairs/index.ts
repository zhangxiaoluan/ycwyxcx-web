import { defHttp } from '/@/utils/http/axios';
enum Api {
  repairsPage = `/vehicle/repairs/page`,
  repairs = `/vehicle/repairs/`,
}

// 车辆维修分页列表
export function repairsPage(params: string | object) {
  return defHttp.get({ url: Api.repairsPage, params: params }, { errorMessageMode: 'message' });
}

// 车辆维修详情
export function detailRepairs(id: string | number) {
  return defHttp.get({ url: Api.repairs, params: id }, { errorMessageMode: 'message' });
}
