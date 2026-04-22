/**
 * Profile Screen — Complete Revamp
 * Premium design with theme support, animated sections, and clean hierarchy
 */

import React, { useCallback, useEffect, useState } from "react";
import {
   Image,
   ScrollView,
   StyleSheet,
   View,
   Text,
   Pressable,
   Alert,
   RefreshControl,
   Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import Constants from "expo-constants";

import SocialMedia from "@src/components/SocialMedia/SocialMedia";
import { Fonts } from "@src/constants/Fonts";
import { withProtectedRoute } from "@src/shared/hoc/withProtectedRoute";
import type { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useGetCurrentUser, useBalance } from "../hooks/useProfile";
import { CertifiedShipperCard } from "../components/CertifiedShipperCard";
import { MilestoneBadges } from "../components/MilestoneBadges";
import { BadgesSection } from "../components/BadgesSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { ProfileChartsSection } from "../components/ProfileChartsSection";
import { useCertificateProgress } from "../hooks/useCertificate";
import { ThemeToggle } from "@src/components/ThemeToggle";
import { useGetUnreadCount } from "@src/features/notifications";
import * as Haptics from "expo-haptics";
import { hapticLight } from "@src/shared/lib/haptics";

// ─── Menu Configuration ─────────────────────────────────────────
type MenuItem = {
   title: string;
   subtitle: string;
   icon: string;
   screen: string;
   iconBg: string;
   iconColor: string;
};

const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
   {
      title: "Compte",
      items: [
         {
            title: "Historique des commandes",
            subtitle: "Consultez vos commandes passees",
            icon: "history",
            screen: "PastOrders",
            iconBg: "rgba(59,130,246,0.1)",
            iconColor: "#3B82F6",
         },
         {
            title: "Notifications",
            subtitle: "Gerez vos preferences",
            icon: "bell-outline",
            screen: "NotificationSettings",
            iconBg: "rgba(245,158,11,0.1)",
            iconColor: "#F59E0B",
         },
         {
            title: "Historique des paiements",
            subtitle: "Consultez vos paiements",
            icon: "receipt-text-outline",
            screen: "MyPaymentHistory",
            iconBg: "rgba(16, 185, 129, 0.1)",
            iconColor: "#10B981",
         },
      ],
   },
   {
      title: "Support",
      items: [
         {
            title: "FAQ",
            subtitle: "Questions frequentes",
            icon: "help-circle",
            screen: "FAQ",
            iconBg: "rgba(34,197,94,0.1)",
            iconColor: "#22C55E",
         },
         {
            title: "Centre d'assistance",
            subtitle: "Ouvrir un ticket ou suivre une demande",
            icon: "lifebuoy",
            screen: "TicketList",
            iconBg: "rgba(59,130,246,0.1)",
            iconColor: "#3B82F6",
         },
         {
            title: "A propos de ChinaLink",
            subtitle: "En savoir plus sur nous",
            icon: "information-outline",
            screen: "AboutUs",
            iconBg: "rgba(139,92,246,0.1)",
            iconColor: "#8B5CF6",
         },
      ],
   },
   {
      title: "Application",
      items: [
         {
            title: "Introduction",
            subtitle: "Revoir le guide de demarrage",
            icon: "play-circle-outline",
            screen: "OnBoarding",
            iconBg: "rgba(236,72,153,0.1)",
            iconColor: "#EC4899",
         },
      ],
   },
];

