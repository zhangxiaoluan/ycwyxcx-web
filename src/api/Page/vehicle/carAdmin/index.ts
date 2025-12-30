import { defHttp } from '/@/utils/http/axios';
enum Api {
  licensePage = `/vehicle/license/page`,
  delLicense = `/vehicle/license`,
  types = `/vehicle/license/types`,
  status = `/vehicle/license/status`,

  addCar = `/vehicle/license`, // 编辑or新增
  licenseDept = `/vehicle/license/dept`,
  oilCardNo = `/gasoline/cards/search`,
  ledgerApply = `/vehicle/license/apply/page`,
  ledgerOil = `/vehicle/license/oil/page`,
  ledgerRepair = `/vehicle/license/repair/page`,
  rechargeLast = `/gasoline/recharge/last`,
  ledgerSt = `/vehicle/license/st`,
  statusSt = `/vehicle/license/status/st`,
}

// 车辆信息分页列表 没有报废
export function licensePage(params) {
  return defHttp.get(
    { url: Api.licensePage, params: { ...params, isDestroy: false } },
    { errorMessageMode: 'message' },
  );
}

// 车辆信息分页列表 已经报废
export function onlicensePage(params) {
  return defHttp.get(
    { url: Api.licensePage, params: { ...params, isDestroy: true } },
    { errorMessageMode: 'message' },
  );
}

// 删除
export function delLicense(id: string | number) {
  return defHttp.delete({ url: `${Api.delLicense}/${id}` }, { errorMessageMode: 'message' });
}
// 查询车辆类型
export function types() {
  return defHttp.get({ url: Api.types }, { errorMessageMode: 'message' });
}
// 查询车辆状态
export function status() {
  return defHttp.get({ url: Api.status }, { errorMessageMode: 'message' });
}
// 车辆新增
export function addCar(params: object) {
  return defHttp.post({ url: Api.addCar, params: params }, { errorMessageMode: 'message' });
}
// 车辆编辑
export function editCar(params: object) {
  return defHttp.put({ url: Api.addCar, params: params }, { errorMessageMode: 'message' });
}
// 根据组织查询车辆列表
export function licenseDept(deptId: number | string) {
  return defHttp.get({ url: `${Api.licenseDept}/${deptId}` }, { errorMessageMode: 'message' });
}

// 油卡编号
export function oilCardNo(params) {
  return defHttp.get({ url: Api.oilCardNo, params: params }, { errorMessageMode: 'message' });
}

// 副卡关联主卡
export function rechargeLast(id: number | string) {
  return defHttp.get({ url: `${Api.rechargeLast}/${id}` }, { errorMessageMode: 'message' });
}
// 台帐派车
export function ledgerApply(params) {
  return defHttp.get({ url: Api.ledgerApply, params: params }, { errorMessageMode: 'message' });
}

// 台帐油料
export function ledgerOil(params) {
  return defHttp.get({ url: Api.ledgerOil, params: params }, { errorMessageMode: 'message' });
}

// 台帐维修
export function ledgerRepair(params) {
  return defHttp.get({ url: Api.ledgerRepair, params: params }, { errorMessageMode: 'message' });
}

// 台帐统计
export function ledgerSt(params) {
  return defHttp.get({ url: Api.ledgerSt, params: params }, { errorMessageMode: 'message' });
}

// 车辆状态统计
export function statusSt(params) {
  return defHttp.get({ url: Api.statusSt, params: params }, { errorMessageMode: 'message' });
}