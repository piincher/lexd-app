import axiosInstance from "@src/api/client";
import { SmsService } from "@src/constants/types";

const orderUrl = "/order";
const userUrl = "/user";

export const fetchAllUsersForSms = async (): Promise<any[]> => {
  const response = await axiosInstance.get(`${userUrl}/allUsers`);
  return response.data.data;
};

export const getOrdersByDepartureDate = async (data: { departureDate: Date }): Promise<any[]> => {
  const response = await axiosInstance.post(`${orderUrl}/getOrderDepartureDate`, data);
  return response.data;
};

export const fetchSmsBalance = async (): Promise<SmsService[]> => {
  const response = await axiosInstance.get(`${orderUrl}/viewSmsBalance`);
  return response.data;
};
