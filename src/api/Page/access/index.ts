import { defHttp } from '@/utils/http/axios';

enum Api {
  accessSync = `/access/sync`,
  doorPage = `/access/door/common`,
  doorUpdate = `/access/door/common`,
  doorControl = `/access/door`,
  logPage = `/access/log/common`,

  // 复用物业基础数据
  communityEnabled = `/property/community/enabled`,
  buildingByCommunity = `/property/building/community`,
}

// 同步门禁中间服务设备
export function accessSync() {
  return defHttp.post({ url: Api.accessSync }, { errorMessageMode: 'message' });
}

// 门禁设备分页
export function doorPage(params) {
  return defHttp.get({ url: Api.doorPage, params: params }, { errorMessageMode: 'message' });
}

// 修改门禁（绑定/解绑楼栋、启停用）
export function doorUpdate(params) {
  return defHttp.put({ url: Api.doorUpdate, params: params }, { errorMessageMode: 'message' });
}

// 物业远程控制 action: open / close / always_open / resume
// 注意：后端用 @RequestParam 接收 action，必须拼到 URL 上。
// defHttp 对非 GET 请求会把 params 当作 body 发送，不设置 joinParamsToUrl 会报
// "Required request parameter 'action' is not present"。
export function doorControl(id: string, action: string) {
  return defHttp.post(
    { url: Api.doorControl + '/' + id + '/control', params: { action } },
    { errorMessageMode: 'message', joinParamsToUrl: true },
  );
}

// 操作记录分页
export function logPage(params) {
  return defHttp.get({ url: Api.logPage, params: params }, { errorMessageMode: 'message' });
}

// 启用中的小区列表（绑定弹窗用）
export function communityEnabled() {
  return defHttp.get({ url: Api.communityEnabled }, { errorMessageMode: 'message' });
}

// 某小区下的楼栋列表（绑定弹窗用）
export function buildingByCommunity(communityId: string) {
  return defHttp.get(
    { url: Api.buildingByCommunity + '/' + communityId },
    { errorMessageMode: 'message' },
  );
}
