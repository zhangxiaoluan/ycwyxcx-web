export interface FeeRecordPageParams {
  current: number;
  size: number;
  feeType?: string;
  roomId?: number;
  startMonth?: string;
  endMonth?: string;
}

export interface FeeRecord {
  id: number;
  communityId: number;
  buildingId?: number;
  roomId?: number;
  roomNumber?: string;
  ownerName?: string;
  feeType: string;
  startMonth: string;
  endMonth: string;
  amount: number;
  plateNumber?: string;
  paymentMethod?: string;
  payTime?: string;
  operator?: string;
  remark?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface FeeRecordPageResult {
  records: FeeRecord[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface FeeRecordAddParams {
  buildingId?: number;
  roomId?: number;
  roomNumber?: string;
  ownerName?: string;
  feeType: string;
  startMonth: string;
  endMonth: string;
  amount: number;
  plateNumber?: string;
  paymentMethod?: string;
  payTime?: string;
  operator?: string;
  remark?: string;
}

export interface FeeRecordUpdateParams {
  id: number;
  buildingId?: number;
  roomId?: number;
  roomNumber?: string;
  ownerName?: string;
  feeType: string;
  startMonth: string;
  endMonth: string;
  amount: number;
  plateNumber?: string;
  paymentMethod?: string;
  payTime?: string;
  operator?: string;
  remark?: string;
  status?: number;
}
