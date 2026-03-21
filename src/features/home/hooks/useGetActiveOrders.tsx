import { fetchSmsBalance, getActiveOrders, getOrdersBasedOnUserId } from "@src/api/order";
import { LIMIT } from "@src/constants/Dimensions";
import { SMSKEY } from "@src/constants/queryKey";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const ORDERKEY = "order";
export const useGetActiveOrder = (Status: string, shippingMethod: "air" | "sea") => {
   return useInfiniteQuery({
      queryKey: [Status, ORDERKEY],
      queryFn: ({ pageParam = 1 }) => getActiveOrders(pageParam, Status, shippingMethod),
      getNextPageParam: (lastPage, allPages) => {
         const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
         return nextPage;
      },
      initialPageParam: 1,
   });
};

export const useGetOrderOfUserById = (id: string) => {
   return useQuery({
      queryKey: [ORDERKEY, id],
      queryFn: () => getOrdersBasedOnUserId(id),
      enabled: !!id,
      refetchOnWindowFocus: true,
      staleTime: 30_000,
   });
};

export const useViewSmsBalance = (isAdmin: boolean) => {
   return useQuery({
      queryKey: [SMSKEY],
      queryFn: fetchSmsBalance,
      enabled: isAdmin,
   });
};
