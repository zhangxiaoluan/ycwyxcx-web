import { defHttp } from '@/utils/http/axios';

enum Api {
  menuPage = `/system/front/menu/page`,
  menu = `/system/front/menu`,
  frontMenuKv = `/system/front/menu/module/list`,
}

// 分页查看审核人员信息
export const menuPage = (params: string | object) => {
  return defHttp.get<any>({ url: Api.menuPage, params: params }, { errorMessageMode: 'message' });
};

// 更新前台功能
export const editMenu = (params: string | object) => {
  return defHttp.put<any>({ url: Api.menu, params: params }, { errorMessageMode: 'message' });
};

// 删除前台功能
export const delMenu = (id: string | number) => {
  return defHttp.delete<any>({ url: `${Api.menu}/${id}` }, { errorMessageMode: 'message' });
};

// 新增前台功能
export const addMenu = (params: string | object) => {
  return defHttp.post<any>({ url: Api.menu, params: params }, { errorMessageMode: 'message' });
};

// 模块下拉
export const frontMenuKv = () => {
  return defHttp.get<any>({ url: Api.frontMenuKv }, { errorMessageMode: 'message' });
};
