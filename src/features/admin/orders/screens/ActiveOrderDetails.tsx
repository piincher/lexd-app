import React, { useEffect, useState } from "react";
import {
   View,
   StyleSheet,
   Text,
   Pressable,
   ScrollView,
   RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Chip, Divider, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import { useGetOrderDetail } from '@src/shared/hooks/useOrderDetail';
import { useGetRoutes } from '@src/shared/hooks/useRoutes';
import { formatDate } from "@src/utils/formatDate";
import { useUpdateOrder, useUpdateStatusDelivery } from "../hooks/useOrderManagement";

// ── Types ──────────────────────────────────────────

interface UpdateSelected {
   title: string;
   coordinates: {
      latitude: string;
      location: string;
      longitude: string;
   }[];
   id: string;
   time: string;
   note?: string;
}

// ── Route step icons ───────────────────────────────

const STEP_ICONS: Record<string, string> = {
   "Le client a passé une commande": "cart-check",
   "Les colis sont emballés et prêts pour l'expédition": "package-variant-closed",
   "Order arrived at warehouse": "warehouse",
   "Order in Processing": "cog",
   "Order in Transit": "truck-delivery",
   "Order in Arrived": "map-marker-check",
   Delivered: "package-check",
};

// ── Info row helper ────────────────────────────────

const InfoRow = ({
   icon,
   label,
   value,
   iconColor = "#6B7280",
}: {
   icon: string;
   label: string;
   value: string;
   iconColor?: string;
}) => (
   <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
         <View style={[styles.infoIcon, { backgroundColor: `${iconColor}15` }]}>
            <MaterialCommunityIcons name={icon as any} size={18} color={iconColor} />
         </View>
         <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue} numberOfLines={1}>
         {value || "N/A"}
      </Text>
   </View>
);

// ── Main screen ────────────────────────────────────

