import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Button } from "@src/shared/ui/Button";
import { hapticLight } from "@src/shared/lib/haptics";
import { createAuthRequiredStyles } from "./AuthRequiredScreen.styles";

export interface AuthRequiredScreenProps {
   onLoginPress: () => void;
   onTermsPress?: () => void;
   onPrivacyPress?: () => void;
}

const HERO_TITLE = "Connectez-vous\npour continuer";
const HERO_SUBTITLE =
   "Votre profil, vos colis et vos documents restent protégés jusqu'à votre connexion.";
const SECURITY_NOTE = "Connexion requise avant d'afficher vos informations personnelles.";
const TERMS_COPY = "En continuant, vous acceptez les règles de confidentialité du service.";
const CREDIT_COPY = "Made with ❤️by nuvotech team Paris-Chine  +86-178-6567-3053";

export const AuthRequiredScreen: React.FC<AuthRequiredScreenProps> = ({
   onLoginPress,
   onTermsPress,
   onPrivacyPress,
}) => {
   const { colors } = useAppTheme();
   const styles = React.useMemo(() => createAuthRequiredStyles(colors), [colors]);
   const handleTermsPress = React.useCallback(() => {
      if (!onTermsPress) return;
      hapticLight();
      onTermsPress();
   }, [onTermsPress]);
   const handlePrivacyPress = React.useCallback(() => {
      if (!onPrivacyPress) return;
      hapticLight();
      onPrivacyPress();
   }, [onPrivacyPress]);

   return (
      <SafeAreaView edges={["top"]} style={styles.container}>
         <View pointerEvents="none" style={styles.backgroundLayer}>
            <View style={styles.topBlock} />
            <View style={styles.bottomBlock} />
            <View style={styles.accentRule} />
         </View>

         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            <Animated.View entering={FadeIn.duration(360)} style={styles.content}>
               <View style={styles.brandRow}>
                  <View style={styles.brandMark}>
                     <MaterialCommunityIcons
                        name="package-variant-closed-check"
                        size={26}
                        color={colors.text.inverse}
                     />
                  </View>
                  <View style={styles.brandCopy}>
                     <Text style={styles.brandTitle}>LEXD</Text>
                     <Text style={styles.brandSubtitle}>Espace sécurisé</Text>
                  </View>
               </View>

               <View style={styles.statusPanel}>
                  <MaterialCommunityIcons
                     name="shield-lock-outline"
                     size={20}
                     color={colors.primary.main}
                  />
                  <Text style={styles.statusText}>Profil protégé</Text>
               </View>

               <View style={styles.heroBlock}>
                  <Text style={styles.title}>{HERO_TITLE}</Text>
                  <Text style={styles.subtitle}>{HERO_SUBTITLE}</Text>
               </View>

               <View style={styles.actionBlock}>
                  <Button
                     title="Se connecter"
                     onPress={onLoginPress}
                     variant="primary"
                     size="large"
                     fullWidth
                     icon="log-in-outline"
                     style={styles.loginButton}
                     textStyle={styles.loginButtonText}
                     testID="auth-required-login-button"
                     accessibilityLabel="Se connecter"
                     accessibilityHint="Appuyez pour vous connecter à votre compte"
                  />
                  <View style={styles.securityNote}>
                     <MaterialCommunityIcons
                        name="lock-check-outline"
                        size={18}
                        color={colors.accent.gold}
                     />
                     <Text style={styles.securityText}>{SECURITY_NOTE}</Text>
                  </View>
               </View>
            </Animated.View>

            <Animated.View entering={FadeIn.duration(360).delay(120)} style={styles.footer}>
               <Text style={styles.termsText}>{TERMS_COPY}</Text>
               <View style={styles.legalRow}>
                  <Pressable
                     accessibilityRole="link"
                     accessibilityState={{ disabled: !onTermsPress }}
                     disabled={!onTermsPress}
                     onPress={handleTermsPress}
                     style={({ pressed }) => [
                        styles.legalLink,
                        pressed && styles.legalLinkPressed,
                        !onTermsPress && styles.legalLinkDisabled,
                     ]}
                     testID="terms-link"
                  >
                     <Text style={styles.legalLinkText}>Conditions</Text>
                  </Pressable>
                  <View style={styles.legalDivider} />
                  <Pressable
                     accessibilityRole="link"
                     accessibilityState={{ disabled: !onPrivacyPress }}
                     disabled={!onPrivacyPress}
                     onPress={handlePrivacyPress}
                     style={({ pressed }) => [
                        styles.legalLink,
                        pressed && styles.legalLinkPressed,
                        !onPrivacyPress && styles.legalLinkDisabled,
                     ]}
                     testID="privacy-link"
                  >
                     <Text style={styles.legalLinkText}>Confidentialité</Text>
                  </Pressable>
               </View>
               <Text style={styles.creditText}>{CREDIT_COPY}</Text>
            </Animated.View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default AuthRequiredScreen;
