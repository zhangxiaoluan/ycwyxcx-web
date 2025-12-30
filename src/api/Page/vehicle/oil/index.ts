import { defHttp } from '/@/utils/http/axios';
enum Api {
  gasolinePage = `/gasoline/cards/page`,
  recharge = `/gasoline/cards/recharge`,
  oilTypes = `/gasoline/cards/types`,
  gasoline = `/gasoline/cards`,
  historiesPage = `/gasoline/histories/page/`,
  rechargePage = `/gasoline/recharge/page/`,
  balanceBill = `/gasoline/card/balance/bill`,
  balanceRechargeBill = `/gasoline/card/balance/bill/recharge`,
  cardsChange = `/gasoline/cards/change`,
}

// 油卡分页列表
export function gasolinePage(params: object) {
  return defHttp.get({ url: Api.gasolinePage, params: params }, { errorMessageMode: 'message' });
}

// 删除油卡
export function delOil(id: string | number) {
  return defHttp.delete({ url: `${Api.gasoline}/${id}` }, { errorMessageMode: 'message' });
}

// 新增油卡
export function addOil(params: object) {
  return defHttp.post({ url: Api.gasoline, params: params }, { errorMessageMode: 'message' });
}

// 修改油卡
export function editOil(params: object) {
  return defHttp.put({ url: Api.gasoline, params: params }, { errorMessageMode: 'message' });
}

// 油卡类型
export function oilTypes() {
  return defHttp.get({ url: Api.oilTypes }, { errorMessageMode: 'message' });
}

// 油卡充值
export function recharge(params: object) {
  return defHttp.post({ url: Api.recharge, params: params }, { errorMessageMode: 'message' });
}

// 油卡消费记录
export function historiesPage(params) {
  return defHttp.get(
    { url: `${Api.historiesPage}${params.id}`, params: params },
    { errorMessageMode: 'message' },
  );
}

// 油卡充值记录
// export function rechargePage(id: string | number) {
//   return defHttp.get({ url: Api.rechargePage, params: id }, { errorMessageMode: 'message' });
// }
// // 油卡充值记录
export function rechargePage(params) {
  return defHttp.get({ url:`${Api.rechargePage}${params.id}` , params: params }, { errorMessageMode: 'message' });
}
// 是否充账
export function balanceBill(params) {
  return defHttp.post({ url: Api.balanceBill, params: params }, { errorMessageMode: 'message' });
}
// 充值记录冲账
export function balanceRechargeBill(params) {
  return defHttp.post({ url: Api.balanceRechargeBill, params: params }, { errorMessageMode: 'message' });
}

// 充账记录
export function balanceBillLog(id) {
  return defHttp.get({ url: Api.balanceBill, params: id }, { errorMessageMode: 'message' });
}

// 作废
export function cardsChange(id) {
  return defHttp.get({ url: Api.cardsChange, params: id }, { errorMessageMode: 'message' });
}
