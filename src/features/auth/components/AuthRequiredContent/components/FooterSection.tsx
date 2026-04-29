import React, { useCallback } from "react";
import { View, Pressable, Linking, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from '@src/providers/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FooterSection: React.FC = () => {
   const { colors } = useAppTheme();

   const handlePhonePress = useCallback(() => {
      Linking.openURL("tel:+8617865673053");
   }, []);

   const handleWebsitePress = useCallback(() => {
      Linking.openURL("https://nuvotech.tech");
   }, []);

   return (
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
   );
};

const styles = StyleSheet.create({
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

export default FooterSection;
