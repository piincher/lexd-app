import { adminGetTopUp, adminUpdateTopUp, processPayement, topUpHistory } from "@src/api/topUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TOPKEY = "TOPUP";
const BALANCEKEY = "BALANCE";
export const useAdminGetTopUp = () => {
   return useQuery({
      queryKey: [TOPKEY],
      queryFn: adminGetTopUp,
   });
};

export const useTopUpHistory = () => {
   return useQuery({
      queryKey: [TOPKEY],
      queryFn: topUpHistory,
   });
};

export const useUpdateTopupStatus = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: adminUpdateTopUp,
      onSuccess: () => {
         // Invalidate the query to refetch the data
         queryClient.invalidateQueries({ queryKey: [TOPKEY] });
         queryClient.invalidateQueries({ queryKey: [BALANCEKEY] });
      },
   });
};

export const useProcessPayment = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: processPayement,
      onSuccess: () => {
         // Invalidate the query to refetch the data
         queryClient.invalidateQueries({ queryKey: [TOPKEY, BALANCEKEY] });
      },
   });
};
