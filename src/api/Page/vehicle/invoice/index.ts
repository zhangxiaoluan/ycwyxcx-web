import { defHttp } from '/@/utils/http/axios';
enum Api {
  // invoicePage = `/gasoline/invoice/page`,
  invoicePage = `/gasoline/invoice/listPage`, //发票分页列表
  // invoiceAdd = `/gasoline/invoice`,
  invoiceAdd = `/gasoline/invoice/add`, //新增发票
  invoiceEdit = `/gasoline/invoice/update`, //修改发票
  invoiceDelete = `/gasoline/invoice/deleteById?id`, //删除发票
  invoiceSubmit = `/gasoline/invoice/submit`, // 提交发票
  getAssCardList = `/gasoline/cards/getAssCardList/`,
  invoiceStart = `/gasoline/invoice/start`, //发票对账
  invoiceAuditor = `/gasoline/invoice/auditor`, //发票对账
}

// 发票分页列表
export function invoicePage(params: object) {
  return defHttp.get({ url: Api.invoicePage, params: params }, { errorMessageMode: 'message' });
}

// 新增发票
export function addInvoice(params: object) {
  return defHttp.post({ url: Api.invoiceAdd, params: params }, { errorMessageMode: 'message' });
}

// 修改发票
export function editInvoice(params: object) {
  return defHttp.put({ url: Api.invoiceEdit, params: params }, { errorMessageMode: 'message' });
}

// 提交发票
export function invoiceSubmit(params: object) {
  return defHttp.put({ url: Api.invoiceSubmit, params: params }, { errorMessageMode: 'message' });
}
// 获取副卡列表
export function getAssCardList(params: object) {
  return defHttp.get({ url: Api.getAssCardList, params: params }, { errorMessageMode: 'message' });
}

// 删除发票
export function invoiceDelete(id: string | number) {
  return defHttp.delete({ url: `${Api.invoiceDelete}=${id}` }, { errorMessageMode: 'message' });
}
// 发票对账
export function invoiceStart(params: object) {
  return defHttp.get({ url: Api.invoiceStart, params: params }, { errorMessageMode: 'message' });
}
// 财务人员列表
export function invoiceAuditor(params: string | object) {
  return defHttp.get({ url: Api.invoiceAuditor, params: params }, { errorMessageMode: 'message' });
}
