import { defHttp } from '@/utils/http/axios';

enum Api {
  baseUrl = `/system/admin/page`,
  adminCommon = `/system/admin/common`,
  admin = `/system/admin`,
  CREATE_ADMIN = `/system/admin/create-admin`,
  resetPasswd = `/system/admin/rest-passwd`,
  setPasswd = `/system/admin/update-passwd`,
  editUser = `/system/admin/update-admin`,
  noticeRead = `/notice/read`,
}

// 管理员列表
export function list(params) {
  return defHttp.get({ url: Api.baseUrl, params: params }, { errorMessageMode: 'message' });
}

// 管理员编辑
export function update(params) {
  return defHttp.put({ url: Api.admin, params }, { errorMessageMode: 'message' });
}

// 管理员删除
export function detail(id) {
  return defHttp.get({ url: `${Api.adminCommon}/${id}` }, { errorMessageMode: 'message' });
}

// 管理员新增
export function createAdmin(params) {
  return defHttp.post({ url: Api.CREATE_ADMIN, params }, { errorMessageMode: 'message' });
}

// 重置密码
export function resetPasswd(userId) {
  return defHttp.put({ url: `${Api.resetPasswd}/${userId}` }, { errorMessageMode: 'message' });
}

// 修改密码
export function setPasswd(params: object) {
  return defHttp.post({ url: Api.setPasswd, params }, { errorMessageMode: 'message' });
}

// 修改用户信息
export function editUser(params: object) {
  return defHttp.put({ url: Api.editUser, params }, { errorMessageMode: 'message' });
}

// create Admin
export function create(params) {
  return defHttp.post({ url: Api.adminCommon, params }, { errorMessageMode: 'message' });
}

// delete Admin
export function remove(id) {
  return defHttp.delete({ url: `${Api.adminCommon}/${id}` }, { errorMessageMode: 'message' });
}

// 通知已读
export function noticeRead(id) {
  return defHttp.put({ url: `${Api.noticeRead}/${id}` }, { errorMessageMode: 'message' });
}

// 下载导出
export function exportExcel(empty = false) {
  if (empty) {
    return `/api${Api.baseUrl}/export?empty=true`;
  } else {
    return `/api${Api.baseUrl}/export`;
  }
}
