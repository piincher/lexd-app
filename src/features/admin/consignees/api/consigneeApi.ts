import { apiV2 } from "@src/api/client";
import { AxiosResponse } from "axios";

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

export interface GetConsigneesParams {
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ConsigneeListResponse {
  consignees: Consignee[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export const consigneeApi = {
  getAll: (params?: GetConsigneesParams) =>
    axios.get<ApiResponse<Consignee[] | ConsigneeListResponse>>(BASE_URL, { params }),

  getById: (id: string): Promise<AxiosResponse<ApiResponse<{ consignee: Consignee }>>> =>
    axios.get(`${BASE_URL}/${id}`),

  create: (data: CreateConsigneeInput): Promise<AxiosResponse<ApiResponse<{ consignee: Consignee }>>> =>
    axios.post(BASE_URL, data),

  update: (id: string, data: UpdateConsigneeInput): Promise<AxiosResponse<ApiResponse<{ consignee: Consignee }>>> =>
    axios.patch(`${BASE_URL}/${id}`, data),

  delete: (id: string): Promise<AxiosResponse<ApiResponse<void>>> =>
    axios.delete(`${BASE_URL}/${id}`),

  toggleStatus: (id: string, isActive: boolean): Promise<AxiosResponse<ApiResponse<{ consignee: Consignee }>>> =>
    axios.patch(`${BASE_URL}/${id}`, { isActive }),
};

export type { Consignee as ConsigneeType };
