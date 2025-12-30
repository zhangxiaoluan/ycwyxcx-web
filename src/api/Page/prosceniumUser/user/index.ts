import { defHttp } from '@/utils/http/axios';

enum Api {
  userPage = `/system/user/page`,
  user = `/system/user`,
  regionTree = `/system/user/region/tree`,
}

// 分页查看审核人员信息
export const userPage = (params: string | object) => {
  return defHttp.get<any>({ url: Api.userPage, params: params }, { errorMessageMode: 'message' });
};

// 新增用户信息
export const addUser = (params: string | object) => {
  return defHttp.post<any>({ url: Api.user, params: params }, { errorMessageMode: 'message' });
};

// 编辑用户信息
export const editUser = (params: string | object) => {
  return defHttp.put<any>({ url: Api.user, params: params }, { errorMessageMode: 'message' });
};

// 删除用户信息
export const delUser = (id: string | number) => {
  return defHttp.delete<any>({ url: `${Api.user}/${id}` }, { errorMessageMode: 'message' });
};

// 区域选择器
export const regionTree = () => {
  return defHttp.get<any>({ url: Api.regionTree }, { errorMessageMode: 'message' });
};
