import { defHttp } from '/@/utils/http/axios';
enum Api {
  repairLibDiscountAdd = `/repair/lib/discount`,
  repairLibDiscountPage = `/repair/lib/discount/page`,
}

// 添加配件折扣
export function addDiscount(params) {
  return defHttp.post({ url: Api.repairLibDiscountAdd, params: params }, { errorMessageMode: 'message' });
}

// 修改配件折扣
export function editDiscount(params) {
  return defHttp.post({ url: Api.repairLibDiscountAdd, params: params }, { errorMessageMode: 'message' });
}

// 配件折扣删除
export function delDiscount(id) {
  return defHttp.delete({ url: `${Api.repairLibDiscountAdd}/${id}` }, { errorMessageMode: 'message' });
}

// 配件折扣删除
export function pageDiscount(params) {
  return defHttp.get({ url: `${Api.repairLibDiscountPage}` , params: params}, { errorMessageMode: 'message' });
}

