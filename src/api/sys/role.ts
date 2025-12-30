import { defHttp } from '@/utils/http/axios';

import { ErrorMessageMode } from '#/axios';
import { RoleStatusParam } from './model/roleModel';

enum Api {
  // roleDelete = '/system/role/delete',
  RoleApi = '/system/role',
  ALL_ROLES = '/system/role/all',
  SetRoleStatusApi = '/system/role/status',
  rolePermission = '/system/role/permission',
  frontMenu = '/system/front/menu/list',
}

/**
 * @description: all valid roles
 */
export function allRoles(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      url: Api.ALL_ROLES,
      params: params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/** todo 下个版本如果没有更改进行删除
 * @description: user login api
export function roleList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      url: Api.RoleCommonApi,
      params: params,
    },
    {
      errorMessageMode: mode,
    },
  );
}*/

/**
 * 保存角色
 * @param params 角色模型
 * @param mode 错误提示模式
 * @returns 数据
 */
export function saveRole(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.RoleApi,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function updateRole(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      url: Api.RoleApi,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 角色删除
export function deleteRole(id: string | number, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>(
    {
      url: `${Api.RoleApi}/${id}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 获取数据权限
export function rolePermission(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>({ url: Api.rolePermission }, { errorMessageMode: mode });
}

// 数据权限详情
export function roleAl(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>({ url: Api.ALL_ROLES }, { errorMessageMode: mode });
}

/**
 *
 * @param params
 * @param mode
 * @returns
 */
export function setRoleStatus(params: RoleStatusParam, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.SetRoleStatusApi,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function roleMenus(roleId, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      url: `${Api.RoleApi}/${roleId}/menus`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 前台用户菜单
export function frontMenu(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>({ url: Api.frontMenu }, { errorMessageMode: mode });
}
