import { apiV2 } from "@src/api/client";

const api = apiV2;

export interface Goods {
   _id: string;
   goodsId: string;
   clientId: string;
   clientName: string;
   clientPhone: string;
   description: string;
   length?: number;
   width?: number;
   height?: number;
   cbm: number;
   weight: number;
   quantity: number;
   unitPrice: number;
   totalCost: number;
   location: string;
   photos: string[];
   qrCodeData: string;
   status: "in-warehouse" | "assigned" | "shipped" | "delivered";
   containerId?: string;
   receivedBy: string;
   receivedAt: string;
   createdAt: string;
   updatedAt: string;
}

export interface ReceiveGoodsInput {
   clientId: string;
   description: string;
   length?: number;
   width?: number;
   height?: number;
   cbm: number;
   weight: number;
   quantity: number;
   unitPrice: number;
   location: string;
   photos?: string[];
}

export interface UpdateGoodsLocationInput {
   id: string;
   location: string;
}

export interface GoodsFilters {
   status?: "all" | "unassigned" | "assigned" | "shipped";
   location?: string;
   search?: string;
}

const API_URL = "/goods";

export const goodsApi = {
   receiveGoods: async (data: ReceiveGoodsInput): Promise<Goods> => {
      const response = await api.post<Goods>(API_URL, data);
      return response.data;
   },

   getGoods: async (filters?: GoodsFilters): Promise<Goods[]> => {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== "all") {
         params.append("status", filters.status);
      }
      if (filters?.location) {
         params.append("location", filters.location);
      }
      if (filters?.search) {
         params.append("search", filters.search);
      }
      const queryString = params.toString();
      const url = queryString ? `${API_URL}?${queryString}` : API_URL;
      const response = await api.get<Goods[]>(url);
      return response.data;
   },

   getGoodsById: async (id: string): Promise<Goods> => {
      const response = await api.get<Goods>(`${API_URL}/${id}`);
      return response.data;
   },

   updateLocation: async (data: UpdateGoodsLocationInput): Promise<Goods> => {
      const { id, location } = data;
      const response = await api.patch<Goods>(`${API_URL}/${id}/location`, { location });
      return response.data;
   },

   deleteGoods: async (id: string): Promise<{ message: string }> => {
      const response = await api.delete<{ message: string }>(`${API_URL}/${id}`);
      return response.data;
   },

   uploadPhoto: async (goodsId: string, photoUri: string): Promise<{ url: string }> => {
      const formData = new FormData();
      formData.append("photo", {
         uri: photoUri,
         type: "image/jpeg",
         name: `goods_${goodsId}.jpg`,
      } as any);

      const response = await api.post<{ url: string }>(`${API_URL}/${goodsId}/photo`, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      return response.data;
   },
};
