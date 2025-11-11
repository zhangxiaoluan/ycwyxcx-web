import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '#/axios';

enum Api {
  OrgCommonApi = '/system/org/common',
  OrgApi = '/system/org',
  orgDelete = '/system/org/delete',
}

// 组织列表
export function orgList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      url: Api.OrgApi,
      params: params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function updateOrg(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>({ url: Api.OrgApi, params }, { errorMessageMode: mode });
}

export function saveOrg(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>({ url: Api.OrgApi, params }, { errorMessageMode: mode });
}

export function deleteOrg(id, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>({ url: `${Api.orgDelete}/${id}` }, { errorMessageMode: mode });
}
