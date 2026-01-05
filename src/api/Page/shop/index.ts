import { defHttp } from '@/utils/http/axios';

enum Api {
  // 商户
  merchantPage = `/convenient/merchant/list`,
  merchantAdd = `/convenient/merchant/add`,
  merchantEdit = `/convenient/merchant/update`,
  merchantDetail = `/convenient/merchant/detail`,
  merchantDel = `/convenient/merchant/delete`,
  merchantType = `/convenient/merchant/category/all`,
  createRr = `/payment/qr/create`,

  // 商品
  productList = `/points/mall/product/list`,
  productDel = `/points/mall/product/delete/`,
  productAdd = `/points/mall/product/add`,
  productEdit = `/points/mall/product/update`,

  // 商户分类
  categoryAll = `/convenient/merchant/category/all`,
  categoryAdd = `/convenient/merchant/category/add`,
  categoryEdit = `/convenient/merchant/category/update`,
  categoryDel = `/convenient/merchant/category/delete`,
}

// 列表
export function merchantPage(params) {
  return defHttp.post({ url: Api.merchantPage, params: params }, { errorMessageMode: 'message' });
}

export function merchantAdd(params) {
  return defHttp.post({ url: Api.merchantAdd, params: params }, { errorMessageMode: 'message' });
}

export function merchantEdit(params) {
  return defHttp.post({ url: Api.merchantEdit, params: params }, { errorMessageMode: 'message' });
}

export function merchantDetail(id) {
  return defHttp.post({ url: Api.merchantDetail + '/' + id }, { errorMessageMode: 'message' });
}

export function merchantDel(id) {
  return defHttp.delete({ url: Api.merchantDel + '/' + id }, { errorMessageMode: 'message' });
}

export function merchantType(params) {
  return defHttp.post({ url: Api.merchantType, params: params }, { errorMessageMode: 'message' });
}

export function createRr(params) {
  return defHttp.post({ url: Api.createRr, params: params }, { errorMessageMode: 'message' });
}



// 列表
export function productList(params) {
  return defHttp.post({ url: Api.productList, params: params }, { errorMessageMode: 'message' });
}

export function productDel(id) {
  return defHttp.post({ url: Api.productDel + id }, { errorMessageMode: 'message' });
}

export function productAdd(params) {
  return defHttp.post({ url: Api.productAdd, params: params }, { errorMessageMode: 'message' });
}

export function productEdit(params) {
  return defHttp.post({ url: Api.productEdit, params: params }, { errorMessageMode: 'message' });
}

// 分类

export function categoryAll(params) {
  return defHttp.post({ url: Api.categoryAll, params: params }, { errorMessageMode: 'message' });
}

export function categoryAdd(params) {
  return defHttp.post({ url: Api.categoryAdd, params: params }, { errorMessageMode: 'message' });
}

export function categoryEdit(params) {
  return defHttp.post({ url: Api.categoryEdit, params: params }, { errorMessageMode: 'message' });
}

export function categoryDel(id) {
  return defHttp.post({ url: Api.categoryDel + '/' + id }, { errorMessageMode: 'message' });
}
