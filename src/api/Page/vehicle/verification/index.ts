import { defHttp } from '/@/utils/http/axios';
enum Api {
    applyList = `/gasoline/history/audit/apply/list`,
    toAuditList = `/gasoline/invoice/toAudit`,
    invoiceAudit = `/gasoline/invoice/audit`,
}

// 发票申请列表
export function applyList(params: string | object) {
    return defHttp.get({ url: Api.applyList, params: params }, { errorMessageMode: 'message' })
}
// 发票审核列表
export function toAuditList(params: string | object) {
    return defHttp.get({ url: Api.toAuditList, params: params }, { errorMessageMode: 'message' })
}
// 审核
export function invoiceAudit(params: string | object) {
    return defHttp.get({ url: Api.invoiceAudit, params: params }, { errorMessageMode: 'message' })
}
