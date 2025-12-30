import { defHttp } from '/@/utils/http/axios';
enum Api {
  license = `/vehicle/license`,
}

// 车辆报废
export function license(id: string | number) {
  return defHttp.put({ url: `${Api.license}/${id}` }, { errorMessageMode: 'message' });
}
