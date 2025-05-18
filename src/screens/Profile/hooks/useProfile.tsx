import { getBalance, getCurrentUser } from "@src/api/auth";
import { useQuery } from "@tanstack/react-query";

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
