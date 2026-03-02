import { apiV2 } from "@src/api/client";

const axios = apiV2;

const BASE_URL = "/consignees";

export interface Consignee {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  warehouseAddress: string;
  isActive: boolean;
  userId?: string;
  assignedContainersCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsigneeInput {
  name: string;
  phone: string;
  email?: string;
  warehouseAddress: string;
}

export interface UpdateConsigneeInput {
  name?: string;
  phone?: string;
  email?: string;
  warehouseAddress?: string;
  isActive?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export const consigneeApi = {
  getAll: (): Promise<ApiResponse<Consignee[]>> =>
    axios.get(BASE_URL),

  getById: (id: string): Promise<ApiResponse<Consignee>> =>
    axios.get(`${BASE_URL}/${id}`),

  create: (data: CreateConsigneeInput): Promise<ApiResponse<Consignee>> =>
    axios.post(BASE_URL, data),

  update: (id: string, data: UpdateConsigneeInput): Promise<ApiResponse<Consignee>> =>
    axios.patch(`${BASE_URL}/${id}`, data),

  delete: (id: string): Promise<ApiResponse<void>> =>
    axios.delete(`${BASE_URL}/${id}`),

  toggleStatus: (id: string, isActive: boolean): Promise<ApiResponse<Consignee>> =>
    axios.patch(`${BASE_URL}/${id}`, { isActive }),
};

export type { Consignee as ConsigneeType };
