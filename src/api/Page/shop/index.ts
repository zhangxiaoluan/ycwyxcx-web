import { defHttp } from '@/utils/http/axios';

enum Api {
  merchantPage = `/convenient/merchant/list`,
}

// 列表
export function merchantPage(params) {
  return defHttp.get({ url: Api.merchantPage, params: params }, { errorMessageMode: 'message' });
}
