import { defHttp } from '@/utils/http/axios';

enum Api {
  communityPage = `/community/post/page`,
  communityStatus = `/community/post/change/status`,
}

// 列表
export function communityPage(params) {
  return defHttp.get({ url: Api.communityPage, params: params }, { errorMessageMode: 'message' });
}


// 列表
export function communityStatus(params) {
  return defHttp.get({ url: Api.communityStatus, params: params }, { errorMessageMode: 'message' });
}


