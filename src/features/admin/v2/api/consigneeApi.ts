import { apiV2 } from "@src/api/client";

const api = apiV2;

export interface Consignee {
   _id: string;
   name: string;
   phone: string;
   email?: string;
   warehouseAddress: string;
   isActive: boolean;
   assignedContainersCount: number;
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
   id: string;
   name?: string;
   phone?: string;
   email?: string;
   warehouseAddress?: string;
   isActive?: boolean;
}

const API_URL = "/consignees";

export const consigneeApi = {
   getConsignees: async (): Promise<Consignee[]> => {
      const response = await api.get<Consignee[]>(`${API_URL}`);
      return response.data;
   },

   getConsigneeById: async (id: string): Promise<Consignee> => {
      const response = await api.get<Consignee>(`${API_URL}/${id}`);
      return response.data;
   },

   createConsignee: async (data: CreateConsigneeInput): Promise<Consignee> => {
      const response = await api.post<Consignee>(`${API_URL}/create`, data);
      return response.data;
   },

   updateConsignee: async (data: UpdateConsigneeInput): Promise<Consignee> => {
      const { id, ...updateData } = data;
      const response = await api.put<Consignee>(`${API_URL}/${id}/update`, updateData);
      return response.data;
   },

   deleteConsignee: async (id: string): Promise<{ message: string }> => {
      const response = await api.delete<{ message: string }>(`${API_URL}/${id}/delete`);
      return response.data;
   },

   toggleConsigneeStatus: async (id: string): Promise<Consignee> => {
      const response = await api.patch<Consignee>(`${API_URL}/${id}/toggle-status`);
      return response.data;
   },
};
