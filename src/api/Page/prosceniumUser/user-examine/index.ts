import { defHttp } from '@/utils/http/axios';

enum Api {
  userExamine = `/system/auditors/`,
}

// 分页查看审核人员信息
export const userExamineList = (params: string | object) => {
  return defHttp.get<any>(
    { url: Api.userExamine, params: params },
    { errorMessageMode: 'message' },
  );
};

// 更新审核员
export const editUserExamine = (params: string | object) => {
  return defHttp.put<any>(
    { url: Api.userExamine, params: params },
    { errorMessageMode: 'message' },
  );
};

// 新增审核员
export const addUserExamine = (params: string | object) => {
  return defHttp.post<any>(
    { url: Api.userExamine, params: params },
    { errorMessageMode: 'message' },
  );
};

// 删除审核员
export const delUserExamine = (roleId: string | object, userId: string | object) => {
  return defHttp.delete<any>(
    { url: `${Api.userExamine}${roleId}/${userId}` },
    { errorMessageMode: 'message' },
  );
};
