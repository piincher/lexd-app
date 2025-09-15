import { COLORS } from "@src/constants/Colors";
import { HomeTabScreenProps, RootStackParamList } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemList } from "../../../Home/components/ItemList";
import { RowDetails } from "../../../Home/components/RowDetails";
import { useViewSmsBalance } from "../../../Home/hooks/useGetActiveOrders";
import withProtectedRoute from "@src/hoc/protected";
import { MaterialIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";

type dataType = {
   id: string;
   title: string;
   route: keyof RootStackParamList;
}[];

const list: dataType = [
   {
      id: "0",
      title: "Ajouter une commande",
      route: "ChooseShippingMethod",
   },
   {
      id: "1",
      title: "Voir les commandes actives",
      route: "ShippingMethod",
   },
   {
      id: "2",
      title: "Ajouter un utilisateur",
      route: "UserAdd",
   },
   {
      id: "3",
      title: "Voir les commandes passées",
      route: "AdmninPastOrders",
   },
   {
      id: "4",
      title: "Envoyer un sms de rappel",
      route: "SendSms",
   },
   {
      id: "5",
      title: "Mise à jour par lots",
      route: "BatchUpdate",
   },
   {
      id: "6",
      title: "Scanner pour confirmation de réception",
      route: "ScanQRCode",
   },
   {
      id: "9",
      title: "Demande de recharge",
      route: "TopUpList",
   },
];

const AdminDashBoard = ({ navigation }: HomeTabScreenProps<"AdminDashBoard">) => {
   const { role } = useAuth((state) => state.user);
   const isAdmin = role === "admin";

   const { data: smsData } = useViewSmsBalance(isAdmin);

   const date =
      smsData && smsData[2]?.expirationDate ? new Date(smsData[2].expirationDate) : new Date();
   const formattedDateTime = date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
   const totalUnits = smsData?.[2]?.availableUnits || 0;
   const availableUnits = smsData?.[2]?.availableUnits || 0;
   const usedUnits = totalUnits - availableUnits;
   const percentageUsed = totalUnits > 0 ? (usedUnits / totalUnits) * 100 : 0;
   const balanceStatus =
      availableUnits > totalUnits * 0.7
         ? "success"
         : availableUnits > totalUnits * 0.3
         ? "warning"
         : "danger";

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Welcome Header */}
            <View style={styles.welcomeHeader}>
               <MaterialIcons name="admin-panel-settings" size={32} color={COLORS.blue} />
               <View style={styles.welcomeTextContainer}>
                  <Text style={styles.welcomeTitle}>Bienvenue, Admin</Text>
                  <Text style={styles.welcomeSubtitle}>Gestion des SMS et commandes</Text>
               </View>
            </View>

            {/* SMS Information Card */}
            <View style={styles.card}>
               <View style={styles.cardHeader}>
                  <MaterialIcons name="sms" size={24} color={COLORS.blue} />
                  <Text style={styles.cardTitle}>Informations sur les SMS</Text>
               </View>

               <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { width: `${percentageUsed}%` }]} />
               </View>

               <View style={styles.balanceInfo}>
                  <Text style={styles.balanceText}>
                     {availableUnits} SMS restants sur {totalUnits}
                  </Text>
                  <View style={[styles.statusBadge, styles[`${balanceStatus}Status`]]}>
                     <Text style={styles.statusText}>
                        {balanceStatus === "success"
                           ? "Niveau élevé"
                           : balanceStatus === "warning"
                           ? "Niveau moyen"
                           : "Niveau bas"}
                     </Text>
                  </View>
               </View>

               <RowDetails
                  label="Date d'expiration"
                  value={formattedDateTime}
                  icon="calendar-today"
               />
            </View>

            {/* Admin Actions Section */}
            <View style={styles.actionsSection}>
               <Text style={styles.sectionTitle}>Actions disponibles</Text>
               <ItemList data={list} navigation={navigation} />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   scrollContainer: {
      padding: 16,
   },
   welcomeHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      padding: 16,
      backgroundColor: COLORS.white,
      borderRadius: 16,
   },
   welcomeTextContainer: {
      marginLeft: 12,
   },
   welcomeTitle: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: COLORS.DarkGrey,
      marginBottom: 4,
   },
   welcomeSubtitle: {
      fontSize: 14,
      fontFamily: Fonts.meduim,
      color: COLORS.grey,
   },
   card: {
      backgroundColor: COLORS.white,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
   },
   cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
   },
   cardTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: COLORS.DarkGrey,
      marginLeft: 8,
   },
   progressContainer: {
      height: 8,
      backgroundColor: COLORS.lightGray,
      borderRadius: 4,
      overflow: "hidden",
      marginBottom: 12,
   },
   progressBar: {
      height: "100%",
      backgroundColor: COLORS.blue,
      borderRadius: 4,
   },
   balanceInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
   },
   balanceText: {
      fontSize: 14,
      fontFamily: Fonts.meduim,
      color: COLORS.DarkGrey,
   },
   statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
   },
   successStatus: {
      backgroundColor: COLORS.success,
   },
   warningStatus: {
      backgroundColor: COLORS.yellow,
   },
   dangerStatus: {
      backgroundColor: COLORS.danger,
   },
   statusText: {
      fontSize: 12,
      fontFamily: Fonts.meduim,
      fontWeight: "600",
   },
   actionsSection: {
      marginBottom: 24,
   },
   sectionTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: COLORS.dark,
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
   },
   itemList: {
      gap: 12,
   },
});

export default withProtectedRoute(AdminDashBoard);
