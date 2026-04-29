import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from '@src/providers/ThemeProvider';

export const TermsSection: React.FC = () => {
   const { colors } = useAppTheme();

   const openURL = useCallback((url: string) => {
      WebBrowser.openBrowserAsync(url);
   }, []);

   return (
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
   );
};

const styles = StyleSheet.create({
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
});

export default TermsSection;
