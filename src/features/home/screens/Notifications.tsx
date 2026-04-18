import { Header } from "@src/components/Header/Header";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import React, { useEffect, useMemo } from "react";
import {
   View,
   StyleSheet,
   TouchableOpacity,
   RefreshControl,
} from "react-native";
import { ShimmerBlock } from "@src/shared/ui";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
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
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flex: 1,
               backgroundColor: colors.background.default,
            },
            listContent: {
               paddingVertical: 16,
            },
            notificationContainer: {
               flexDirection: "row",
               alignItems: "flex-start",
               paddingVertical: 16,
               paddingHorizontal: 20,
               backgroundColor: colors.background.card,
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
               color: colors.text.primary,
               marginBottom: 4,
            },
            description: {
               fontFamily: Fonts.regular,
               fontSize: 14.5,
               color: colors.text.secondary,
               lineHeight: 20,
            },
            divider: {
               height: 1,
               marginHorizontal: 20,
               backgroundColor: colors.border,
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
               color: colors.text.secondary,
               marginTop: 16,
            },
            errorTitle: {
               fontFamily: Fonts.semiBold,
               fontSize: 20,
               color: colors.status.error,
               marginTop: 20,
               textAlign: "center",
            },
            errorText: {
               fontFamily: Fonts.regular,
               fontSize: 15,
               color: colors.text.secondary,
               marginTop: 8,
               textAlign: "center",
               marginBottom: 24,
               paddingHorizontal: 20,
            },
            retryButton: {
               backgroundColor: colors.primary.main,
               paddingHorizontal: 24,
               paddingVertical: 12,
               borderRadius: 8,
            },
            retryText: {
               fontFamily: Fonts.medium,
               fontSize: 16,
               color: colors.text.inverse,
            },
            emptyTitle: {
               fontFamily: Fonts.bold,
               fontSize: 22,
               color: colors.text.primary,
               marginTop: 24,
               textAlign: "center",
            },
            emptySubtitle: {
               fontFamily: Fonts.regular,
               fontSize: 15,
               color: colors.text.secondary,
               marginTop: 12,
               textAlign: "center",
               paddingHorizontal: 40,
            },
         }),
      [colors]
   );

   // ✅ Handle success feedback
   useEffect(() => {
      if (isSuccess) {
         setVisible(true);
      }
   }, [isSuccess, setVisible]);

   // ✅ Optimized handler
   const handleMarkAsRead = (id: string) => {
      if (isPending) return;
      try {
         markAsRead(id);
      } catch (error) {
         Sentry.captureException(error);
         console.error("Failed to mark notification as read", error);
      }
   };

   // ✅ Render individual notification item
   const renderItem = ({ item, index }: { item: NotificationItem; index: number }) => (
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
                  color={item.read ? colors.primary.main : colors.text.disabled}
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
   );

   // ✅ Render empty/loading/error states
   const ListEmptyComponent = (() => {
      if (isLoading) {
         return (
            <View style={styles.emptyStateContainer}>
               <View style={{ width: '100%' }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                     <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 16, paddingHorizontal: 20 }}>
                        <ShimmerBlock width={30} height={30} borderRadius={15} />
                        <View style={{ flex: 1, marginLeft: 16, gap: 6 }}>
                           <ShimmerBlock width={'60%'} height={17} borderRadius={4} />
                           <ShimmerBlock width={'90%'} height={14} borderRadius={3} />
                        </View>
                     </View>
                  ))}
               </View>
            </View>
         );
      }

      if (isError) {
         return (
            <View style={styles.emptyStateContainer}>
               <AntDesign name="warning" size={48} color={colors.status.error} />
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
               <AntDesign name="bells" size={64} color={colors.text.disabled} />
               <Text style={styles.emptyTitle}>Aucune notification</Text>
               <Text style={styles.emptySubtitle}>
                  Vous serez informé ici dès qu'une nouvelle notification arrivera.
               </Text>
            </View>
         );
      }

      return null;
   })();

   return (
      <SafeAreaView style={styles.container}>
         <Header title="Notifications" navigation={navigation} />

         <FlashList
            data={data || []}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={ListEmptyComponent}

            showsVerticalScrollIndicator={false}
            refreshControl={
               <RefreshControl
                  refreshing={isLoading}
                  onRefresh={refetch}
                  colors={[colors.primary.main]}
                  tintColor={colors.primary.main}
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

export default Notifications;
