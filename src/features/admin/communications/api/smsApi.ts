import axiosInstance from "@src/api/client";
import { SmsService } from "@src/constants/types";

const orderUrl = "/order";
const userUrl = "/user";

/**
 * Fetch EVERY user for the SMS recipient list.
 *
 * `/user/allUsers` is paginated (default 50, max 200 per page), so a single
 * call only returned the first 50 clients — that's why "Tous les clients" was
 * missing most people. We fetch page 1 at the max page size, read `meta.totalPages`,
 * then pull the remaining pages in parallel and concatenate.
 */
export const fetchAllUsersForSms = async (): Promise<any[]> => {
  const limit = 200;
  const first = await axiosInstance.get(`${userUrl}/allUsers`, { params: { page: 1, limit } });
  const firstUsers: any[] = first.data?.data ?? [];
  const totalPages: number = first.data?.meta?.totalPages ?? 1;

  if (totalPages <= 1) return firstUsers;

  const remaining = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      axiosInstance.get(`${userUrl}/allUsers`, { params: { page: i + 2, limit } })
    )
  );

  return remaining.reduce<any[]>(
    (acc, res) => acc.concat(res.data?.data ?? []),
    firstUsers
  );
};

export const getOrdersByDepartureDate = async (data: { departureDate: Date }): Promise<any[]> => {
  const response = await axiosInstance.post(`${orderUrl}/getOrderDepartureDate`, data);
  return response.data;
};

export const fetchSmsBalance = async (): Promise<SmsService[]> => {
  const response = await axiosInstance.get(`${orderUrl}/viewSmsBalance`);
  return response.data;
};
