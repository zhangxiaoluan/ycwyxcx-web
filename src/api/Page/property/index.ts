import { defHttp } from '@/utils/http/axios';

enum Api {
  applicationPage = `/property/application/page`,
  applicationDetail = `/property/application/detail`,
  applicationReview = `/property/application/review`,
  availableRoles = `/property/application/available-roles`,
  statistics = `/property/application/statistics`,
}

// 物业申请分页（status: 0-待审核 1-通过 2-拒绝）
export function propertyApplyPage(params) {
  return defHttp.get({ url: Api.applicationPage, params }, { errorMessageMode: 'message' });
}

// 申请详情
export function propertyApplyDetail(id: string | number) {
  return defHttp.get({ url: Api.applicationDetail + '/' + id }, { errorMessageMode: 'message' });
}

// 审核：status=1 通过（需 finalRoleId） / status=2 拒绝（需 rejectReason）
export function propertyApplyReview(params) {
  return defHttp.post({ url: Api.applicationReview, params }, { errorMessageMode: 'message' });
}

// 可分配的物业角色
export function availablePropertyRoles() {
  return defHttp.get({ url: Api.availableRoles }, { errorMessageMode: 'message' });
}

// 申请统计
export function propertyApplyStatistics() {
  return defHttp.get({ url: Api.statistics }, { errorMessageMode: 'message' });
}