const ActiveOrderDetails = ({
   route: navRoute,
   navigation,
}: RootStackScreenProps<"ActiveOrderDetails">) => {
   // ── State ──
   const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, boolean>>({});
   const [coordinatesData, setCoordinatesData] = useState<
      { latitude: string; location: string; longitude: string }[]
   >([]);
   const [note, setNote] = useState("");
   const [statusChange, setStatusChange] = useState("");
   const [actualLocation, setActualLocation] = useState("");
   const [pickerValue, setPickerValue] = useState(actualLocation);

   // ── Hooks ──
   const id = navRoute.params.id;
   const { data: item, isLoading, refetch } = useGetOrderDetail(id);
   const { data: Routes } = useGetRoutes();
   const { mutate } = useUpdateOrder();
   const { mutate: updateStatusDelivery, isPending } = useUpdateStatusDelivery(id);

   const Status = Routes?.[0];
   const isDelivered = item?.status === "Delivered" || item?.status === "Inactive";
   const isAir = item?.shippingMode === "air";
   const orderPrice = parseFloat(String(item?.calculatedTotal || item?.priceTotal || 0)) || 0;

   // ── Handlers ──

   const updateOrder = (updatedSelected: UpdateSelected) => {
      if (!item) return;
      mutate({ ...item, orderId: item._id!, currentPosition: updatedSelected } as any);
   };

   const updateDeliver = () => {
      if (!item) return;
      updateStatusDelivery({ ...item, orderId: item?.code! } as any);
   };

   const handleStepChange = (value: string, status: string, coordinates: any) => {
      const location = coordinates.find((loc: any) => loc.location === value);
      setStatusChange(status);
      setPickerValue(value);
      setNote(location?.note);
      if (location) setCoordinatesData([location]);
   };

   const updateTransiteStatus = () => {
      updateOrder({
         title: statusChange,
         coordinates: coordinatesData,
         id: Math.random().toString(36).substring(7),
         time: new Date().toISOString(),
         note: note,
      });
   };

   const handleCheckboxPress = (location: string, status: string, coordinates: any) => {
      setSelectedCheckboxes((prev) => ({ ...prev, [location]: !prev[location] }));
      updateOrder({
         title: status,
         coordinates,
         id: Math.random().toString(36).substring(7),
         time: new Date().toISOString(),
         note: `La status de votre colis est : ${status} `,
      });
   };

   // ── Effects ──

   useEffect(() => {
      const lastRoute = item?.route?.[item.route?.length - 1];
      const coords = lastRoute?.coordinates || [];
      const lastCoord = coords[coords.length - 1];
      setActualLocation(lastCoord?.location);
   }, [item]);

   useEffect(() => {
      if (!item) return;
      const initial = item?.route?.reduce((acc: Record<string, boolean>, r: any) => {
         r?.coordinates?.forEach((loc: any) => {
            acc[loc.location] = !!Status?.orderDetail?.some(
               (d: any) =>
                  d.status === r.title &&
                  d.coordinates.some((c: any) => c.location === loc.location)
            );
         });
         return acc;
      }, {} as Record<string, boolean>);
      setSelectedCheckboxes(initial || {});
   }, [item, Status]);

   // ── Render ──

   return (
      <SafeAreaView style={styles.container} edges={["top"]}>
         {/* App bar */}
         <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
               title={item?.code || "Commande"}
               titleStyle={styles.appbarTitle}
            />
         </Appbar.Header>

         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
               <RefreshControl
                  refreshing={isLoading}
                  onRefresh={refetch}
                  tintColor={COLORS.blue}
               />
            }
         >
            {/* ── 1. Header card ── */}
            <Surface style={styles.card}>
               <View style={styles.headerRow}>
                  {/* Client info */}
                  <View style={styles.clientSection}>
                     <View
                        style={[
                           styles.avatar,
                           { backgroundColor: isDelivered ? "#E8F5E9" : "#E3F2FD" },
                        ]}
                     >
                        <Text
                           style={[
                              styles.avatarText,
                              { color: isDelivered ? "#4CAF50" : "#1976D2" },
                           ]}
                        >
                           {item?.clientName
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("") || "?"}
                        </Text>
                     </View>
                     <View style={{ flex: 1 }}>
                        <Text style={styles.clientName} numberOfLines={1}>
                           {item?.clientName || "Client"}
                        </Text>
                        <Text style={styles.clientPhone}>
                           {item?.clientPhone || "—"}
                        </Text>
                     </View>
                  </View>

                  {/* Status badge */}
                  <Chip
                     style={{
                        backgroundColor: isDelivered ? "#E8F5E9" : "#FFF3E0",
                     }}
                     textStyle={{
                        color: isDelivered ? "#2E7D32" : "#E65100",
                        fontSize: 11,
                        fontWeight: "600",
                     }}
                     compact
                     icon={() => (
                        <MaterialCommunityIcons
                           name={isDelivered ? "check-circle" : "clock-outline"}
                           size={14}
                           color={isDelivered ? "#2E7D32" : "#E65100"}
                        />
                     )}
                  >
                     {item?.status || "En attente"}
                  </Chip>
               </View>

               {/* Shipping mode + price row */}
               <View style={styles.metaRow}>
                  <Chip
                     style={{
                        backgroundColor: isAir ? "#E3F2FD" : "#E0F2F1",
                     }}
                     textStyle={{
                        color: isAir ? "#1976D2" : "#00796B",
                        fontSize: 11,
                        fontWeight: "600",
                     }}
                     compact
                     icon={() => (
                        <MaterialCommunityIcons
                           name={isAir ? "airplane" : "ferry"}
                           size={14}
                           color={isAir ? "#1976D2" : "#00796B"}
                        />
                     )}
                  >
                     {isAir ? "Aérien" : "Maritime"}
                  </Chip>
                  <View style={{ alignItems: "flex-end" }}>
                     <Text style={styles.priceLabel}>Montant total</Text>
                     <Text style={styles.priceValue}>
                        {orderPrice > 0 ? `${orderPrice.toLocaleString()} FCFA` : 'Non défini'}
                     </Text>
                  </View>
               </View>
            </Surface>

            {/* ── 2. Quick stats ── */}
            <Surface style={[styles.card, styles.statsCard]}>
               <View style={styles.statItem}>
                  <MaterialCommunityIcons
                     name="package-variant-closed"
                     size={20}
                     color="#1976D2"
                  />
                  <Text style={styles.statValue}>{item?.quantity ?? 1}</Text>
                  <Text style={styles.statLabel}>Colis</Text>
               </View>
               <View style={styles.statDivider} />
               <View style={styles.statItem}>
                  <MaterialCommunityIcons name="weight" size={20} color="#E65100" />
                  <Text style={styles.statValue}>
                     {item?.packageWeight ? `${item.packageWeight}` : "--"}
                  </Text>
                  <Text style={styles.statLabel}>Poids (kg)</Text>
               </View>
               <View style={styles.statDivider} />
               <View style={styles.statItem}>
                  <MaterialCommunityIcons name="cube-outline" size={20} color="#2E7D32" />
                  <Text style={styles.statValue}>
                     {item?.packageCBM || "0"}
                  </Text>
                  <Text style={styles.statLabel}>CBM (m³)</Text>
               </View>
            </Surface>

            {/* ── 3. Order info ── */}
            <Surface style={styles.card}>
               <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons name="information" size={20} color={COLORS.blue} />
                  <Text style={styles.sectionTitle}>Informations</Text>
               </View>

               <InfoRow icon="earth" label="Origine" value="Chine, Foshan" iconColor="#4CAF50" />
               <InfoRow
                  icon="map-marker-check"
                  label="Destination"
                  value="Bamako, Mali"
                  iconColor="#F44336"
               />
               <Divider style={styles.divider} />
               <InfoRow
                  icon="package-variant"
                  label="Catégorie"
                  value={item?.category?.name || item?.typeOfPackage || "Général"}
                  iconColor="#FF9800"
               />
               <InfoRow
                  icon="identifier"
                  label="Conteneur"
                  value={item?.contenairNumber || "N/A"}
                  iconColor="#7B1FA2"
               />
               <InfoRow
                  icon="progress-check"
                  label="Statut actuel"
                  value={item?.currentStatus || "Commande passée"}
                  iconColor="#1976D2"
               />
               <Divider style={styles.divider} />
               <InfoRow
                  icon="calendar-arrow-right"
                  label="Date de chargement"
                  value={formatDate(item?.departureDate!)}
                  iconColor="#9C27B0"
               />
               <InfoRow
                  icon="update"
                  label="Dernière mise à jour"
                  value={formatDate(item?.updatedAt!)}
                  iconColor="#607D8B"
               />

               {(note || (item as any)?.note) && (
                  <>
                     <Divider style={styles.divider} />
                     <View style={styles.noteBox}>
                        <MaterialCommunityIcons
                           name="note-text"
                           size={16}
                           color="#F57C00"
                        />
                        <Text style={styles.noteText}>
                           {note || (item as any)?.note || "Aucune note"}
                        </Text>
                     </View>
                  </>
               )}
            </Surface>

            {/* ── 4. Route timeline ── */}
            <Surface style={styles.card}>
               <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons name="routes" size={20} color={COLORS.blue} />
                  <Text style={styles.sectionTitle}>Suivi de l'expédition</Text>
               </View>

               {Status?.orderDetail?.map((routeItem: any, routeIndex: number) => (
                  <View key={routeItem.id || routeIndex} style={styles.routeGroup}>
                     {/* Route step header */}
                     <View style={styles.routeHeader}>
                        <View
                           style={[
                              styles.routeIconCircle,
                              routeItem.status === "Order in Transit" && {
                                 backgroundColor: "#E3F2FD",
                              },
                           ]}
                        >
                           <MaterialCommunityIcons
                              name={(STEP_ICONS[routeItem.status] || "circle") as any}
                              size={16}
                              color={
                                 routeItem.status === "Order in Transit"
                                    ? "#1976D2"
                                    : "#6B7280"
                              }
                           />
                        </View>
                        <Text style={styles.routeTitle}>{routeItem.status}</Text>
                     </View>

                     {/* Transit: picker */}
                     {routeItem.status === "Order in Transit" ? (
                        <View style={styles.pickerWrapper}>
                           <Picker
                              prompt="Changer le trajet"
                              mode="dialog"
                              style={styles.picker}
                              selectedValue={pickerValue || actualLocation}
                              onValueChange={(val) =>
                                 handleStepChange(
                                    val,
                                    routeItem.status,
                                    routeItem.coordinates
                                 )
                              }
                           >
                              {routeItem.coordinates.map((c: any) => (
                                 <Picker.Item
                                    key={c.location}
                                    label={c.location}
                                    value={c.location}
                                 />
                              ))}
                           </Picker>
                        </View>
                     ) : (
                        /* Other statuses: vertical timeline items */
                        <View style={styles.timelineList}>
                           {routeItem.coordinates.map(
                              (location: any, locIndex: number) => {
                                 const isChecked = selectedCheckboxes[location.location];
                                 return (
                                    <Pressable
                                       key={location.location}
                                       onPress={() =>
                                          handleCheckboxPress(
                                             location.location,
                                             routeItem.status,
                                             routeItem.coordinates
                                          )
                                       }
                                       style={styles.timelineItem}
                                    >
                                       {/* Connector line */}
                                       {locIndex > 0 && (
                                          <View
                                             style={[
                                                styles.connector,
                                                isChecked && styles.connectorActive,
                                             ]}
                                          />
                                       )}
                                       {/* Circle */}
                                       <View
                                          style={[
                                             styles.timelineCircle,
                                             isChecked && styles.timelineCircleActive,
                                          ]}
                                       >
                                          {isChecked && (
                                             <MaterialCommunityIcons
                                                name="check"
                                                size={12}
                                                color="#FFF"
                                             />
                                          )}
                                       </View>
                                       {/* Label */}
                                       <Text
                                          style={[
                                             styles.timelineLabel,
                                             isChecked && styles.timelineLabelActive,
                                          ]}
                                          numberOfLines={2}
                                       >
                                          {location.location}
                                       </Text>
                                    </Pressable>
                                 );
                              }
                           )}
                        </View>
                     )}

                     {routeIndex < (Status?.orderDetail?.length ?? 0) - 1 && (
                        <Divider style={styles.routeDivider} />
                     )}
                  </View>
               ))}
            </Surface>

            {/* ── 5. Actions ── */}
            <View style={styles.actionsSection}>
               {isDelivered ? (
                  <View style={styles.deliveredBanner}>
                     <MaterialCommunityIcons
                        name="check-circle"
                        size={24}
                        color="#4CAF50"
                     />
                     <Text style={styles.deliveredText}>
                        Le client a récupéré son colis
                     </Text>
                  </View>
               ) : (
                  <Button
                     mode="contained"
                     onPress={updateTransiteStatus}
                     icon="update"
                     style={styles.updateBtn}
                     buttonColor={COLORS.blue}
                     labelStyle={styles.btnLabel}
                  >
                     Mettre à jour le statut
                  </Button>
               )}

               {!isDelivered && (
                  <Button
                     mode="contained"
                     onPress={updateDeliver}
                     icon="package-check"
                     style={styles.deliverBtn}
                     buttonColor="#4CAF50"
                     labelStyle={styles.btnLabel}
                     loading={isPending}
                     disabled={isPending}
                  >
                     Marquer comme livré
                  </Button>
               )}

               <Button
                  mode="outlined"
                  onPress={() =>
                     (navigation as any).navigate("OrderDetailWithGoods", {
                        orderId: id,
                     })
                  }
                  icon="package-variant"
                  style={styles.goodsBtn}
                  textColor={COLORS.blue}
                  labelStyle={styles.btnLabel}
               >
                  Voir avec Marchandises
               </Button>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default ActiveOrderDetails;

// ── Styles ─────────────────────────────────────────

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F5F7FA",
   },
   appbar: {
      backgroundColor: "#FFF",
      elevation: 0,
   },
   appbarTitle: {
      fontSize: 16,
      fontWeight: "700",
      fontFamily: Fonts.bold,
   },
   scrollContent: {
      paddingBottom: 40,
   },

   // Cards
   card: {
      marginHorizontal: 12,
      marginBottom: 12,
      padding: 16,
      borderRadius: 16,
      backgroundColor: "#FFF",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
   },

   // Header card
   headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 14,
   },
   clientSection: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginRight: 8,
   },
   avatar: {
      width: 46,
      height: 46,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
   },
   avatarText: {
      fontSize: 16,
      fontWeight: "700",
      fontFamily: Fonts.bold,
   },
   clientName: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1A1A2E",
      fontFamily: Fonts.semiBold,
   },
   clientPhone: {
      fontSize: 12,
      color: "#9E9E9E",
      fontFamily: Fonts.regular,
      marginTop: 1,
   },
   metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: "#F0F0F0",
   },
   priceLabel: {
      fontSize: 10,
      color: "#9E9E9E",
      fontFamily: Fonts.medium,
   },
   priceValue: {
      fontSize: 17,
      fontWeight: "700",
      color: "#1A1A2E",
      fontFamily: Fonts.bold,
   },

   // Stats
   statsCard: {
      flexDirection: "row",
      alignItems: "center",
   },
   statItem: {
      flex: 1,
      alignItems: "center",
      gap: 4,
   },
   statValue: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1A1A2E",
      fontFamily: Fonts.bold,
   },
   statLabel: {
      fontSize: 10,
      color: "#9E9E9E",
      fontFamily: Fonts.medium,
   },
   statDivider: {
      width: 1,
      height: 36,
      backgroundColor: "#F0F0F0",
   },

   // Section header
   sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1A1A2E",
      fontFamily: Fonts.semiBold,
   },

   // Info rows
   infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
   },
   infoRowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
   },
   infoIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
   },
   infoLabel: {
      fontSize: 13,
      color: "#6B7280",
      fontFamily: Fonts.medium,
   },
   infoValue: {
      fontSize: 13,
      fontWeight: "600",
      color: "#1A1A2E",
      fontFamily: Fonts.semiBold,
      maxWidth: "45%",
      textAlign: "right",
   },
   divider: {
      marginVertical: 6,
      backgroundColor: "#F0F0F0",
   },

   // Notes
   noteBox: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      backgroundColor: "#FFF8E1",
      borderRadius: 10,
      padding: 12,
   },
   noteText: {
      flex: 1,
      fontSize: 13,
      color: "#666",
      fontFamily: Fonts.regular,
      lineHeight: 18,
   },

   // Route timeline
   routeGroup: {
      marginBottom: 4,
   },
   routeHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 8,
   },
   routeIconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#F3F4F6",
      justifyContent: "center",
      alignItems: "center",
   },
   routeTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "#1A1A2E",
      fontFamily: Fonts.semiBold,
      flex: 1,
   },
   routeDivider: {
      marginVertical: 10,
      backgroundColor: "#F0F0F0",
   },

   // Picker (transit)
   pickerWrapper: {
      marginLeft: 42,
      backgroundColor: "#F8F9FA",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      overflow: "hidden",
   },
   picker: {
      width: "100%",
      height: 48,
   },

   // Timeline items (checkboxes)
   timelineList: {
      marginLeft: 15,
      paddingLeft: 24,
   },
   timelineItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      position: "relative",
   },
   connector: {
      position: "absolute",
      left: 8,
      top: -6,
      width: 2,
      height: 16,
      backgroundColor: "#E0E0E0",
   },
   connectorActive: {
      backgroundColor: "#4CAF50",
   },
   timelineCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "#F3F4F6",
      borderWidth: 2,
      borderColor: "#E0E0E0",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      zIndex: 1,
   },
   timelineCircleActive: {
      backgroundColor: "#4CAF50",
      borderColor: "#4CAF50",
   },
   timelineLabel: {
      flex: 1,
      fontSize: 13,
      color: "#6B7280",
      fontFamily: Fonts.regular,
      lineHeight: 18,
   },
   timelineLabelActive: {
      color: "#1A1A2E",
      fontWeight: "600",
      fontFamily: Fonts.semiBold,
   },

   // Actions
   actionsSection: {
      paddingHorizontal: 12,
      paddingTop: 4,
      gap: 10,
   },
   updateBtn: {
      borderRadius: 12,
      paddingVertical: 4,
   },
   deliverBtn: {
      borderRadius: 12,
      paddingVertical: 4,
   },
   goodsBtn: {
      borderRadius: 12,
      borderColor: COLORS.blue,
      paddingVertical: 4,
   },
   btnLabel: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: Fonts.semiBold,
   },
   deliveredBanner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#E8F5E9",
      borderRadius: 12,
      paddingVertical: 14,
   },
   deliveredText: {
      fontSize: 15,
      fontWeight: "600",
      color: "#2E7D32",
      fontFamily: Fonts.semiBold,
   },
});
