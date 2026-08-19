import { defHttp } from '@/utils/http/axios';

enum Api {
  announcementPage = `/announcement/page`,
  announcementAdd = `/announcement/add`,
  announcementEdit = `/announcement/update`,
  announcementDel = `/announcement/delete`,
  announcementPublish = `/announcement/publish`,
  announcementWithdraw = `/announcement/withdraw`,
  categoryPage = `/announcement/category/page`,
  categoryAdd = `/announcement/category/add`,
  categoryEdit = `/announcement/category/update`,
  categoryDel = `/announcement/category/delete`,

  // 轮播图
  articlePage = `/web/article/page`,
  articleAdd = `/web/article`,
  articleStatus = `/web/article`,
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

// 发布公告
export function announcementPublish(id) {
  return defHttp.post({ url: Api.announcementPublish + '/' + id }, { errorMessageMode: 'message' });
}

// 撤回公告
export function announcementWithdraw(id) {
  return defHttp.post({ url: Api.announcementWithdraw + '/' + id }, { errorMessageMode: 'message' });
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

export function articlePage(params) {
  return defHttp.get({ url: Api.articlePage, params: params }, { errorMessageMode: 'message' });
}

export function articleAdd(params) {
  return defHttp.post({ url: Api.articleAdd, params: params }, { errorMessageMode: 'message' });
}

export function articleEdit(params) {
  return defHttp.put(
    { url: `${Api.articleAdd}/${params.id}`, params: params },
    { errorMessageMode: 'message' },
  );
}

export function articleDel(id) {
  return defHttp.delete({ url: `${Api.articleAdd}/${id}` }, { errorMessageMode: 'message' });
}

export function articleStatus(id, status) {
  // 1已发布 2 未发布
  const field = Number(status) == 1 ? 'offline' : 'publish';
  return defHttp.put(
    { url: `${Api.articleStatus}/${id}/${field}` },
    { errorMessageMode: 'message' },
  );
}
