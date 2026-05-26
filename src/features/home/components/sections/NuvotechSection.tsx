import React, { useCallback } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

const NUVOTECH_URL = "https://nuvotech.tech";

export const NuvotechSection: React.FC = () => {
   const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);

   const handlePress = useCallback(() => {
      Linking.openURL(NUVOTECH_URL);
   }, []);

   return (
      <Animated.View
         entering={FadeInDown.delay(880).duration(500).springify()}
         style={styles.container}
      >
         <View
            style={[
               styles.servicePanel,
               {
                  backgroundColor: isDark ? `${colors.primary.main}1E` : colors.primary[50],
                  borderColor: isDark ? `${colors.primary.light}2E` : colors.primary[200],
               },
            ]}
         >
            <View style={[styles.iconCircle, { backgroundColor: colors.primary.main }]}>
               <FontAwesome6 name="mobile-screen-button" size={20} color={colors.neutral.white} />
            </View>

            <View style={styles.copy}>
               <Text style={[styles.title, { color: colors.text.primary }]}>
                  {"Besoin d'une application mobile ?"}
               </Text>
               <Text style={[styles.description, { color: colors.text.secondary }]}>
                  {
                     "L'equipe Nuvotech conçoit des applications mobiles, plateformes web et outils métiers pour les entreprises entre Paris et Nanjing."
                  }
               </Text>
            </View>

            <TouchableOpacity
               style={[styles.cta, { backgroundColor: colors.primary.main }]}
               onPress={handlePress}
               activeOpacity={0.85}
               accessibilityRole="button"
            >
               <Text
                  style={styles.ctaText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  maxFontSizeMultiplier={1.12}
               >
                  Contacter Nuvotech
               </Text>
               <FontAwesome6 name="arrow-up-right-from-square" size={13} color={colors.neutral.white} />
            </TouchableOpacity>
         </View>

         <TouchableOpacity
            style={styles.credit}
            onPress={handlePress}
            activeOpacity={0.75}
            accessibilityRole="link"
         >
            <Text style={[styles.creditText, { color: colors.text.secondary }]}>
               made with ❤️ by nuvotech.tech team Paris (France) - Nanjing (China) +86 178 6567
               3053(whatsapp)
            </Text>
         </TouchableOpacity>
      </Animated.View>
   );
};

const createStyles = (colors: any) => StyleSheet.create({
   container: {
      marginTop: 32,
      paddingHorizontal: 16,
      gap: 14,
   },
   servicePanel: {
      borderWidth: 1,
      borderRadius: 18,
      padding: 16,
      gap: 14,
      ...Theme.shadows.sm,
   },
   iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
   },
   copy: {
      gap: 6,
   },
   title: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      lineHeight: 24,
   },
   description: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      lineHeight: 21,
   },
   cta: {
      minHeight: 48,
      borderRadius: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
   },
   ctaText: {
      color: colors.neutral.white,
      fontFamily: Fonts.bold,
      fontSize: 14,
   },
   credit: {
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
   },
   creditText: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
   },
});

export default NuvotechSection;
