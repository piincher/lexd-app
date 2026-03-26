import {
   batchUpdate,
   deleteImage,
   deleteOrder,
   editOrder,
   getActiveOrdersAdmin,
   getAllOrders,
   getOrderBasedOnDate,
   getOrdersBetweenDate,
   placeOrder,
   updateOrder,
   updateOrderToDelivered,
   recordPayment,
   syncOrderStatuses,
} from "@src/api/order";
import { LIMIT } from "@src/constants/Dimensions";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { queryKey, ORDERKEY } from "@src/constants/queryKey";

const ORDER_KEY = "order";

export const usePlaceOrder = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: placeOrder,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};

export const useEditOrder = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: editOrder,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};

export const useGetActiveOrdersAdmin = (
   Status: string,
   departureDate: Date,
   shippingMethod: "air" | "sea"
) => {
   return useInfiniteQuery({
      queryKey: [queryKey.ORDERKEY],
      queryFn: ({ pageParam = 1 }) =>
         getActiveOrdersAdmin(pageParam, Status, departureDate, shippingMethod),
      getNextPageParam: (lastPage, allPages) => {
         const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
         return nextPage;
      },
      initialPageParam: 1,
   });
};

export const useMutateBetweenDate = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: getOrdersBetweenDate,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};

export const useDeleteImage = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: deleteImage,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};

export const useUpdateOrder = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: updateOrder,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};

export const useDeleteOrder = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: deleteOrder,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};

export const useUpdateOrderStatus = () => {
   const queryClient = useQueryClient();
   const navigation = useNavigation();

   return useMutation({
      mutationFn: batchUpdate,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
         navigation.navigate("HomeTab", { screen: "Home" });
      },
   });
};

export const useUpdateStatusDelivery = (id: string) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: updateOrderToDelivered,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ORDERKEY, id] });
      },
   });
};

export const useGetOrderBaseonDate = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: getOrderBasedOnDate,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};

// Hook to get ALL orders without date/method restrictions
export const useGetAllOrders = (status?: string) => {
   return useInfiniteQuery({
      queryKey: [queryKey.ORDERKEY, 'all', status],
      queryFn: async ({ pageParam = 1 }) => {
         const result = await getAllOrders(pageParam, status);
         return result;
      },
      getNextPageParam: (lastPage, allPages) => {
         // Stop fetching if the last page returned fewer items than LIMIT
         if (!lastPage || lastPage.length < LIMIT) return undefined;
         return allPages.length + 1;
      },
      initialPageParam: 1,
   });
};

/**
 * Hook to record a payment for an order
 */
export const useRecordPayment = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: recordPayment,
      onSuccess: (data) => {
         console.log('[useRecordPayment] Success:', data);
         // Invalidate order queries to refresh the data
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
         queryClient.invalidateQueries({ queryKey: ['order', data.order._id] });
      },
      onError: (error) => {
         console.error('[useRecordPayment] Error:', error);
      },
   });
};

export const useSyncOrderStatuses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: syncOrderStatuses,
    onSuccess: () => {
      // Invalidate orders queries to refresh the list
      queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
    },
  });
};
