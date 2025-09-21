import { Header } from "@src/components/Header/Header";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import React, { useCallback, useEffect, useMemo } from "react";
import {
   View,
   StyleSheet,
   TouchableOpacity,
   ActivityIndicator,
   RefreshControl,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@src/constants/Colors";
import { useGetNotification, useUpdateNotification } from "../hooks/useGetNotification";
import { useConfirmationNotification } from "@src/hooks/useConfirmation";
import { Notification as SnackbarNotification } from "@src/components/Notification/Notification";
import * as Sentry from "@sentry/react-native";
import { FlashList } from "@shopify/flash-list";

// ✅ Define types
interface NotificationItem {
   _id: string;
   Status: string;
   description: string;
   read: boolean;
   code?: string;
}

const Notifications = ({ navigation }: RootStackScreenProps<"Notifications">) => {
   const { data, isLoading, isError, refetch } = useGetNotification();
   const { setVisible, onDismissSnackBar, visible } = useConfirmationNotification();
   const { mutate: markAsRead, isSuccess, isPending } = useUpdateNotification();
   const { colors } = useTheme();

   // ✅ Handle success feedback
   useEffect(() => {
      if (isSuccess) {
         setVisible(true);
      }
   }, [isSuccess, setVisible]);

   // ✅ Optimized handler
   const handleMarkAsRead = useCallback(
      (id: string) => {
         if (isPending) return;
         try {
            markAsRead(id);
         } catch (error) {
            Sentry.captureException(error);
            console.error("Failed to mark notification as read", error);
         }
      },
      [markAsRead, isPending]
   );

   // ✅ Render individual notification item
   const renderItem = useCallback(
      ({ item, index }: { item: NotificationItem; index: number }) => (
         <>
            <View style={styles.notificationContainer}>
               <TouchableOpacity
                  onPress={() => handleMarkAsRead(item._id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Marquer comme lu: ${item.Status}`}
                  accessibilityState={{ disabled: isPending }}
                  disabled={isPending}
                  style={styles.checkboxContainer}
               >
                  <AntDesign
                     name={item.read ? "check-circle" : "check"}
                     size={30}
                     color={item.read ? COLORS.blue : COLORS.grey}
                  />
               </TouchableOpacity>

               <View style={styles.contentContainer}>
                  <Text style={styles.title} accessibilityRole="header">
                     {item.Status}
                  </Text>
                  <Text style={styles.description} numberOfLines={3}>
                     {item.description}
                  </Text>
               </View>
            </View>
            {index < (data?.length ?? 0) - 1 && <View style={styles.divider} />}
         </>
      ),
      [handleMarkAsRead, isPending, data]
   );

   // ✅ Render empty/loading/error states
   const ListEmptyComponent = useMemo(() => {
      if (isLoading) {
         return (
            <View style={styles.emptyStateContainer}>
               <ActivityIndicator size="large" color={COLORS.primary} />
               <Text style={styles.loadingText}>Chargement des notifications...</Text>
            </View>
         );
      }

      if (isError) {
         return (
            <View style={styles.emptyStateContainer}>
               <AntDesign name="warning" size={48} color={COLORS.danger} />
               <Text style={styles.errorTitle}>Erreur de chargement</Text>
               <Text style={styles.errorText}>
                  Impossible de récupérer vos notifications. Veuillez réessayer.
               </Text>
               <TouchableOpacity onPress={refetch} style={styles.retryButton}>
                  <Text style={styles.retryText}>Réessayer</Text>
               </TouchableOpacity>
            </View>
         );
      }

      if (!data || data.length === 0) {
         return (
            <View style={styles.emptyStateContainer}>
               <AntDesign name="bells" size={64} color={COLORS.grey} />
               <Text style={styles.emptyTitle}>Aucune notification</Text>
               <Text style={styles.emptySubtitle}>
                  Vous serez informé ici dès qu'une nouvelle notification arrivera.
               </Text>
            </View>
         );
      }

      return null;
   }, [isLoading, isError, data, refetch]);

   // ✅ Estimated item size for FlashList optimization
   const estimatedItemSize = 100;

   return (
      <SafeAreaView style={styles.container}>
         <Header title="Notifications" navigation={navigation} />

         <FlashList
            data={data || []}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={ListEmptyComponent}
            estimatedItemSize={estimatedItemSize}
            showsVerticalScrollIndicator={false}
            refreshControl={
               <RefreshControl
                  refreshing={isLoading}
                  onRefresh={refetch}
                  colors={[COLORS.primary]}
                  tintColor={COLORS.primary}
               />
            }
            contentContainerStyle={styles.listContent}
         />

         {/* Global success snackbar */}
         <SnackbarNotification
            visible={visible}
            onDismissSnackBar={onDismissSnackBar}
            message="Notification marquée comme lue"
            type="success"
         />
      </SafeAreaView>
   );
};

export default React.memo(Notifications);

// ✅ Enhanced Styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.background,
   },
   listContent: {
      paddingVertical: 16,
   },
   notificationContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
   },
   checkboxContainer: {
      padding: 8,
      borderRadius: 8,
   },
   contentContainer: {
      flex: 1,
      marginLeft: 16,
   },
   title: {
      fontFamily: Fonts.semiBold,
      fontSize: 17,
      color: COLORS.textPrimary,
      marginBottom: 4,
   },
   description: {
      fontFamily: Fonts.regular,
      fontSize: 14.5,
      color: COLORS.textSecondary,
      lineHeight: 20,
   },
   divider: {
      height: 1,
      marginHorizontal: 20,
      backgroundColor: COLORS.border,
   },
   emptyStateContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
      minHeight: 300,
   },
   loadingText: {
      fontFamily: Fonts.medium,
      fontSize: 16,
      color: COLORS.textSecondary,
      marginTop: 16,
   },
   errorTitle: {
      fontFamily: Fonts.semiBold,
      fontSize: 20,
      color: COLORS.danger,
      marginTop: 20,
      textAlign: "center",
   },
   errorText: {
      fontFamily: Fonts.regular,
      fontSize: 15,
      color: COLORS.textSecondary,
      marginTop: 8,
      textAlign: "center",
      marginBottom: 24,
      paddingHorizontal: 20,
   },
   retryButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
   },
   retryText: {
      fontFamily: Fonts.medium,
      fontSize: 16,
      color: COLORS.white,
   },
   emptyTitle: {
      fontFamily: Fonts.bold,
      fontSize: 22,
      color: COLORS.textPrimary,
      marginTop: 24,
      textAlign: "center",
   },
   emptySubtitle: {
      fontFamily: Fonts.regular,
      fontSize: 15,
      color: COLORS.textSecondary,
      marginTop: 12,
      textAlign: "center",
      paddingHorizontal: 40,
   },
});
