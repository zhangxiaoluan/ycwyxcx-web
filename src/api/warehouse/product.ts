import { defHttp } from '@/utils/http/axios';
import type {
  ProductPageParams,
  ProductPageResult,
  ProductListItem,
  ProductAddParams,
  ProductUpdateParams,
  ProductRecord,
} from './model/productModel';

enum Api {
  page = '/warehouse/product/page',
  list = '/warehouse/product/list',
  add = '/warehouse/product/add',
  update = '/warehouse/product/update',
  delete = '/warehouse/product/delete',
  detail = '/warehouse/product/detail',
  warning = '/warehouse/product/warning',
}

export function getProductPage(params: ProductPageParams) {
  return defHttp.get<ProductPageResult>({ url: Api.page, params }, { errorMessageMode: 'message' });
}

export function getProductList(params) {
  return defHttp.get<ProductListItem[]>({ url: Api.list, params }, { errorMessageMode: 'message' });
}

export function addProduct(params: ProductAddParams) {
  return defHttp.post({ url: Api.add, params }, { errorMessageMode: 'message' });
}

export function updateProduct(params: ProductUpdateParams) {
  return defHttp.post({ url: Api.update, params }, { errorMessageMode: 'message' });
}

export function deleteProduct(id: number | string) {
  return defHttp.post({ url: `${Api.delete}/${id}` }, { errorMessageMode: 'message' });
}

export function getProductDetail(id: number) {
  return defHttp.get<ProductRecord>(
    { url: `${Api.detail}/${id}` },
    { errorMessageMode: 'message' },
  );
}

export function getWarningProducts() {
  return defHttp.get<ProductListItem[]>({ url: Api.warning }, { errorMessageMode: 'message' });
}
