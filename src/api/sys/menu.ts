import { defHttp } from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';
import { ErrorMessageMode } from '#/axios';

enum Api {
  GetMenuList = '/system/menu/front-result',
  MenuCommonApi = '/system/menu/common',
  MenuApi = '/system/menu',
}

/**
 * @description: Get user menu based on id
 */
export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

// 删除菜单
export const deleteMenu = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<any>(
    {
      url: `${Api.MenuCommonApi}/${params.id}`,
    },
    {
      errorMessageMode: mode,
    },
  );
};

// 新增
export const saveMenu = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<any>(
    {
      url: Api.MenuApi,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};

// 编辑
export const updateMenu = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.put<any>(
    {
      url: Api.MenuApi,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};
