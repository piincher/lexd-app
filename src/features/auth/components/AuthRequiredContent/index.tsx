import React, { useCallback } from "react";
import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import { Title, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import Animated, {
   FadeIn,
   FadeInUp,
   FadeInDown,
   interpolate,
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withTiming,
} from "react-native-reanimated";

import { IMAGES } from "@src/constants/Images";
import { Fonts } from "@src/constants/Fonts";
import AppButton from "@src/components/AppButton/AppButton";
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AuthRequiredContentProps {
   onLoginPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AuthRequiredContent: React.FC<AuthRequiredContentProps> = ({ onLoginPress }) => {
   const navigation = useNavigation();
   const { colors, isDark } = useAppTheme();

   // Animation values
   const pulseValue = useSharedValue(0);

   React.useEffect(() => {
      pulseValue.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
   }, []);

   const pulseStyle = useAnimatedStyle(() => ({
      transform: [
         {
            scale: interpolate(pulseValue.value, [0, 1], [1, 1.05]),
         },
      ],
      opacity: interpolate(pulseValue.value, [0, 1], [0.8, 1]),
   }));

   const handleLogin = useCallback(() => {
      if (onLoginPress) {
         onLoginPress();
      } else {
         navigation.navigate("Login" as never);
      }
   }, [onLoginPress, navigation]);

   const openURL = useCallback((url: string) => {
      WebBrowser.openBrowserAsync(url);
   }, []);

   const handlePhonePress = useCallback(() => {
      Linking.openURL("tel:+8617865673053");
   }, []);

   const handleWebsitePress = useCallback(() => {
      Linking.openURL("https://nuvotech.tech");
   }, []);

   return (
      <View style={[styles.container, { backgroundColor: colors.background.default }]}>
         {/* Background decorative elements */}
         <View style={styles.backgroundGradient}>
            <View style={[styles.circle1, { backgroundColor: colors.primary.light + "20" }]} />
            <View style={[styles.circle2, { backgroundColor: colors.accent.goldLight + "15" }]} />
         </View>

         {/* Main Content */}
         <View style={styles.content}>
            {/* Logo Section with pulse animation */}
            <Animated.View entering={FadeInDown.duration(600).springify()}>
               <Animated.View style={[styles.logoContainer, pulseStyle]}>
                  <View
                     style={[
                        styles.logoWrapper,
                        {
                           backgroundColor: colors.background.card,
                           shadowColor: colors.primary.main,
                        },
                     ]}
                  >
                     <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
                  </View>
               </Animated.View>
            </Animated.View>

            {/* Text Content */}
            <Animated.View
               entering={FadeInUp.duration(600).delay(200).springify()}
               style={styles.textContainer}
            >
               <Title style={[styles.title, { color: colors.text.primary }]}>
                  Connectez-vous pour continuer
               </Title>

               <Text variant="bodyMedium" style={[styles.subtitle, { color: colors.text.secondary }]}>
                  Accédez à toutes vos commandes, suivez vos marchandises et restez informé en temps
                  réel.
               </Text>
            </Animated.View>

            {/* Features List */}
            <Animated.View
               entering={FadeInUp.duration(600).delay(400).springify()}
               style={styles.featuresContainer}
            >
               <FeatureItem icon="📦" text="Suivi de marchandises" />
               <FeatureItem icon="🚢" text="Containers en temps réel" />
               <FeatureItem icon="🔔" text="Notifications instantanées" />
            </Animated.View>

            {/* Login Button */}
            <Animated.View
               entering={FadeInUp.duration(600).delay(600).springify()}
               style={styles.buttonContainer}
            >
               <AppButton title="Se connecter" onPress={handleLogin} style={styles.loginButton} />
            </Animated.View>

            {/* Terms Footer */}
            <Animated.View entering={FadeIn.duration(800).delay(800)} style={styles.termsContainer}>
               <Text variant="bodySmall" style={[styles.termsText, { color: colors.text.disabled }]}>
                  En vous connectant, vous acceptez nos{" "}
                  <Text
                     style={[styles.link, { color: colors.primary.main }]}
                     onPress={() => openURL("https://www.chinalinkexpress.com/en/terms")}
                  >
                     conditions d'utilisation
                  </Text>{" "}
                  et notre{" "}
                  <Text
                     style={[styles.link, { color: colors.primary.main }]}
                     onPress={() =>
                        openURL(
                           "https://www.freeprivacypolicy.com/live/0bd3fa39-d9c1-41d0-8073-5800d4d7c40d",
                        )
                     }
                  >
                     politique de confidentialité
                  </Text>
               </Text>
            </Animated.View>
         </View>

         {/* Bottom Footer - Nuvotech */}
         <Animated.View entering={FadeIn.duration(800).delay(1000)} style={styles.nuvotechFooter}>
            <View style={styles.footerDivider} />
            <View style={styles.footerContent}>
               <Text style={[styles.madeWith, { color: colors.text.disabled }]}>
                  Made with <Text style={styles.heart}>❤️</Text> by{" "}
                  <Text
                     style={[styles.companyLink, { color: colors.primary.main }]}
                     onPress={handleWebsitePress}
                  >
                     nuvotech.tech
                  </Text>
               </Text>
               <View style={styles.locationRow}>
                  <Text style={[styles.locationText, { color: colors.text.disabled }]}>
                     Paris · Nanjing
                  </Text>
                  <Text style={[styles.divider, { color: colors.text.disabled }]}>|</Text>
                  <AnimatedPressable onPress={handlePhonePress}>
                     <Text style={[styles.phoneText, { color: colors.primary.main }]}>
                        +86 178 6567 3053
                     </Text>
                  </AnimatedPressable>
               </View>
            </View>
         </Animated.View>
      </View>
   );
};

// Feature Item Component
interface FeatureItemProps {
   icon: string;
   text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.featureItem}>
         <Text style={styles.featureIcon}>{icon}</Text>
         <Text style={[styles.featureText, { color: colors.text.secondary }]}>{text}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      position: "relative",
   },
   backgroundGradient: {
      ...StyleSheet.absoluteFillObject,
      overflow: "hidden",
   },
   circle1: {
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: 150,
      top: -100,
      right: -100,
   },
   circle2: {
      position: "absolute",
      width: 250,
      height: 250,
      borderRadius: 125,
      bottom: 100,
      left: -80,
   },
   content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 20,
      justifyContent: "center",
      alignItems: "center",
   },
   logoContainer: {
      marginBottom: 32,
   },
   logoWrapper: {
      width: 140,
      height: 140,
      borderRadius: 70,
      justifyContent: "center",
      alignItems: "center",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
   },
   logo: {
      width: 100,
      height: 100,
   },
   textContainer: {
      alignItems: "center",
      marginBottom: 32,
   },
   title: {
      fontFamily: Fonts.bold,
      fontSize: 28,
      textAlign: "center",
      marginBottom: 12,
      lineHeight: 36,
   },
   subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 16,
      textAlign: "center",
      lineHeight: 24,
      paddingHorizontal: 20,
   },
   featuresContainer: {
      width: "100%",
      marginBottom: 40,
      gap: 12,
   },
   featureItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
   },
   featureIcon: {
      fontSize: 18,
   },
   featureText: {
      fontFamily: Fonts.medium,
      fontSize: 14,
   },
   buttonContainer: {
      width: "100%",
      marginBottom: 24,
   },
   loginButton: {
      width: "100%",
      maxWidth: 320,
   },
   termsContainer: {
      paddingHorizontal: 20,
   },
   termsText: {
      fontSize: 12,
      textAlign: "center",
      lineHeight: 18,
   },
   link: {
      fontFamily: Fonts.medium,
   },
   nuvotechFooter: {
      paddingHorizontal: 24,
      paddingBottom: 24,
      paddingTop: 16,
   },
   footerDivider: {
      height: 1,
      backgroundColor: "rgba(128, 128, 128, 0.2)",
      marginBottom: 16,
   },
   footerContent: {
      alignItems: "center",
      gap: 6,
   },
   madeWith: {
      fontSize: 13,
      fontFamily: Fonts.regular,
   },
   heart: {
      fontSize: 12,
   },
   companyLink: {
      fontFamily: Fonts.medium,
   },
   locationRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
   },
   locationText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
   },
   divider: {
      fontSize: 12,
   },
   phoneText: {
      fontSize: 12,
      fontFamily: Fonts.medium,
   },
});

export default AuthRequiredContent;
