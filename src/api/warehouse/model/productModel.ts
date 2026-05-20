export interface ProductPageParams {
  current: number;
  size: number;
  communityId: number | string;
  name?: string;
  category?: string;
}

export interface ProductRecord {
  id: number;
  communityId: number | string;
  name: string;
  category: string;
  categoryName?: string;
  unit: string;
  stockQuantity: number;
  warningQuantity: number;
  price: number;
  remark?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPageResult {
  records: ProductRecord[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  category: string;
  categoryName?: string;
  unit: string;
  stockQuantity: number;
  status: number;
}

export interface ProductAddParams {
  communityId: number | string;
  name: string;
  category: string;
  unit: string;
  warningQuantity: number;
  price: number;
  remark?: string;
}

export interface ProductUpdateParams {
  id: number;
  name: string;
  category: string;
  unit: string;
  warningQuantity: number;
  price: number;
  remark?: string;
  status: number;
}
