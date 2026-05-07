export interface StockRecordPageParams {
  current: number;
  size: number;
  communityId: number;
  productId?: number;
  type?: number;
}

export interface StockRecord {
  id: number;
  communityId: number;
  productId: number;
  productName: string;
  type: number;
  quantity: number;
  operator: string;
  remark?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockRecordPageResult {
  records: StockRecord[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface StockInParams {
  productId: number;
  quantity: number;
  operator: string;
  remark?: string;
}

export interface StockOutParams {
  productId: number;
  quantity: number;
  operator: string;
  remark?: string;
}
