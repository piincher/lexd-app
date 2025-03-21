// Profile.tsx
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { HomeTabScreenProps } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import React, { useCallback } from "react";
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Divider, List, Text, Title } from "react-native-paper";
import { useGetCurrentUser } from "../hooks/useProfile";
import SocialMedia from "@src/components/SocialMedia/SocialMedia";
import Constants from "expo-constants";
import { MotiView, MotiText } from "moti";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
   Extrapolate,
   FadeIn,
   FadeOut,
   interpolate,
   useAnimatedGestureHandler,
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withSequence,
   withSpring,
   withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

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
   const { width } = useWindowDimensions();

   // Avatar Drag Animation
   const translateX = useSharedValue(0);
   const translateY = useSharedValue(0);

   const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
         ctx.startX = translateX.value;
         ctx.startY = translateY.value;
      },
      onActive: (event, ctx) => {
         translateX.value = ctx.startX + event.translationX;
         translateY.value = ctx.startY + event.translationY;
      },
      onEnd: () => {
         translateX.value = withSpring(0);
         translateY.value = withSpring(0);
      },
   });

   const animatedAvatarStyle = useAnimatedStyle(() => ({
      transform: [
         { translateX: translateX.value },
         { translateY: translateY.value },
         {
            scale: interpolate(translateY.value, [-100, 0, 100], [0.9, 1, 0.9], Extrapolate.CLAMP),
         },
      ],
   }));

   const animateHeader = useCallback(
      (index: number) => ({
         from: { opacity: 0, translateY: 50 },
         animate: { opacity: 1, translateY: 0 },
         transition: { type: "spring", delay: index * 100 },
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
                  <PanGestureHandler onGestureEvent={gestureHandler}>
                     <Animated.View style={[animatedAvatarStyle, styles.avatarContainer]}>
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
                  </PanGestureHandler>

                  <View>
                     <MotiText {...animateHeader(0)} style={styles.username}>
                        {data?.firstName} {data?.lastName}
                     </MotiText>
                     <MotiText {...animateHeader(1)} style={styles.username}>
                        +{data?.phoneNumber}
                     </MotiText>
                  </View>
               </View>

               <Divider />

               <List.Section style={styles.section}>
                  {[
                     { title: "Mes anciens commandes", icon: "shopping", screen: "PastOrders" },
                     {
                        title: "A propos de ChinaLink Express",
                        icon: "alpha-i-circle-outline",
                        screen: "AboutUs",
                     },
                     { title: "Se Déconnecter", icon: "logout", action: logout },
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

               <View style={{ marginTop: "40%", padding: 10 }}>
                  <SocialMedia color="#FFF" />
               </View>

               <MotiText
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1000 }}
                  style={{
                     textAlign: "center",
                     fontFamily: Fonts.black,
                     marginBottom: 20,
                     color: COLORS.white,
                  }}
               >
                  App version: {Constants.expoConfig?.version}
               </MotiText>
            </AnimatedScrollView>
         </BlurView>
      </LinearGradient>
   );
};

const styles = StyleSheet.create({
   header: {
      alignItems: "flex-start",
      paddingTop: 40,
      paddingBottom: 20,
      marginLeft: 20,
      flexDirection: "row",
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 20,
      padding: 20,
      margin: 20,
      overflow: "hidden",
   },
   avatarContainer: {
      shadowColor: COLORS.white,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
   },
   avatar: {
      backgroundColor: COLORS.redShade,
      height: 100,
      width: 100,
      borderRadius: 50,
      borderWidth: 0.5,
      borderColor: COLORS.white,
   },
   username: {
      marginTop: 10,
      fontSize: 18,
      marginLeft: 20,
      fontFamily: Fonts.boldItalic,
      color: COLORS.white,
      textShadowColor: "rgba(0, 0, 0, 0.3)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
   },
   section: {
      marginTop: 30,
   },
   titleStyle: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: COLORS.white,
   },
   listItem: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: "rgba(255,255,255,0.1)",
      marginHorizontal: 20,
      borderRadius: 15,
      marginVertical: 8,
      shadowColor: COLORS.white,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
   },
   particle: {
      position: "absolute",
      borderRadius: 50,
      opacity: 0.7,
   },
});

export default Profile;
