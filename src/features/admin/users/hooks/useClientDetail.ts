import { useMemo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useGetUser } from "@src/shared/hooks/useGetUser";
import { useGetOrderOfUserById } from "@src/shared/hooks/useOrders";
import { useBlockandUnblockUser } from "./useUserManagement";
import { useHaptics } from "./useHaptics";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";

export const useClientDetail = (id: string) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();

  const { data: user, isLoading: userLoading, isError: userError, refetch: refetchUser } = useGetUser(id);
  const { data: orders, isLoading: ordersLoading, isError: ordersError, refetch: refetchOrders } = useGetOrderOfUserById(id);

  const { mutate: blockMutate } = useBlockandUnblockUser();

  const isLoading = userLoading || ordersLoading;
  const isError = userError || ordersError;

  const refetch = useCallback(() => {
    refetchUser();
    refetchOrders();
  }, [refetchUser, refetchOrders]);

  const stats = useMemo(() => {
    if (!orders?.length) return { total: 0, active: 0, inTransit: 0, delivered: 0, totalCBM: 0, totalPrice: 0 };
    let active = 0, inTransit = 0, delivered = 0, totalCBM = 0, totalPrice = 0;
    orders.forEach((o: productType) => {
      if (o.status === "Active") active++;
      else if (o.status === "In Transit") inTransit++;
      else if (o.status === "Inactive" || o.status === "Delivered") delivered++;
      totalCBM += parseFloat(o.packageCBM || "0") || 0;
      totalPrice += parseFloat(o.priceTotal?.toString() || "0") || 0;
    });
    return { total: orders.length, active, inTransit, delivered, totalCBM, totalPrice };
  }, [orders]);

  const donutData = useMemo(() => {
    const items = [
      { value: stats.active, label: "Chargé", color: "#f72585" },
      { value: stats.inTransit, label: "Transit", color: "#4895ef" },
      { value: stats.delivered, label: "Livré", color: "#10B981" },
    ].filter((i) => i.value > 0);
    return items;
  }, [stats]);

  const sortedOrders = useMemo(() => {
    if (!orders?.length) return [];
    return [...orders].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }, [orders]);

  const handleBlock = useCallback(() => {
    const isBlocked = user?.blocked?.isBlocked ?? false;
    trigger("medium");
    Alert.alert(
      isBlocked ? "Débloquer le client ?" : "Bloquer le client ?",
      `Êtes-vous sûr de vouloir ${isBlocked ? "débloquer" : "bloquer"} ${user?.firstName} ${user?.lastName} ?`,
      [
        { text: "Annuler", style: "cancel" },
        { text: isBlocked ? "Débloquer" : "Bloquer", style: isBlocked ? "default" : "destructive", onPress: () => blockMutate(id) },
      ]
    );
  }, [user, id, blockMutate, trigger]);

  const handleEdit = useCallback(() => {
    trigger("light");
    // navigation.navigate("EditClient", { id });
  }, [trigger]);

  return {
    user,
    orders: sortedOrders,
    isLoading,
    isError,
    refetch,
    stats,
    donutData,
    handleBlock,
    handleEdit,
  };
};
