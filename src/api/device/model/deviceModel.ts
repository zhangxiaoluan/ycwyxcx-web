export interface Device {
  id: number;
  locationName: string;
  longitude?: string;
  latitude?: string;
  name: string;
  deviceType?: string;
  ipAddress?: string;
  serialNumber?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface DevicePageParams {
  current: number;
  size: number;
  locationName__like?: string;
  name__like?: string;
  deviceType?: string;
  status?: number;
}

export interface DevicePageResult {
  records: Device[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface DeviceAddParams {
  locationName: string;
  longitude?: string;
  latitude?: string;
  name: string;
  deviceType?: string;
  ipAddress?: string;
  serialNumber?: string;
  status?: number;
}

export interface DeviceUpdateParams {
  id: number;
  locationName: string;
  longitude?: string;
  latitude?: string;
  name: string;
  deviceType?: string;
  ipAddress?: string;
  serialNumber?: string;
  status?: number;
}
