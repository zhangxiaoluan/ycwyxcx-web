import { defHttp } from '@/utils/http/axios';
import type {
  StockRecordPageParams,
  StockRecordPageResult,
  StockInParams,
  StockOutParams,
} from './model/stockModel';

enum Api {
  stockIn = '/warehouse/stock/in',
  stockOut = '/warehouse/stock/out',
  recordPage = '/warehouse/stock/record/page',
}

// 入库;
export function stockIn(params: StockInParams) {
  return defHttp.post({ url: Api.stockIn, params }, { errorMessageMode: 'message' });
}

// 出库
export function stockOut(params: StockOutParams) {
  return defHttp.post({ url: Api.stockOut, params }, { errorMessageMode: 'message' });
}

// 出入库记录分页
export function getStockRecordPage(params: StockRecordPageParams) {
  return defHttp.get<StockRecordPageResult>(
    { url: Api.recordPage, params },
    { errorMessageMode: 'message' },
  );
}
