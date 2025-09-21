// Profile.tsx
import SocialMedia from "@src/components/SocialMedia/SocialMedia";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import withProtectedRoute from "@src/hoc/protected";
import { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { MotiText, MotiView } from "moti";
import React, { useCallback } from "react";
import {
   Image,
   ScrollView,
   StyleSheet,
   View,
   useWindowDimensions,
   Text,
   TouchableOpacity,
   Alert,
} from "react-native";
import { Divider, List } from "react-native-paper";
import Animated, {
   Extrapolate,
   FadeIn,
   FadeOut,
   interpolate,
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withTiming,
} from "react-native-reanimated";
import { useGetCurrentUser } from "../hooks/useProfile";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useBalance } from "../hooks/useProfile";

const AnimatedList = Animated.createAnimatedComponent(List.Item);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const FloatingParticle = ({ index }: { index: number }) => {
   const translateX = useSharedValue(Math.random() * 100 - 50);
   const translateY = useSharedValue(Math.random() * 100 - 50);

   translateX.value = withRepeat(
      withTiming(Math.random() * 200 - 100, { duration: 3000 + Math.random() * 3000 }),
      -1,
      true
   );

   translateY.value = withRepeat(
      withTiming(Math.random() * 200 - 100, { duration: 3000 + Math.random() * 3000 }),
      -1,
      true
   );

   const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
   }));

   return (
      <Animated.View
         style={[
            styles.particle,
            animatedStyle,
            {
               backgroundColor: `rgba(255,255,255,${0.1 + Math.random() * 0.1})`,
               width: 10 + Math.random() * 10,
               height: 10 + Math.random() * 10,
            },
         ]}
      />
   );
};

