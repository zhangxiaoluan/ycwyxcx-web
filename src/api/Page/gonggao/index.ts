import { defHttp } from '@/utils/http/axios';

enum Api {
  announcementPage = `/announcement/page`,
  announcementAdd = `/announcement/add`,
  announcementEdit = `/announcement/update`,
  announcementDel = `/announcement/delete`,
  categoryPage = `/announcement/category/page`,
  categoryAdd = `/announcement/category/add`,
  categoryEdit = `/announcement/category/update`,
  categoryDel = `/announcement/category/delete`,
}

// 列表
export function announcementPage(params) {
  return defHttp.get(
    { url: Api.announcementPage, params: params },
    { errorMessageMode: 'message' },
  );
}

// 添加
export function announcementAdd(params) {
  return defHttp.post(
    { url: Api.announcementAdd, params: params },
    { errorMessageMode: 'message' },
  );
}

// 编辑
export function announcementEdit(params) {
  return defHttp.put(
    { url: Api.announcementEdit, params: params },
    { errorMessageMode: 'message' },
  );
}

// 删除
export function announcementDel(id) {
  return defHttp.delete({ url: Api.announcementDel + '/' + id }, { errorMessageMode: 'message' });
}

// 列表
export function categoryPage(params) {
  return defHttp.get({ url: Api.categoryPage, params: params }, { errorMessageMode: 'message' });
}

export function categoryAdd(params) {
  return defHttp.post({ url: Api.categoryAdd, params: params }, { errorMessageMode: 'message' });
}

export function categoryEdit(params) {
  return defHttp.put({ url: Api.categoryEdit, params: params }, { errorMessageMode: 'message' });
}

export function categoryDel(id) {
  return defHttp.delete({ url: Api.categoryDel + '/' + id }, { errorMessageMode: 'message' });
}
