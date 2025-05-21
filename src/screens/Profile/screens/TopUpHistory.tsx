import { MaterialCommunityIcons } from "@expo/vector-icons";
import { topUpType } from "@src/api/topUp";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useTopUpHistory } from "@src/screens/Admin/screens/TopUpList/hooks/useTopUp";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Animated, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

const TopUpHistoryScreen = () => {
   const [refreshing, setRefreshing] = useState(false);
   const { data } = useTopUpHistory();

   const renderItem = ({ item, index }: { item: topUpType; index: number }) => {
      console.log("items", item.createdAt);
      return (
         <Animated.View style={[styles.card, {}]}>
            <View style={styles.cardLeft}>
               <View
                  style={[
                     styles.statusIconContainer,
                     {
                        backgroundColor:
                           item.status === "approved"
                              ? COLORS.success + "20"
                              : item.status === "pending"
                              ? COLORS.yellow + "20"
                              : COLORS.redShade + "20",
                     },
                  ]}
               >
                  <MaterialCommunityIcons
                     name={
                        item.status === "approved"
                           ? "check-circle"
                           : item.status === "pending"
                           ? "clock"
                           : "close-circle"
                     }
                     size={24}
                     color={
                        item.status === "approved"
                           ? COLORS.success
                           : item.status === "pending"
                           ? COLORS.yellow
                           : COLORS.redShade
                     }
                  />
               </View>
            </View>

            <View style={styles.cardCenter}>
               <Text style={styles.amount}>{item.amount} FCFA</Text>
               <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleString("fr-FR", {
                     day: "2-digit",
                     month: "long",
                     year: "numeric",
                     hour: "2-digit",
                     minute: "2-digit",
                     second: "2-digit",
                  })}
               </Text>
            </View>

            <View style={styles.cardRight}>
               <View
                  style={[
                     styles.statusBadge,
                     {
                        backgroundColor:
                           item.status === "approved"
                              ? COLORS.success + "20"
                              : item.status === "pending"
                              ? COLORS.yellow + "20"
                              : COLORS.redShade + "20",
                     },
                  ]}
               >
                  <Text
                     style={[
                        styles.statusText,
                        {
                           color:
                              item.status === "approved"
                                 ? COLORS.success
                                 : item.status === "pending"
                                 ? COLORS.yellow
                                 : COLORS.redShade,
                        },
                     ]}
                  >
                     {item.status === "approved"
                        ? "Approuvé"
                        : item.status === "pending"
                        ? "En attente"
                        : "Rejeté"}
                  </Text>
               </View>
               <Text style={styles.methodText}>
                  {item.method === "orange_money" ? "Orange Money" : "Espèces"}
               </Text>
            </View>
         </Animated.View>
      );
   };

   const handleRefresh = () => {
      setRefreshing(true);
      // Add actual refresh logic here
      setTimeout(() => setRefreshing(false), 1500);
   };

   return (
      <LinearGradient colors={[COLORS.blue, COLORS.yellow]} style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Historique des Recharges</Text>
            <Text style={styles.balanceText}>Solde Actuel: 175,000 FCFA</Text>
         </View>

         <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id!}
            contentContainerStyle={styles.listContent}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  tintColor={COLORS.white}
                  colors={[COLORS.white]}
               />
            }
            ListEmptyComponent={
               <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="history" size={64} color={COLORS.white} />
                  <Text style={styles.emptyText}>Aucun historique de recharge</Text>
               </View>
            }
         />
      </LinearGradient>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      padding: 24,
      paddingTop: 48,
   },
   headerTitle: {
      fontFamily: Fonts.bold,
      fontSize: 28,
      color: COLORS.white,
      marginBottom: 8,
   },
   balanceText: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: COLORS.white,
      opacity: 0.9,
   },
   listContent: {
      paddingHorizontal: 16,
      paddingBottom: 32,
   },
   card: {
      backgroundColor: COLORS.white,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: COLORS.DarkGrey,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
   },
   cardLeft: {
      marginRight: 16,
   },
   statusIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
   },
   cardCenter: {
      flex: 1,
   },
   amount: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: COLORS.DarkGrey,
      marginBottom: 4,
   },
   date: {
      fontFamily: Fonts.meduim,
      fontSize: 12,
      color: COLORS.grey,
   },
   cardRight: {
      alignItems: "flex-end",
   },
   statusBadge: {
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 12,
      marginBottom: 8,
   },
   statusText: {
      fontFamily: Fonts.black,
      fontSize: 12,
   },
   methodText: {
      fontFamily: Fonts.meduim,
      fontSize: 12,
      color: COLORS.grey,
   },
   emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      minHeight: 300,
   },
   emptyText: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: COLORS.white,
      marginTop: 16,
      opacity: 0.8,
   },
});

export default TopUpHistoryScreen;