const Profile = ({ navigation }: HomeTabScreenProps<"Profile">) => {
   const logout = useAuth((state) => state.logOut);
   const { data } = useGetCurrentUser();
   const { data: balanceData } = useBalance();
   const { width } = useWindowDimensions();

   console.log("User Data: ", data?.rewardPoints);
   const copyToClipboard = async () => {
      if (!data?.referralCode) return;
      await Clipboard.setStringAsync(data.referralCode);
      Alert.alert("Success", "Referral code copied to clipboard!");
   };

   const animateHeader = useCallback(
      (index: number) => ({
         from: { opacity: 0, translateY: 50 },
         animate: { opacity: 1, translateY: 0 },
         transition: { type: "spring", delay: index * 100 },
      }),
      []
   );

   const statsAnimation = useCallback(
      (index: number) => ({
         from: { opacity: 0, translateY: 20 },
         animate: { opacity: 1, translateY: 0 },
         transition: { type: "spring", delay: 200 + index * 100 },
      }),
      []
   );

   const listItemAnimation = useCallback(
      (index: number) => ({
         from: { opacity: 0, translateX: 50 },
         animate: { opacity: 1, translateX: 0 },
         transition: { type: "spring", delay: 300 + index * 100 },
      }),
      []
   );

   return (
      <LinearGradient colors={["#1a237e", "#4a148c", "#880e4f"]} style={StyleSheet.absoluteFill}>
         {Array.from({ length: 15 }).map((_, i) => (
            <FloatingParticle key={i} index={i} />
         ))}

         <BlurView intensity={30} style={StyleSheet.absoluteFill}>
            <AnimatedScrollView entering={FadeIn.duration(500)} style={{ flex: 1, padding: 10 }}>
               <View style={styles.header}>
                  <Animated.View style={styles.avatarContainer}>
                     <MotiView
                        from={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring" }}
                     >
                        <Image
                           style={styles.avatar}
                           source={{
                              uri: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ChinaLink%20Express%20(1024%20x%201024%20px)%20(1).png",
                           }}
                        />
                     </MotiView>
                  </Animated.View>

                  <View style={styles.userInfo}>
                     <MotiText {...animateHeader(0)} style={styles.username}>
                        {data?.firstName} {data?.lastName}
                     </MotiText>
                     <MotiText {...animateHeader(1)} style={styles.phoneNumber}>
                        +{data?.phoneNumber}
                     </MotiText>
                  </View>
               </View>

               <View style={styles.statsContainer}>
                  <MotiView {...statsAnimation(0)} style={styles.statCard}>
                     <View style={styles.statRow}>
                        <MaterialIcons name="account-balance-wallet" size={28} color="#4CAF50" />
                        <View style={styles.statText}>
                           <Text style={styles.statLabel}></Text>
                           <Text style={styles.statValue}>{balanceData?.balance} FCFA</Text>
                        </View>
                        <TouchableOpacity
                           style={[styles.actionButton, styles.topUpButton]}
                           onPress={() => navigation.navigate("TopUp")}
                        >
                           <Text style={styles.buttonText}>Top Up</Text>
                        </TouchableOpacity>
                     </View>
                  </MotiView>

                  {/* <MotiView {...statsAnimation(1)} style={styles.statCard}>
                     <View style={styles.statRow}>
                        <MaterialIcons name="card-giftcard" size={28} color="#FF9800" />
                        <View style={styles.statText}>
                           <Text style={styles.statLabel}>Reward Points</Text>
                           <Text style={styles.statValue}>
                              {data?.rewardPoints?.toLocaleString()}
                           </Text>
                        </View>
                        <TouchableOpacity
                           style={[styles.actionButton, styles.redeemButton]}
                           onPress={() => navigation.navigate("Rewards")}
                        >
                           <Text style={styles.buttonText}>Redeem</Text>
                        </TouchableOpacity>
                     </View>
                  </MotiView>

                  <MotiView {...statsAnimation(2)} style={styles.referralCard}>
                     <Text style={styles.referralTitle}>Your Referral Code</Text>
                     <TouchableOpacity onPress={copyToClipboard}>
                        <LinearGradient
                           colors={["rgba(124,77,255,0.3)", "rgba(63,81,181,0.3)"]}
                           style={styles.referralCodeContainer}
                        >
                           <Text style={styles.referralCode}>{data?.referralCode || "----"}</Text>
                           <MaterialIcons
                              name="content-copy"
                              size={20}
                              color="rgba(255,255,255,0.8)"
                           />
                        </LinearGradient>
                     </TouchableOpacity>
                     <Text style={styles.referralHint}>Share your code to earn bonus points!</Text>
                  </MotiView> */}
               </View>

               <Divider style={styles.divider} />

               <List.Section style={styles.section}>
                  {[
                     { title: "Historique des commandes", icon: "history", screen: "PastOrders" },
                     {
                        title: "Historique des recharges",
                        icon: "bank-transfer",
                        screen: "TopUpHistory",
                     },
                     {
                        title: "Centre d'assistance",
                        icon: "headset",
                        screen: "SelectAdminToChatWith",
                     },
                     { title: "À propos de ChinaLink", icon: "info", screen: "AboutUs" },
                     { title: "Se déconnecter", icon: "logout", action: logout },
                  ].map((item, index) => (
                     <MotiView key={item.title} {...listItemAnimation(index)}>
                        <AnimatedList
                           title={item.title}
                           left={() => <List.Icon icon={item.icon as any} color={COLORS.white} />}
                           onPress={() =>
                              item.screen
                                 ? navigation.navigate(item.screen as any)
                                 : item.action?.()
                           }
                           style={styles.listItem}
                           titleStyle={styles.titleStyle}
                           right={() =>
                              item.screen && <List.Icon icon="chevron-right" color={COLORS.white} />
                           }
                           entering={FadeIn.delay(500 + index * 100)}
                           exiting={FadeOut}
                        />
                     </MotiView>
                  ))}
               </List.Section>

               <View style={styles.footer}>
                  <SocialMedia color="#FFF" />
                  <MotiText
                     from={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 1000 }}
                     style={styles.versionText}
                  >
                     App version: {Constants.expoConfig?.version}
                  </MotiText>
               </View>
            </AnimatedScrollView>
         </BlurView>
      </LinearGradient>
   );
};

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      margin: 16,
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 20,
      overflow: "hidden",
   },
   avatarContainer: {
      shadowColor: COLORS.white,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
   },
   avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.2)",
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
      color: "rgba(255,255,255,0.8)",
   },
   statsContainer: {
      paddingHorizontal: 16,
   },
   statCard: {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
   },
   statRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
   },
   statText: {
      flex: 1,
   },
   statLabel: {
      color: "rgba(255,255,255,0.8)",
      fontFamily: Fonts.meduim,
      fontSize: 12,
   },
   statValue: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 20,
      marginTop: 4,
   },
   actionButton: {
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
   },
   topUpButton: {
      backgroundColor: "#4CAF50",
   },
   redeemButton: {
      backgroundColor: "#FF9800",
   },
   buttonText: {
      color: COLORS.white,
      fontFamily: Fonts.black,
      fontSize: 14,
   },
   referralCard: {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 16,
      padding: 16,
      marginTop: 8,
   },
   referralTitle: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 16,
      marginBottom: 8,
   },
   referralCodeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 12,
      borderRadius: 8,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
   },
   referralCode: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 18,
      letterSpacing: 2,
   },
   referralHint: {
      color: "rgba(255,255,255,0.7)",
      fontFamily: Fonts.meduim,
      fontSize: 12,
      marginTop: 8,
      textAlign: "center",
   },
   divider: {
      marginVertical: 24,
      marginHorizontal: 16,
      backgroundColor: "rgba(255,255,255,0.2)",
   },
   section: {
      marginBottom: 24,
   },
   listItem: {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 8,
      paddingVertical: 12,
   },
   titleStyle: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 16,
   },
   footer: {
      marginTop: 32,
      paddingHorizontal: 16,
      alignItems: "center",
   },
   versionText: {
      color: "rgba(255,255,255,0.6)",
      fontFamily: Fonts.meduim,
      fontSize: 12,
      top: -20,
   },
   particle: {
      position: "absolute",
      borderRadius: 50,
      opacity: 0.7,
   },
});

export default withProtectedRoute(Profile);
