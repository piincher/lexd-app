import { AntDesign, Ionicons } from "@expo/vector-icons";
import { productType } from "@src/api/order";
import AppButton from "@src/components/AppButton/AppButton";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import * as Clipboard from "expo-clipboard";
import React, { FC, useEffect, useState } from "react";
import {
   ActivityIndicator,
   Alert,
   Dimensions,
   FlatList,
   Image,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
   useGetActiveOrdersAdmin,
   useUpdateOrder,
   useUpdateStatusDelivery,
} from "../hooks/useOrderManagement";
import { TextInput } from "react-native-paper";

// Define a comprehensive color palette for a professional design system
const LOGISTICS_COLORS = {
   primary: "#00008B", // Deep blue
   secondary: "#FFD700", // Gold yellow
   accent: "#1E90FF", // Dodger blue
   success: "#2E8B57", // Sea green
   warning: "#FF8C00", // Dark orange
   error: "#DC143C", // Crimson
   light: "#F8F9FA", // Light gray
   dark: "#212529", // Dark gray
   gray: {
      100: "#F8F9FA",
      200: "#E9ECEF",
      300: "#DEE2E6",
      400: "#CED4DA",
      500: "#ADB5BD",
      600: "#6C757D",
      700: "#495057",
      800: "#343A40",
      900: "#212529",
   },
   shadow: {
      sm: {
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.1,
         shadowRadius: 2,
         elevation: 1,
      },
      md: {
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.15,
         shadowRadius: 4,
         elevation: 2,
      },
      lg: {
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.2,
         shadowRadius: 6,
         elevation: 3,
      },
   },
};

