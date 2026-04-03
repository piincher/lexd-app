import { blockUnblockUser, createUser, fetchAllUsers, register } from "@src/api/auth";
import { USER_KEY } from "@src/constants/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USERS_KEY = "admin_users";

export const useGetUsers = () => {
   return useQuery({
      queryKey: [USERS_KEY],
      queryFn: fetchAllUsers,
   });
};

export const useCreateUser = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: createUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      },
   });
};

export const useBlockandUnblockUser = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: blockUnblockUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      },
   });
};

// Migrated from useAddUser.tsx - uses register API (for user self-registration)
export const useRegisterUser = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: register,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      },
   });
};
