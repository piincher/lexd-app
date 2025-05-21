import { adminGetTopUp, adminUpdateTopUp } from "@src/api/topUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TOPKEY = "TOPUP";
export const useAdminGetTopUp = () => {
   return useQuery({
      queryKey: [TOPKEY],
      queryFn: adminGetTopUp,
   });
};

export const useUpdateTopupStatus = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: adminUpdateTopUp,
      onSuccess: () => {
         // Invalidate the query to refetch the data
         queryClient.invalidateQueries({ queryKey: [TOPKEY] });
      },
   });
};
