// Shared User Hooks
// Used across multiple features (stats, order-detail, etc.)

import { getBalance, getCurrentUser } from "@src/api/auth";
import { processTopUp } from "@src/api/topUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USERKEY = "CURRENT_USER";
const BALANCEKEY = "BALANCE";

export const useGetCurrentUser = () => {
   return useQuery({
      queryKey: [USERKEY],
      queryFn: getCurrentUser,
   });
};

export const useBalance = () => {
   return useQuery({
      queryKey: [BALANCEKEY],
      queryFn: getBalance,
   });
};

export const useInitiateTopUp = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: processTopUp,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [BALANCEKEY] });
      },
   });
};
