import { defHttp } from '@/utils/http/axios';

enum Api {
  repairPage = `/repair/list`,
  repairAssign = `/repair/assign`,
  repairList = `/repair/repairer-list`,
}

// 列表
export function repairPage(params) {
  return defHttp.post({ url: Api.repairPage, params: params }, { errorMessageMode: 'message' });
}

// 配单
export function repairAssign(params) {
  return defHttp.post(
    { url: Api.repairAssign + '/' + params.id, params: params },
    { errorMessageMode: 'message' },
  );
}

export function repairList(params) {
  return defHttp.get({ url: Api.repairList, params: params }, { errorMessageMode: 'message' });
}
