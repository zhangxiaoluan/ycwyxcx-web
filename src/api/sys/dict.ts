import { defHttp } from '@/utils/http/axios';

enum Api {
  dictTree = `/system/settings/tree`,
  group = `/system/settings/group`,
  delDict = `/system/settings`,
  withoutMe = `/system/settings/tree/without/me`,
}

// 字典表组织树
export function dictTree() {
  return defHttp.get({ url: Api.dictTree }, { errorMessageMode: 'message' });
}

// 字典表组织树下拉
export function dictTreePage(id) {
  return defHttp.get({ url: `${Api.withoutMe}?id=${id}` }, { errorMessageMode: 'message' });
}

// 创建组
export function group(params) {
  return defHttp.post({ url: Api.group, params: params }, { errorMessageMode: 'message' });
}

// 编辑组
export function editGroup(params) {
  return defHttp.put({ url: Api.delDict, params: params }, { errorMessageMode: 'message' });
}

//  删除组
export const delDict = (id) => {
  return defHttp.delete({ url: `${Api.delDict}/${id}` }, { errorMessageMode: 'message' });
};
