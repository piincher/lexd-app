import { useCallback, useMemo } from "react";
import { StyleSheet, Share } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useClipboard } from "@src/shared/lib/hooks/useClipboard";
import { useCreateShareToken } from "@src/features/public/hooks/useCreateShareToken";
import { useGetOrderDetails } from "./useOrderDetail";

export const useOrderDetailScreen = (id: string) => {
   const { colors } = useAppTheme();
   const { data: order, isPending, isError, error, refetch } = useGetOrderDetails(id);
   const { copyToClipboard } = useClipboard();
   const { mutateAsync: createShareToken } = useCreateShareToken();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flex: 1,
               backgroundColor: colors.background.default,
            },
            scrollContent: {
               paddingBottom: 40,
            },
            appbarTitle: {
               fontSize: 16,
               fontWeight: "700",
            },
         }),
      [colors]
   );

   const handleShare = useCallback(async () => {
      if (!order) return;
      try {
         const result = await createShareToken({
            type: "order",
            resourceReference: order.code || id,
         });
         await Share.share({
            message: `Suivez ma commande ChinaLink Express: ${order.code}\n${result.url}`,
            title: `Commande ${order.code}`,
         });
      } catch {
         try {
            await Share.share({
               message: `Commande ${order.code}\nStatut: ${order.status}\nClient: ${order.clientName}`,
               title: `Commande ${order.code}`,
            });
         } catch {}
      }
   }, [order, id, createShareToken]);

   const handleCopyCode = useCallback(() => {
      if (order?.code) copyToClipboard(order.code);
   }, [order, copyToClipboard]);

   return {
      order,
      isPending,
      isError,
      error,
      refetch,
      handleShare,
      handleCopyCode,
      colors,
      styles,
   };
};
