import {
   batchUpdate,
   deleteImage,
   deleteOrder,
   editOrder,
   getActiveOrdersAdmin,
   getOrderBasedOnDate,
   getOrdersBetweenDate,
   placeOrder,
   updateOrder,
   updateOrderToDelivered,
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