// ─── Component ──────────────────────────────────────────────────
const Profile = ({ navigation }: HomeTabScreenProps<"Profile">) => {
   const { colors, isDark } = useAppTheme();
   const logout = useAuth((state) => state.logOut);
   const { data, refetch: refetchUser } = useGetCurrentUser();
   const { data: balanceData, refetch: refetchBalance } = useBalance();
   const {
      data: certificateProgress,
      isLoading: isCertLoading,
      error: certError,
      refetch: refetchCert,
   } = useCertificateProgress();

   const [refreshing, setRefreshing] = useState(false);

   const { data: unreadData } = useGetUnreadCount();
   const unreadCount = unreadData?.count || 0;

   // Update tab bar badge when unread count changes
   useEffect(() => {
      navigation.setOptions({
         tabBarBadge: unreadCount > 0 ? (unreadCount > 99 ? "99+" : unreadCount) : undefined,
      });
   }, [unreadCount, navigation]);

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await Promise.all([refetchUser(), refetchBalance(), refetchCert()]);
      setRefreshing(false);
   }, [refetchUser, refetchBalance, refetchCert]);

   const handleLogout = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Alert.alert("Se deconnecter", "Etes-vous sur de vouloir vous deconnecter ?", [
         { text: "Annuler", style: "cancel" },
         { text: "Deconnecter", style: "destructive", onPress: logout },
      ]);
   };

   const avatarUri = data?.avatar?.url;
   const initials = `${data?.firstName?.[0] ?? ""}${data?.lastName?.[0] ?? ""}`.toUpperCase();
   const balanceFormatted = balanceData?.balance?.toLocaleString("fr-FR") ?? "0";

   const cardBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
   const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";
   const subtleBg = isDark ? "rgba(255,255,255,0.04)" : colors.background.paper;

   return (
      <SafeAreaView
         style={[styles.container, { backgroundColor: colors.background.default }]}
         edges={["top"]}
      >
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={colors.primary.main}
                  colors={[colors.primary.main]}
               />
            }
         >
            {/* ─── Profile Header ─── */}
            <Animated.View entering={FadeInDown.duration(500).springify()}>
               <LinearGradient
                  colors={
                     isDark ? ["#15803D", "#166534", "#14532D"] : ["#22C55E", "#16A34A", "#15803D"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.headerGradient}
               >
                  {/* Decorative circles */}
                  <View style={styles.decorCircle1} />
                  <View style={styles.decorCircle2} />

                  <View style={styles.headerContent}>
                     {/* Avatar */}
                     <View style={styles.avatarContainer}>
                        {avatarUri ? (
                           <Image style={styles.avatar} source={{ uri: avatarUri }} />
                        ) : (
                           <View style={[styles.avatar, styles.avatarFallback]}>
                              <Text style={styles.avatarInitials}>{initials || "?"}</Text>
                           </View>
                        )}
                        <View style={styles.onlineDot} />
                     </View>

                     {/* User Info */}
                     <View style={styles.userInfo}>
                        <Text style={styles.username} numberOfLines={1}>
                           {data?.firstName} {data?.lastName}
                        </Text>
                        <View style={styles.phoneRow}>
                           <MaterialCommunityIcons
                              name="phone-outline"
                              size={13}
                              color="rgba(255,255,255,0.7)"
                           />
                           <Text style={styles.phoneNumber}>+{data?.phoneNumber}</Text>
                        </View>
                     </View>
                  </View>

                  {/* Balance Strip */}
                  <View style={styles.balanceStrip}>
                     <View style={styles.balanceLeft}>
                        <MaterialCommunityIcons
                           name="wallet-outline"
                           size={20}
                           color="rgba(255,255,255,0.85)"
                        />
                        <Text style={styles.balanceLabel}>Solde disponible</Text>
                     </View>
                     <Text style={styles.balanceValue}>{balanceFormatted} FCFA</Text>
                  </View>
               </LinearGradient>
            </Animated.View>

            {/* ─── Quick Stats ─── */}
            <Animated.View
               entering={FadeInDown.delay(100).duration(400).springify()}
               style={styles.quickStatsRow}
            >
               <Pressable
                  style={[
                     styles.quickStatCard,
                     { backgroundColor: cardBg, borderColor: cardBorder },
                  ]}
                  onPress={() => {
                     hapticLight();
                     navigation.navigate("PastOrders" as any);
                  }}
               >
                  <View style={[styles.quickStatIcon, { backgroundColor: "rgba(59,130,246,0.1)" }]}>
                     <MaterialCommunityIcons
                        name="clipboard-list-outline"
                        size={20}
                        color="#3B82F6"
                     />
                  </View>
                  <Text style={[styles.quickStatLabel, { color: colors.text.secondary }]}>
                     Commandes
                  </Text>
                  <MaterialCommunityIcons
                     name="chevron-right"
                     size={16}
                     color={colors.text.disabled}
                  />
               </Pressable>

               <Pressable
                  style={[
                     styles.quickStatCard,
                     { backgroundColor: cardBg, borderColor: cardBorder },
                  ]}
                  onPress={() => {
                     hapticLight();
                     navigation.navigate("MyGoods" as any);
                  }}
               >
                  <View style={[styles.quickStatIcon, { backgroundColor: "rgba(34,197,94,0.1)" }]}>
                     <MaterialCommunityIcons name="cube-outline" size={20} color="#22C55E" />
                  </View>
                  <Text style={[styles.quickStatLabel, { color: colors.text.secondary }]}>
                     Marchandises
                  </Text>
                  <MaterialCommunityIcons
                     name="chevron-right"
                     size={16}
                     color={colors.text.disabled}
                  />
               </Pressable>

               <Pressable
                  style={[
                     styles.quickStatCard,
                     { backgroundColor: cardBg, borderColor: cardBorder },
                  ]}
                  onPress={() => {
                     hapticLight();
                     navigation.navigate("MyContainers" as any);
                  }}
               >
                  <View style={[styles.quickStatIcon, { backgroundColor: "rgba(245,158,11,0.1)" }]}>
                     <MaterialCommunityIcons name="truck-outline" size={20} color="#F59E0B" />
                  </View>
                  <Text style={[styles.quickStatLabel, { color: colors.text.secondary }]}>
                     Conteneurs
                  </Text>
                  <MaterialCommunityIcons
                     name="chevron-right"
                     size={16}
                     color={colors.text.disabled}
                  />
               </Pressable>

               <Pressable
                  style={[
                     styles.quickStatCard,
                     { backgroundColor: cardBg, borderColor: cardBorder },
                  ]}
                  onPress={() => {
                     hapticLight();
                     navigation.navigate("MyPaymentHistory" as any);
                  }}
               >
                  <View style={[styles.quickStatIcon, { backgroundColor: "rgba(16,185,129,0.1)" }]}>
                     <MaterialCommunityIcons
                        name="receipt-text-outline"
                        size={20}
                        color="#10B981"
                     />
                  </View>
                  <Text style={[styles.quickStatLabel, { color: colors.text.secondary }]}>
                     Paiements
                  </Text>
                  <MaterialCommunityIcons
                     name="chevron-right"
                     size={16}
                     color={colors.text.disabled}
                  />
               </Pressable>

               <Pressable
                  style={[
                     styles.quickStatCard,
                     { backgroundColor: cardBg, borderColor: cardBorder },
                  ]}
                  onPress={() => {
                     hapticLight();
                     navigation.navigate("TicketList" as any);
                  }}
               >
                  <View style={[styles.quickStatIcon, { backgroundColor: "rgba(59,130,246,0.1)" }]}>
                     <MaterialCommunityIcons name="headset" size={20} color="#3B82F6" />
                  </View>
                  <Text style={[styles.quickStatLabel, { color: colors.text.secondary }]}>
                     Support
                  </Text>
                  <MaterialCommunityIcons
                     name="chevron-right"
                     size={16}
                     color={colors.text.disabled}
                  />
               </Pressable>
            </Animated.View>

            {/* ─── Charts Section ─── */}
            <ProfileChartsSection />

            {/* ─── Achievements Section ─── */}
            <Animated.View entering={FadeInDown.delay(200).duration(400).springify()}>
               <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons
                     name="trophy-outline"
                     size={18}
                     color={colors.primary.main}
                  />
                  <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                     Réalisations
                  </Text>
               </View>
               <View
                  style={[
                     styles.achievementsCard,
                     { backgroundColor: cardBg, borderColor: cardBorder },
                  ]}
               >
                  <CertifiedShipperCard
                     progress={certificateProgress}
                     isLoading={isCertLoading}
                     error={certError}
                     onRetry={refetchCert}
                  />
                  <MilestoneBadges />
                  <BadgesSection />
                  <ReviewsSection />
               </View>
            </Animated.View>

            {/* ─── Settings Menu ─── */}
            <Animated.View entering={FadeInDown.delay(300).duration(400).springify()}>
               <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons
                     name="cog-outline"
                     size={18}
                     color={colors.primary.main}
                  />
                  <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                     Paramètres
                  </Text>
               </View>

               {/* Theme Toggle */}
               <View
                  style={[styles.menuCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
               >
                  <ThemeToggle variant="menu" />
               </View>

               {/* Menu Sections */}
               {MENU_SECTIONS.map((section) => (
                  <View key={section.title} style={styles.menuGroup}>
                     <Text style={[styles.menuGroupTitle, { color: colors.text.secondary }]}>
                        {section.title}
                     </Text>
                     <View
                        style={[
                           styles.menuCard,
                           { backgroundColor: cardBg, borderColor: cardBorder },
                        ]}
                     >
                        {section.items.map((item, index) => (
                           <React.Fragment key={item.title}>
                              {index > 0 && (
                                 <View
                                    style={[styles.menuDivider, { backgroundColor: cardBorder }]}
                                 />
                              )}
                              <Pressable
                                 style={({ pressed }) => [
                                    styles.menuItem,
                                    pressed && styles.menuItemPressed,
                                    pressed && {
                                       backgroundColor: isDark
                                          ? "rgba(255,255,255,0.03)"
                                          : "rgba(0,0,0,0.02)",
                                    },
                                 ]}
                                 onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    navigation.navigate(item.screen as any);
                                 }}
                              >
                                 <View
                                    style={[
                                       styles.menuIconCircle,
                                       { backgroundColor: item.iconBg },
                                    ]}
                                 >
                                    <MaterialCommunityIcons
                                       name={item.icon as any}
                                       size={20}
                                       color={item.iconColor}
                                    />
                                 </View>
                                 <View style={styles.menuTextCol}>
                                    <Text
                                       style={[
                                          styles.menuItemTitle,
                                          { color: colors.text.primary },
                                       ]}
                                    >
                                       {item.title}
                                    </Text>
                                    <Text
                                       style={[
                                          styles.menuItemSubtitle,
                                          { color: colors.text.secondary },
                                       ]}
                                    >
                                       {item.subtitle}
                                    </Text>
                                 </View>
                                 <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={20}
                                    color={colors.text.disabled}
                                 />
                              </Pressable>
                           </React.Fragment>
                        ))}
                     </View>
                  </View>
               ))}
            </Animated.View>

            {/* ─── Logout ─── */}
            <Animated.View entering={FadeInDown.delay(400).duration(400).springify()}>
               <Pressable
                  style={({ pressed }) => [
                     styles.logoutButton,
                     { backgroundColor: isDark ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.06)" },
                     pressed && styles.logoutPressed,
                  ]}
                  onPress={handleLogout}
               >
                  <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
                  <Text style={styles.logoutText}>Se deconnecter</Text>
               </Pressable>
            </Animated.View>

            {/* ─── Footer ─── */}
            <Animated.View entering={FadeIn.delay(500).duration(500)} style={styles.footer}>
               <SocialMedia color={isDark ? "rgba(255,255,255,0.5)" : colors.text.disabled} />
               <Text style={[styles.versionText, { color: colors.text.disabled }]}>
                  v{Constants.expoConfig?.version}
               </Text>
               <View style={[styles.footerDivider, { backgroundColor: cardBorder }]} />
               <Text style={[styles.madeWithLove, { color: colors.text.disabled }]}>
                  Made with love by nuvotech.tech team
               </Text>
               <Text style={[styles.madeWithLoveDetail, { color: colors.text.disabled }]}>
                  Nanjing - Paris | +8617865673053(whatsapp)
               </Text>
            </Animated.View>
         </ScrollView>
      </SafeAreaView>
   );
};

