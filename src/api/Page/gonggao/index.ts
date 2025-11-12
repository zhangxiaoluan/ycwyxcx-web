import { defHttp } from '@/utils/http/axios';

enum Api {
  announcementPage = `/announcement/page`,
  announcementAdd = `/announcement/add`,
  announcementEdit = `/announcement/update`,
  announcementDel = `/announcement/delete`,
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
