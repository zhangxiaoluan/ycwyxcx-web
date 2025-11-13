import { defHttp } from '@/utils/http/axios';

enum Api {
  merchantPage = `/convenient/merchant/list`,
  merchantAdd = `/convenient/merchant/add`,
  merchantEdit = `/convenient/merchant/update`,
  merchantDetail = `/convenient/merchant/detail`,
  merchantDel = `/convenient/merchant/delete`,
  merchantType = `/convenient/merchant/category/all`,
}

// 列表
export function merchantPage(params) {
  return defHttp.post({ url: Api.merchantPage, params: params }, { errorMessageMode: 'message' });
}

export function merchantAdd(params) {
  return defHttp.post({ url: Api.merchantAdd, params: params }, { errorMessageMode: 'message' });
}

export function merchantEdit(params) {
  return defHttp.post({ url: Api.merchantEdit, params: params }, { errorMessageMode: 'message' });
}

export function merchantDetail(id) {
  return defHttp.post({ url: Api.merchantDetail + '/' + id }, { errorMessageMode: 'message' });
}

export function merchantDel(id) {
  return defHttp.delete({ url: Api.merchantDel + '/' + id }, { errorMessageMode: 'message' });
}

export function merchantType(params) {
  return defHttp.post({ url: Api.merchantType, params: params }, { errorMessageMode: 'message' });
}
