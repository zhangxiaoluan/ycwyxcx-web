import { defHttp } from '@/utils/http/axios';

enum Api {
  repairPage = `/repair/list`,
}

// 列表
export function repairPage(params) {
  return defHttp.post({ url: Api.repairPage, params: params }, { errorMessageMode: 'message' });
}
