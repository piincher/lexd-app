import { useState, useCallback, useMemo } from "react";
import type { RootStackScreenProps } from "@src/navigations/type";
import { userData } from "@src/shared/types/user";
import { useGetUsers } from "./useUserManagement";
import { LEGACY_MANUAL_ORDERS_ENABLED } from "@src/features/admin/orders/legacyOrders";

type UseSelectUserReturn = {
  selectedUser: userData | undefined;
  search: string;
  filteredUsers: userData[];
  handlers: {
    handleSearch: (text: string) => void;
    handleSelectUser: (user: userData | undefined) => void;
    handleCreate: () => void;
  };
};

export const useSelectUser = (
  navigation: RootStackScreenProps<"SelectUser">["navigation"]
): UseSelectUserReturn => {
  const [selectedUser, setSelectedUser] = useState<userData>();
  const [search, setSearch] = useState<string>("");

  const { data } = useGetUsers();

  const users = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data]);

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase();
    return users.filter((item: userData) => {
      return (
        item.firstName.toLowerCase().includes(query) ||
        item.lastName.toLowerCase().includes(query) ||
        (item.phoneNumber ?? "").toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const handleSelectUser = useCallback((user: userData | undefined) => {
    setSelectedUser(user);
  }, []);

  const handleCreate = useCallback(() => {
    // Manual order creation is retired — orders now come from goods.
    if (!LEGACY_MANUAL_ORDERS_ENABLED) return;
    navigation.navigate("AddOrder", {
      clientName: `${selectedUser?.firstName} ${selectedUser?.lastName!}`,
      userId: selectedUser?._id!,
      phoneNumber: selectedUser?.phoneNumber?.substring(3)!,
      pushTokens: selectedUser?.pushTokens!,
    });
  }, [navigation, selectedUser]);

  return {
    selectedUser,
    search,
    filteredUsers,
    handlers: {
      handleSearch,
      handleSelectUser,
      handleCreate,
    },
  };
};
