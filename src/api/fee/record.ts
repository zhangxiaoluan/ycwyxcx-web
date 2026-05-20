import { defHttp } from '@/utils/http/axios';
import type {
  FeeRecordPageParams,
  FeeRecordPageResult,
  FeeRecord,
  FeeRecordAddParams,
  FeeRecordUpdateParams,
} from './model/recordModel';

enum Api {
  page = '/fee/record/page',
  add = '/fee/record/add',
  update = '/fee/record/update',
  delete = '/fee/record/delete',
  detail = '/fee/record/detail',
}

export function getFeeRecordPage(params: FeeRecordPageParams) {
  return defHttp.get<FeeRecordPageResult>({ url: Api.page, params }, { errorMessageMode: 'message' });
}

export function addFeeRecord(params: FeeRecordAddParams) {
  return defHttp.post({ url: Api.add, params }, { errorMessageMode: 'message' });
}

export function updateFeeRecord(params: FeeRecordUpdateParams) {
  return defHttp.post({ url: Api.update, params }, { errorMessageMode: 'message' });
}

export function deleteFeeRecord(id: number | string) {
  return defHttp.post({ url: `${Api.delete}/${id}` }, { errorMessageMode: 'message' });
}

export function getFeeRecordDetail(id: number) {
  return defHttp.get<FeeRecord>({ url: `${Api.detail}/${id}` }, { errorMessageMode: 'message' });
}