const AdminPastOrders: FC = () => {
   const [shippingType, setShippingType] = useState<"air" | "sea">("air");
   const [statusFilter, setStatusFilter] = useState("Inactive");
   const [searchQuery, setSearchQuery] = useState("");

   const { data, fetchNextPage, isError, hasNextPage, isFetchingNextPage, refetch } =
      useGetActiveOrdersAdmin(statusFilter, undefined, shippingType);

   const handleShippingTypeChange = (type: "air" | "sea") => {
      setShippingType(type);
      refetch();
   };

   useEffect(() => {
      refetch();
   }, [shippingType]);
   const renderFooter = () => {
      if (isFetchingNextPage) {
         return (
            <View style={styles.loaderContainer}>
               <ActivityIndicator
                  size="large"
                  color={LOGISTICS_COLORS.primary}
                  style={styles.loader}
               />
            </View>
         );
      } else if (hasNextPage) {
         return (
            <Pressable onPress={loadMore} style={styles.loadMoreContainer}>
               <Text style={styles.loadMoreText}>Charger plus</Text>
            </Pressable>
         );
      } else {
         return null;
      }
   };

   const loadMore = () => {
      if (hasNextPage) {
         fetchNextPage();
      }
   };

   const filteredData = (() => {
      if (!data) return [];
      return data.pages.flatMap((page) =>
         page.filter(
            (item) =>
               item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.code.includes(searchQuery) ||
               item.clientPhone.includes(searchQuery)
         )
      );
   })();

   if (isError) {
      return (
         <View style={[styles.container, styles.errorContainer]}>
            <View style={styles.errorContent}>
               <Ionicons name="alert-circle-outline" size={48} color={LOGISTICS_COLORS.error} />
               <Text style={styles.errorTitle}>Erreur de chargement</Text>
               <Text style={styles.errorDescription}>
                  Impossible de charger les commandes. Veuillez réessayer.
               </Text>
               <AppButton
                  title="Réessayer"
                  onPress={refetch}
                  style={styles.retryButton}
                  textStyle={styles.retryButtonText}
               />
            </View>
         </View>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         {/* Header with search and filters */}
         <View style={styles.headerContainer}>
            <Text style={styles.title}>Commandes passées</Text>

            <View style={styles.searchContainer}>
               <View style={styles.searchInputContainer}>
                  <Ionicons
                     name="search"
                     size={20}
                     color={LOGISTICS_COLORS.gray[500]}
                     style={styles.searchIcon}
                  />
                  <TextInput
                     style={styles.searchInput}
                     placeholder="Rechercher par nom, code ou téléphone"
                     placeholderTextColor={LOGISTICS_COLORS.gray[400]}
                     value={searchQuery}
                     onChangeText={setSearchQuery}
                     autoCapitalize="none"
                  />
               </View>
            </View>
         </View>

         {/* Shipping Type Toggle */}
         <View style={styles.toggleContainer}>
            <TouchableOpacity
               style={[styles.toggleButton, shippingType === "air" && styles.activeToggle]}
               onPress={() => handleShippingTypeChange("air")}
            >
               <Text style={[styles.toggleText, shippingType === "air" && styles.activeToggleText]}>
                  Air
               </Text>
            </TouchableOpacity>

            <View style={styles.toggleSeparator} />

            <TouchableOpacity
               style={[styles.toggleButton, shippingType === "sea" && styles.activeToggle]}
               onPress={() => handleShippingTypeChange("sea")}
            >
               <Text style={[styles.toggleText, shippingType === "sea" && styles.activeToggleText]}>
                  sea
               </Text>
            </TouchableOpacity>
         </View>

         {/* Orders List */}
         <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id!}
            renderItem={({ item }) => <RenderOrder item={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               <View style={styles.emptyContainer}>
                  <Ionicons name="archive-outline" size={64} color={LOGISTICS_COLORS.gray[300]} />
                  <Text style={styles.emptyTitle}>
                     {searchQuery ? "Aucun résultat trouvé" : "Aucune commande"}
                  </Text>
                  <Text style={styles.emptyDescription}>
                     {searchQuery
                        ? "Essayez de modifier votre recherche"
                        : "Aucune commande trouvée pour cette catégorie"}
                  </Text>
               </View>
            }
            ListFooterComponent={renderFooter}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
         />
      </SafeAreaView>
   );
};

const RenderOrder = ({ item }: { item: productType }) => {
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [snackbarVisible, setSnackbarVisible] = useState(false);
   const [isExpanded, setIsExpanded] = useState(false);
   const [status, setStatus] = useState(item.status);

   const copyToClipboard = async (text: string) => {
      await Clipboard.setStringAsync(text);
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 3000);
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Pending":
            return LOGISTICS_COLORS.warning;
         case "In Transit":
            return LOGISTICS_COLORS.accent;
         case "Completed":
            return LOGISTICS_COLORS.success;
         case "Cancelled":
            return LOGISTICS_COLORS.error;
         default:
            return LOGISTICS_COLORS.gray[600];
      }
   };

   const getStatusText = (status: string) => {
      switch (status) {
         case "Pending":
            return "En attente";
         case "In Transit":
            return "En transit";
         case "Inactive":
            return "Livré";
      }
   };

   return (
      <View style={styles.card}>
         {snackbarVisible && (
            <View style={styles.snackbar}>
               <Ionicons name="checkmark-circle" size={20} color={LOGISTICS_COLORS.success} />
               <Text style={styles.snackbarText}>Code copié dans le presse-papiers</Text>
            </View>
         )}

         <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: `${100 * (item?.images?.length ?? 0)}%` }}
            onMomentumScrollEnd={(event) => {
               const offset = event.nativeEvent.contentOffset.x;
               setCurrentImageIndex(Math.floor(offset / windowWidth));
            }}
         >
            {item?.images?.map((image, index) => (
               <View style={styles.imageContainer} key={index}>
                  <Image
                     source={{
                        uri:
                           image?.url || "https://placehold.co/600x400/DEE2E6/6C757D?text=No+Image",
                     }}
                     style={styles.image}
                     resizeMode="contain"
                  />
               </View>
            ))}
         </ScrollView>

         <View style={styles.cardContent}>
            {/* Header with status badge */}
            <View style={styles.header}>
               <View style={styles.headerLeft}>
                  <Text style={styles.clientName}>{item.clientName}</Text>
                  <View style={styles.statusBadge}>
                     <View
                        style={[styles.statusDot, { backgroundColor: getStatusColor(status) }]}
                     />
                     <Text style={styles.statusText}>{getStatusText(status)}</Text>
                  </View>
               </View>

               <Text style={styles.trackingCode}>#{item.code}</Text>
            </View>

            {/* Order details */}
            <View style={styles.detailsContainer}>
               <View style={styles.detailItem}>
                  <Ionicons name="call" size={20} color={LOGISTICS_COLORS.gray[500]} />
                  <Text style={styles.detailText}>{item.clientPhone}</Text>
               </View>

               <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={20} color={LOGISTICS_COLORS.gray[500]} />
                  <Text style={styles.detailText}>
                     {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
               </View>

               <View style={styles.detailItem}>
                  <Ionicons name="people" size={20} color={LOGISTICS_COLORS.gray[500]} />
                  <Text style={styles.detailText}>{item.quantity} colis</Text>
               </View>

               <View style={styles.detailItem}>
                  <Ionicons name="speedometer" size={20} color={LOGISTICS_COLORS.gray[500]} />
                  <Text style={styles.detailText}> {item.packageCBM} CBM</Text>
               </View>

               <View style={styles.detailItem}>
                  <Ionicons name="logo-whatsapp" size={20} color={LOGISTICS_COLORS.success} />
                  <Text style={styles.detailText}>WhatsApp:+223 {item.clientPhone}</Text>
               </View>
            </View>

            {/* Expandable section for more details */}
            {isExpanded && (
               <View style={styles.expandedContent}>
                  <View style={styles.detailItem}>
                     <Ionicons name="location" size={20} color={LOGISTICS_COLORS.gray[500]} />
                     <Text style={styles.detailText}>China,Foshan</Text>
                  </View>

                  <View style={styles.detailItem}>
                     <Ionicons name="location" size={20} color={LOGISTICS_COLORS.gray[500]} />
                     <Text style={styles.detailText}>Bamako,Mali</Text>
                  </View>

                  <View style={styles.detailItem}>
                     <Ionicons name="time" size={20} color={LOGISTICS_COLORS.gray[500]} />
                     <Text style={styles.detailText}>
                        Est. livraison: {item.estimatedDelivery || "N/A"}
                     </Text>
                  </View>

                  <View style={styles.detailItem}>
                     <Ionicons name="card" size={20} color={LOGISTICS_COLORS.gray[500]} />
                     <Text style={styles.detailText}>Partenaire: {item.partenaire}</Text>
                  </View>

                  <View style={styles.detailItem}>
                     <Ionicons name="pricetag" size={20} color={LOGISTICS_COLORS.gray[500]} />
                     <Text style={[styles.detailText, styles.priceText]}>
                        {item.priceTotal ? `${item.priceTotal} FCFA` : "N/A"}
                     </Text>
                  </View>
               </View>
            )}

            {/* Action buttons */}
            <View style={styles.actionsContainer}>
               <TouchableOpacity
                  onPress={() => copyToClipboard(item.code!)}
                  style={styles.copyButton}
               >
                  <Ionicons name="copy-outline" size={20} color={COLORS.white} />
                  <Text style={styles.copyButtonText}>Copier le code</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => setIsExpanded(!isExpanded)}
                  style={styles.expandButton}
               >
                  <Text style={styles.expandButtonText}>
                     {isExpanded ? "Réduire" : "Voir plus"}
                  </Text>
                  <Ionicons
                     name={isExpanded ? "chevron-up" : "chevron-down"}
                     size={20}
                     color={LOGISTICS_COLORS.primary}
                  />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: LOGISTICS_COLORS.light,
   },
   headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 15,
   },
   title: {
      fontFamily: Fonts.bold,
      color: LOGISTICS_COLORS.dark,
      marginBottom: 10,
   },
   searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   searchInputContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: LOGISTICS_COLORS.gray[100],
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 10,
   },
   searchIcon: {
      marginRight: 10,
   },
   searchInput: {
      flex: 1,
      fontFamily: Fonts.regular,
      color: LOGISTICS_COLORS.dark,
   },
   filtersContainer: {
      flexDirection: "row",
      marginLeft: 15,
   },
   filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      marginHorizontal: 5,
   },
   activeFilter: {
      backgroundColor: LOGISTICS_COLORS.primary,
   },
   filterText: {
      fontFamily: Fonts.meduim,
      color: LOGISTICS_COLORS.gray[600],
   },
   activeFilterText: {
      color: COLORS.white,
   },
   toggleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 15,
      backgroundColor: LOGISTICS_COLORS.gray[100],
      borderRadius: 20,
      padding: 5,
   },
   toggleButton: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 15,
   },
   activeToggle: {
      backgroundColor: LOGISTICS_COLORS.primary,
   },
   toggleText: {
      fontFamily: Fonts.meduim,
      color: LOGISTICS_COLORS.gray[600],
   },
   activeToggleText: {
      color: COLORS.white,
   },
   toggleSeparator: {
      width: 1,
      height: 20,
      backgroundColor: LOGISTICS_COLORS.gray[300],
   },
   listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
   },
   card: {
      backgroundColor: LOGISTICS_COLORS.white,
      borderRadius: 16,
      marginBottom: 20,
      overflow: "hidden",
   },
   snackbar: {
      position: "absolute",
      top: 80,
      left: 20,
      right: 20,
      backgroundColor: LOGISTICS_COLORS.success,
      padding: 15,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
   },
   snackbarText: {
      color: LOGISTICS_COLORS.white,
      marginLeft: 10,
      fontFamily: Fonts.medium,
   },
   imageContainer: {
      width: windowWidth,
   },
   image: {
      width: windowWidth,
      height: 250,
   },
   cardContent: {
      padding: 20,
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
   },
   headerLeft: {
      flexDirection: "row",
      alignItems: "center",
   },
   clientName: {
      fontFamily: Fonts.bold,
      color: LOGISTICS_COLORS.dark,
      marginRight: 10,
   },
   statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: LOGISTICS_COLORS.gray[100],
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
   },
   statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
   },
   statusText: {
      fontFamily: Fonts.meduim,
      color: LOGISTICS_COLORS.gray[700],
   },
   trackingCode: {
      backgroundColor: COLORS.blue,
      color: COLORS.white,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 8,
      fontFamily: Fonts.bold,
   },
   detailsContainer: {
      marginBottom: 20,
   },
   detailItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
   },
   detailText: {
      marginLeft: 10,
      fontFamily: Fonts.regular,
      color: LOGISTICS_COLORS.gray[700],
   },
   priceText: {
      color: LOGISTICS_COLORS.success,
      fontFamily: Fonts.bold,
   },
   expandedContent: {
      marginTop: 15,
      borderTopWidth: 1,
      borderTopColor: LOGISTICS_COLORS.gray[200],
      paddingTop: 15,
   },
   actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
   },
   copyButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: LOGISTICS_COLORS.primary,
      padding: 14,
      borderRadius: 12,
   },
   copyButtonText: {
      color: COLORS.white,
      marginLeft: 8,
      fontFamily: Fonts.bold,
   },
   expandButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: LOGISTICS_COLORS.gray[100],
      padding: 14,
      borderRadius: 12,
   },
   expandButtonText: {
      color: LOGISTICS_COLORS.primary,
      marginRight: 8,
      fontFamily: Fonts.meduim,
   },
   emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 30,
   },
   emptyTitle: {
      fontFamily: Fonts.bold,
      color: LOGISTICS_COLORS.dark,
      marginTop: 20,
   },
   emptyDescription: {
      fontFamily: Fonts.regular,
      color: LOGISTICS_COLORS.gray[600],
      textAlign: "center",
      marginTop: 10,
      maxWidth: 300,
   },
   loaderContainer: {
      padding: 20,
      alignItems: "center",
   },
   loader: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: LOGISTICS_COLORS.primary,
      marginVertical: 10,
   },
   loadMoreContainer: {
      padding: 15,
      alignItems: "center",
   },
   loadMoreText: {
      color: LOGISTICS_COLORS.primary,
      fontFamily: Fonts.meduim,
   },
   errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
   },
   errorContent: {
      alignItems: "center",
      maxWidth: 300,
   },
   errorTitle: {
      fontFamily: Fonts.bold,
      color: LOGISTICS_COLORS.error,
      marginTop: 20,
   },
   errorDescription: {
      fontFamily: Fonts.regular,
      color: LOGISTICS_COLORS.gray[700],
      textAlign: "center",
      marginTop: 10,
      marginBottom: 20,
   },
   retryButton: {
      backgroundColor: LOGISTICS_COLORS.primary,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 30,
   },
   retryButtonText: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
   },
});

export default AdminPastOrders;
