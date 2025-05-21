import { userData, userType } from '../constants/types';
import axiosInstance from './client';
const rootUrl = '/topup';
const API_URL = {
    initiateTopUp: `${rootUrl}/`,
    adminGetTopUp: `${rootUrl}/status`,
    updateTopup: `${rootUrl}/`,
};

export type topUpType = {
  user?: string; // Assuming req.user.id is a string
  amount: number;
  method?: "orange_money" | string; // Allows "orange_money" or other string values
  transactionReference?: string;
  status?: "pending" |"approved" | "rejected";
  proofImage: string;
    _id?: string;
};

export const processTopUp = async (data:topUpType) => {
    const response = await axiosInstance.post<topUpType>(API_URL.initiateTopUp, data);
    return response.data;
};
export const adminGetTopUp = async () => {
    const response = await axiosInstance.get<topUpType[]>(`${API_URL.adminGetTopUp}`);
    return response.data;
};

export const adminUpdateTopUp = async (data:topUpType) => {
    const response = await axiosInstance.put<topUpType[]>(`${API_URL.updateTopup}/${data._id}/status`, data);
    return response.data;
};

