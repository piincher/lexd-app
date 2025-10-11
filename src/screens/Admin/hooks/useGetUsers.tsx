import { blockUnblockUser, fetchAllUsers } from "@src/api/auth";
import { USER_KEY } from "@src/constants/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsers = () => {
   return useQuery({
      queryKey: [USER_KEY],
      queryFn: fetchAllUsers,
   });
};
export const useBlockandUnblockUser = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: blockUnblockUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      },
   });
};
