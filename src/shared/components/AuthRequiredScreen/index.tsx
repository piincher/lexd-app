/**
 * AuthRequiredScreen Component
 * UI shown when user is not authenticated
 */

import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { IMAGES } from "@src/constants/Images";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Button } from "@src/shared/ui/Button";

export interface AuthRequiredScreenProps {
   onLoginPress: () => void;
   onTermsPress?: () => void;
   onPrivacyPress?: () => void;
}

export const AuthRequiredScreen: React.FC<AuthRequiredScreenProps> = ({
   onLoginPress,
   onTermsPress,
   onPrivacyPress,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={[styles.container, { backgroundColor: colors.background.default }]}>
         {/* Decorative Circles */}
         <View style={[styles.decorCircle1, { backgroundColor: colors.primary[50] }]} />
         <View style={[styles.decorCircle2, { backgroundColor: colors.primary[100] }]} />

         {/* Main Content */}
         <Animated.View entering={FadeIn.duration(500)} style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
               <Image
                  source={IMAGES.flat_logo}
                  style={[styles.logo, { tintColor: colors.primary.main }]}
                  resizeMode="contain"
               />
            </View>

            {/* Title & Subtitle */}
            <View style={styles.textContainer}>
               <Text style={[styles.title, { color: colors.text.primary }]}>
                  Connectez vous pour continuer
               </Text>
               <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                  Pour utiliser l&apos;application, vous devez vous connecter
               </Text>
            </View>

            {/* Login Button */}
            <View style={styles.buttonContainer}>
               <Button
                  title="LOGIN"
                  onPress={onLoginPress}
                  variant="primary"
                  size="large"
                  fullWidth
                  testID="auth-required-login-button"
                  accessibilityLabel="Se connecter"
                  accessibilityHint="Appuyez pour vous connecter à votre compte"
               />
            </View>
         </Animated.View>

         {/* Footer with T&Cs */}
         <Animated.View entering={FadeIn.duration(500).delay(200)} style={styles.footer}>
            <Text style={[styles.termsText, { color: colors.text.secondary }]}>
               En vous connectant, vous acceptez nos{" "}
               <Pressable onPress={onTermsPress} testID="terms-link">
                  <Text style={[styles.link, { color: colors.accent.gold }]}>
                     conditions d&apos;utilisation
                  </Text>
               </Pressable>{" "}
               et notre{" "}
               <Pressable onPress={onPrivacyPress} testID="privacy-link">
                  <Text style={[styles.link, { color: colors.accent.gold }]}>
                     politique de confidentialité
                  </Text>
               </Pressable>
            </Text>
            <Text style={[styles.brandText, { color: colors.primary.main }]}>
               CHINALINK EXPRESS
            </Text>
            <Text style={[styles.creditText, { color: colors.text.secondary }]}>
               Made with ❤️ in Paris-China by www.nuvotech.tech team +86-178-65-67-30-53
            </Text>
         </Animated.View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
      overflow: "hidden",
   },
   decorCircle1: {
      position: "absolute",
      top: -100,
      right: -100,
      width: 250,
      height: 250,
      borderRadius: 125,
      opacity: 0.5,
   },
   decorCircle2: {
      position: "absolute",
      bottom: -80,
      left: -80,
      width: 200,
      height: 200,
      borderRadius: 100,
      opacity: 0.4,
   },
   content: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 16,
   },
   logoContainer: {
      marginBottom: 40,
      alignItems: "center",
   },
   logo: {
      width: 180,
      height: 50,
   },
   textContainer: {
      alignItems: "center",
      marginBottom: 40,
   },
   title: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      textAlign: "center",
      marginBottom: 12,
      letterSpacing: -0.5,
   },
   subtitle: {
      fontSize: 15,
      fontFamily: Fonts.regular,
      textAlign: "center",
      lineHeight: 22,
      paddingHorizontal: 20,
   },
   buttonContainer: {
      width: "100%",
      marginTop: 8,
   },
   footer: {
      position: "absolute",
      bottom: 32,
      left: 24,
      right: 24,
      alignItems: "center",
   },
   termsText: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      textAlign: "center",
      lineHeight: 18,
   },
   link: {
      fontSize: 11,
      fontFamily: Fonts.medium,
      textDecorationLine: "underline",
   },
   brandText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      letterSpacing: 2,
      marginTop: 16,
   },
   creditText: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      textAlign: "center",
      lineHeight: 16,
      marginTop: 8,
   },
});

export default AuthRequiredScreen;
