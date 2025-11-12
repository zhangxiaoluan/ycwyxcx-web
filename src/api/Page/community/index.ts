import { defHttp } from '@/utils/http/axios';

enum Api {
  communityPage = `/community/post/page`,
}

// 列表
export function communityPage(params) {
  return defHttp.get({ url: Api.communityPage, params: params }, { errorMessageMode: 'message' });
}