// ─── Styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   scrollContent: {
      paddingBottom: 40,
   },

   /* ── Header Gradient ── */
   headerGradient: {
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 20,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      overflow: "hidden",
   },
   decorCircle1: {
      position: "absolute",
      top: -30,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "rgba(255,255,255,0.08)",
   },
   decorCircle2: {
      position: "absolute",
      bottom: -20,
      left: -20,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(255,255,255,0.05)",
   },
   headerContent: {
      flexDirection: "row",
      alignItems: "center",
   },
   avatarContainer: {
      position: "relative",
   },
   avatar: {
      width: 68,
      height: 68,
      borderRadius: 22,
      borderWidth: 3,
      borderColor: "rgba(255,255,255,0.25)",
   },
   avatarFallback: {
      backgroundColor: "rgba(255,255,255,0.2)",
      justifyContent: "center",
      alignItems: "center",
   },
   avatarInitials: {
      color: "#FFF",
      fontFamily: Fonts.bold,
      fontSize: 22,
   },
   onlineDot: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: "#4ADE80",
      borderWidth: 2.5,
      borderColor: "#15803D",
   },
   userInfo: {
      marginLeft: 16,
      flex: 1,
   },
   username: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: "#FFF",
      letterSpacing: -0.3,
   },
   phoneRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 4,
   },
   phoneNumber: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: "rgba(255,255,255,0.7)",
   },

   /* ── Balance Strip ── */
   balanceStrip: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.12)",
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginTop: 18,
   },
   balanceLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
   },
   balanceLabel: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: "rgba(255,255,255,0.75)",
   },
   balanceValue: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: "#FFF",
      letterSpacing: -0.3,
   },

   /* ── Quick Stats ── */
   quickStatsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingHorizontal: 16,
      gap: 10,
      marginTop: 16,
   },
   quickStatCard: {
      width: "31%",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 8,
      borderRadius: 16,
      borderWidth: 1,
      gap: 8,
      ...Platform.select({
         ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
         },
         android: { elevation: 1 },
      }),
   },
   quickStatIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
   },
   quickStatLabel: {
      fontSize: 11,
      fontFamily: Fonts.medium,
      textAlign: "center",
   },

   /* ── Section Headers ── */
   sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 20,
      marginTop: 28,
      marginBottom: 12,
   },
   sectionTitle: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      letterSpacing: -0.2,
   },

   /* ── Achievements Card ── */
   achievementsCard: {
      marginHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      overflow: "hidden",
      ...Platform.select({
         ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
         },
         android: { elevation: 1 },
      }),
   },

   /* ── Menu ── */
   menuGroup: {
      marginTop: 12,
   },
   menuGroupTitle: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      paddingHorizontal: 20,
      marginBottom: 8,
   },
   menuCard: {
      marginHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      overflow: "hidden",
      ...Platform.select({
         ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 6,
         },
         android: { elevation: 1 },
      }),
   },
   menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
      gap: 14,
   },
   menuItemPressed: {
      opacity: 0.7,
   },
   menuIconCircle: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
   },
   menuTextCol: {
      flex: 1,
   },
   menuItemTitle: {
      fontSize: 15,
      fontFamily: Fonts.medium,
   },
   menuItemSubtitle: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      marginTop: 1,
   },
   menuDivider: {
      height: StyleSheet.hairlineWidth,
      marginLeft: 70,
   },

   /* ── Logout ── */
   logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginHorizontal: 16,
      marginTop: 24,
      paddingVertical: 15,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(239,68,68,0.15)",
   },
   logoutPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
   },
   logoutText: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: "#EF4444",
   },

   /* ── Footer ── */
   footer: {
      alignItems: "center",
      marginTop: 32,
      paddingHorizontal: 32,
      paddingBottom: 16,
   },
   versionText: {
      fontFamily: Fonts.medium,
      fontSize: 12,
      marginTop: -20,
   },
   footerDivider: {
      width: 40,
      height: StyleSheet.hairlineWidth,
      marginVertical: 12,
   },
   madeWithLove: {
      fontFamily: Fonts.medium,
      fontSize: 11,
      textAlign: "center",
   },
   madeWithLoveDetail: {
      fontFamily: Fonts.regular,
      fontSize: 10,
      marginTop: 3,
      textAlign: "center",
      opacity: 0.7,
   },
});

export default withProtectedRoute(Profile);
