/**
 * User Management Hooks
 * SRP-compliant: each hook does ONE thing
 */
import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";

import * as userApi from "../api/userApi";

const USERS_KEY = "admin_users";

// Fetch users with infinite scroll pagination
export const useGetUsers = (filters: Omit<userApi.UserListFilters, "page"> = {}) => {
  return useInfiniteQuery({
    queryKey: [USERS_KEY, filters],
    queryFn: ({ pageParam = 1 }) => userApi.fetchAllUsers({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

// Create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      showMessage({ message: "Utilisateur créé", type: "success" });
    },
    onError: (error: any) => {
      showMessage({ message: "Erreur", description: error.message, type: "danger" });
    },
  });
};

// Block / unblock user
export const useBlockandUnblockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.blockUnblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
  });
};

// Delete user (soft delete)
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      showMessage({ message: data.message || "Utilisateur supprimé", type: "success" });
    },
    onError: (error: any) => {
      showMessage({ message: "Erreur de suppression", description: error.message, type: "danger" });
    },
  });
};
