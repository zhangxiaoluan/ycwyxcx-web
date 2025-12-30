import { defHttp } from '@/utils/http/axios';

enum Api {
  userRolePage = `/system/user/role/page`,
  publicUserRole = `/system/user/role/`,
  roleOption = '/system/role/common',
  userList = '/system/role/common',
}

// 角色列表
export const userRolePage = (params: string | object) => {
  return defHttp.get<any>(
    { url: Api.userRolePage, params: params },
    { errorMessageMode: 'message' },
  );
};

// 删除用户
export const delUserRole = (id: string | number) => {
  return defHttp.delete<any>(
    { url: Api.publicUserRole, params: id },
    { errorMessageMode: 'message' },
  );
};

// 编辑用户
export const editUserRole = (params) => {
  return defHttp.put<any>(
    { url: Api.publicUserRole, params: params },
    { errorMessageMode: 'message' },
  );
};

// 新增用户
export const addUserRole = (params) => {
  return defHttp.post<any>(
    { url: Api.publicUserRole, params: params },
    { errorMessageMode: 'message' },
  );
};

// 角色下拉
export function roleOption() {
  return defHttp.get<any>({ url: `${Api.roleOption}/?size=200` }, { errorMessageMode: 'message' });
}
