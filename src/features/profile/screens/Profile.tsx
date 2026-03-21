// Profile.tsx
import SocialMedia from "@src/components/SocialMedia/SocialMedia";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import withProtectedRoute from "@src/hoc/protected";
import { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
   Image,
   ScrollView,
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Alert,
   RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetCurrentUser, useBalance } from "../hooks/useProfile";
import { CertifiedShipperCard } from "../components/CertifiedShipperCard";
import { MilestoneBadges } from "../components/MilestoneBadges";
import { BadgesSection } from "../components/BadgesSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { useCertificateProgress } from "../hooks/useCertificate";
import { ThemeToggle } from "@src/components/ThemeToggle";

const MENU_ITEMS = [
   { title: "Historique des commandes", icon: "history" as const, screen: "PastOrders" },
   { title: "Centre d'assistance", icon: "headset" as const, screen: "SelectAdminToChatWith" },
   { title: "Notifications", icon: "notifications" as const, screen: "NotificationSettings" },
   { title: "À propos de ChinaLink", icon: "info" as const, screen: "AboutUs" },
];

const Profile = ({ navigation }: HomeTabScreenProps<"Profile">) => {
   const logout = useAuth((state) => state.logOut);
   const { data, refetch: refetchUser } = useGetCurrentUser();
   const { data: balanceData, refetch: refetchBalance } = useBalance();
   const { data: certificateProgress, isLoading: isCertLoading } = useCertificateProgress();

   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await Promise.all([refetchUser(), refetchBalance()]);
      setRefreshing(false);
   }, [refetchUser, refetchBalance]);

   const handleLogout = () => {
      Alert.alert(
         "Se déconnecter",
         "Êtes-vous sûr de vouloir vous déconnecter ?",
         [
            { text: "Annuler", style: "cancel" },
            { text: "Déconnecter", style: "destructive", onPress: logout },
         ]
      );
   };

   const avatarUri = data?.avatar?.url;
   const initials = `${data?.firstName?.[0] ?? ""}${data?.lastName?.[0] ?? ""}`.toUpperCase();

   return (
      <SafeAreaView style={styles.container} edges={["top"]}>
         <LinearGradient
            colors={["#1a237e", "#4a148c", "#880e4f"]}
            style={StyleSheet.absoluteFill}
         />
         <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={COLORS.white}
                  colors={["#4a148c"]}
               />
            }
         >
            {/* User Header */}
            <View style={styles.header}>
               {avatarUri ? (
                  <Image style={styles.avatar} source={{ uri: avatarUri }} />
               ) : (
                  <View style={[styles.avatar, styles.avatarFallback]}>
                     <Text style={styles.avatarInitials}>{initials || "?"}</Text>
                  </View>
               )}
               <View style={styles.userInfo}>
                  <Text style={styles.username}>
                     {data?.firstName} {data?.lastName}
                  </Text>
                  <Text style={styles.phoneNumber}>+{data?.phoneNumber}</Text>
               </View>
            </View>

            {/* Balance */}
            <View style={styles.balanceCard}>
               <MaterialIcons name="account-balance-wallet" size={28} color="#4CAF50" />
               <View style={styles.balanceInfo}>
                  <Text style={styles.balanceLabel}>Solde</Text>
                  <Text style={styles.balanceValue}>
                     {balanceData?.balance?.toLocaleString("fr-FR") ?? "0"} FCFA
                  </Text>
               </View>
            </View>

            {/* Achievements */}
            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Réalisations</Text>
            </View>
            <View style={styles.cardsContainer}>
               <CertifiedShipperCard progress={certificateProgress} isLoading={isCertLoading} />
               <MilestoneBadges />
               <BadgesSection />
               <ReviewsSection />
            </View>

            {/* Menu */}
            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Paramètres</Text>
            </View>
            <View style={styles.menuContainer}>
               <View style={styles.menuItem}>
                  <ThemeToggle variant="menu" />
               </View>
               {MENU_ITEMS.map((item) => (
                  <TouchableOpacity
                     key={item.title}
                     style={styles.menuItem}
                     onPress={() => navigation.navigate(item.screen as any)}
                     activeOpacity={0.7}
                  >
                     <MaterialIcons name={item.icon} size={22} color={COLORS.white} />
                     <Text style={styles.menuItemText}>{item.title}</Text>
                     <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.4)" />
                  </TouchableOpacity>
               ))}
            </View>

            {/* Logout */}
            <TouchableOpacity
               style={styles.logoutButton}
               onPress={handleLogout}
               activeOpacity={0.7}
            >
               <MaterialIcons name="logout" size={22} color="#EF5350" />
               <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
               <SocialMedia color="#FFF" />
               <Text style={styles.versionText}>
                  v{Constants.expoConfig?.version}
               </Text>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   scrollView: {
      flex: 1,
   },
   scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 32,
   },
   // Header
   header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.12)",
      borderRadius: 20,
      padding: 20,
      marginTop: 16,
   },
   avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.2)",
   },
   avatarFallback: {
      backgroundColor: "rgba(255,255,255,0.15)",
      justifyContent: "center",
      alignItems: "center",
   },
   avatarInitials: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 24,
   },
   userInfo: {
      marginLeft: 16,
      flex: 1,
   },
   username: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: COLORS.white,
      marginBottom: 4,
   },
   phoneNumber: {
      fontSize: 14,
      fontFamily: Fonts.meduim,
      color: "rgba(255,255,255,0.7)",
   },
   // Balance
   balanceCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 16,
      padding: 16,
      marginTop: 12,
      gap: 16,
   },
   balanceInfo: {
      flex: 1,
   },
   balanceLabel: {
      color: "rgba(255,255,255,0.7)",
      fontFamily: Fonts.meduim,
      fontSize: 12,
   },
   balanceValue: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 22,
      marginTop: 2,
   },
   // Sections
   sectionHeader: {
      marginTop: 24,
      marginBottom: 12,
   },
   sectionTitle: {
      color: "rgba(255,255,255,0.6)",
      fontFamily: Fonts.bold,
      fontSize: 13,
      textTransform: "uppercase",
      letterSpacing: 1,
   },
   cardsContainer: {
      gap: 0,
   },
   // Menu
   menuContainer: {
      gap: 8,
   },
   menuItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
   },
   menuItemText: {
      flex: 1,
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 15,
      marginLeft: 14,
   },
   // Logout
   logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(239,83,80,0.1)",
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginTop: 16,
      borderWidth: 1,
      borderColor: "rgba(239,83,80,0.2)",
   },
   logoutText: {
      flex: 1,
      color: "#EF5350",
      fontFamily: Fonts.bold,
      fontSize: 15,
      marginLeft: 14,
   },
   // Footer
   footer: {
      marginTop: 32,
      alignItems: "center",
      paddingBottom: 16,
   },
   versionText: {
      color: "rgba(255,255,255,0.4)",
      fontFamily: Fonts.meduim,
      fontSize: 12,
      marginTop: -20,
   },
});

export default withProtectedRoute(Profile);
