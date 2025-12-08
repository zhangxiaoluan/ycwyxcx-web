import { defHttp } from '@/utils/http/axios';

enum Api {
  communityPage = `/community/post/page`,
  communityStatus = `/community/post/change/status`,

  // 便民电话分类
  categoryAdd = `/convenient/phone/category/add`,
  categoryAll = `/convenient/phone/category/all`,
  categoryEdit = `/convenient/phone/category/update`,
  categoryDel = `/convenient/phone/category/delete/`,
  // 便民电话
  categoryHomeList = `/convenient/phone/list`,
  categoryHomeEdit = `/convenient/phone/update`,
  categoryHomeAdd = `/convenient/phone/add`,
  categoryHomeDel = `/convenient/phone/delete/`,
}

// 列表
export function communityPage(params) {
  return defHttp.get({ url: Api.communityPage, params: params }, { errorMessageMode: 'message' });
}

// 列表
export function communityStatus(params) {
  return defHttp.get({ url: Api.communityStatus, params: params }, { errorMessageMode: 'message' });
}

//  -------- 电话服务分类 -----

export function categoryAdd(params) {
  return defHttp.post({ url: Api.categoryAdd, params: params }, { errorMessageMode: 'message' });
}

export function categoryAll(params) {
  return defHttp.post({ url: Api.categoryAll, params: params }, { errorMessageMode: 'message' });
}

export function categoryEdit(params) {
  return defHttp.post({ url: Api.categoryEdit, params: params }, { errorMessageMode: 'message' });
}

export function categoryDel(id) {
  return defHttp.post({ url: Api.categoryDel + id }, { errorMessageMode: 'message' });
}

//  -------- 电话服务 -----

export function categoryHomeAdd(params) {
  return defHttp.post(
    { url: Api.categoryHomeAdd, params: params },
    { errorMessageMode: 'message' },
  );
}

export function categoryHomeList(params) {
  return defHttp.post(
    { url: Api.categoryHomeList, params: params },
    { errorMessageMode: 'message' },
  );
}

export function categoryHomeEdit(params) {
  return defHttp.post(
    { url: Api.categoryHomeEdit, params: params },
    { errorMessageMode: 'message' },
  );
}

export function categoryHomeDel(id) {
  return defHttp.post({ url: Api.categoryHomeDel + id }, { errorMessageMode: 'message' });
}
