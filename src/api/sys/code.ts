import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '#/axios';

enum Api {
  GetTableList = '/system/code/tables',
  GetTableInfo = '/system/code/table',
  GenCode = '/system/code/gen-code',
  PrevCode = '/system/code/prev-code',
}

export const getTableList = () => {
  return defHttp.get({ url: Api.GetTableList });
};

export const getTableInfo = (table: string) => {
  return defHttp.get({ url: `${Api.GetTableInfo}/${table}` });
};

export const genCode = (data: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<any>(
    {
      url: Api.GenCode,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
};

export const prevCode = (data: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<any>(
    {
      url: Api.PrevCode,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
};
