import { defHttp } from '/@/utils/http/axios';
enum Api {
  stBasic = `/vehicle/st/basic`,
  stTypes = `/vehicle/st/types`,
  stOrgs = `/vehicle/st/orgs`,
  yearBuy = `/vehicle/st/year/buy`,
}

// 车辆基础统计数据（累计行驶公里 年度派车次数）
export function stBasic() {
  return defHttp.get({ url: Api.stBasic }, { errorMessageMode: 'message' });
}

// 查询车辆类型饼状图
export function stTypes() {
  return defHttp.get({ url: Api.stTypes }, { errorMessageMode: 'message' });
}

// 各公司车辆占比
export function stOrgs() {
  return defHttp.get({ url: Api.stOrgs }, { errorMessageMode: 'message' });
}

// 车辆采购年份
export function yearBuy() {
  return defHttp.get({ url: Api.yearBuy }, { errorMessageMode: 'message' });
}
