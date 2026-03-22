/**
 * LoginFooter Component
 * Footer with Terms & Conditions and brand
 */

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers";

interface LoginFooterProps {
   onTermsPress?: () => void;
   onPrivacyPress?: () => void;
}

export const LoginFooter: React.FC<LoginFooterProps> = ({ onTermsPress, onPrivacyPress }) => {
   const { colors } = useAppTheme();

   return (
      <Animated.View entering={FadeIn.duration(500).delay(400)} style={styles.container}>
         <Text style={[styles.termsText, { color: colors.text.secondary }]}>
            En vous connectant, vous acceptez nos{" "}
            <Pressable onPress={onTermsPress}>
               <Text style={[styles.link, { color: colors.accent.gold }]}>
                  conditions d&apos;utilisation
               </Text>
            </Pressable>{" "}
            et notre{" "}
            <Pressable onPress={onPrivacyPress}>
               <Text style={[styles.link, { color: colors.accent.gold }]}>
                  politique de confidentialité
               </Text>
            </Pressable>
         </Text>
         <Text style={[styles.brandText, { color: colors.primary.main }]}>CHINALINK EXPRESS</Text>
         <View style={styles.madeWithLove}>
            <Text style={[styles.madeWithLoveText, { color: colors.text.secondary }]}>
               Made with{" "}
            </Text>
            <MaterialCommunityIcons name="heart" size={12} color="#EF4444" />
            <Text style={[styles.madeWithLoveText, { color: colors.text.secondary }]}>
               {" "}
               by nuvotech.tech team Paris-Nanjing
            </Text>
         </View>
         <View style={styles.contactRow}>
            <MaterialCommunityIcons name="phone" size={10} color={colors.text.secondary} />
            <Text style={[styles.contactText, { color: colors.text.secondary }]}>
               {" "}
               +8617865673053
            </Text>
         </View>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   container: { alignItems: "center", paddingVertical: 24, paddingHorizontal: 32 },
   termsText: { fontSize: 11, fontFamily: Fonts.regular, textAlign: "center", lineHeight: 18 },
   link: { fontSize: 11, fontFamily: Fonts.medium, textDecorationLine: "underline" },
   brandText: { fontSize: 16, fontFamily: Fonts.bold, letterSpacing: 2, marginTop: 16 },
   madeWithLove: { flexDirection: "row", alignItems: "center", marginTop: 8 },
   madeWithLoveText: { fontSize: 10, fontFamily: Fonts.regular },
   contactRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
   contactText: { fontSize: 10, fontFamily: Fonts.medium },
});

export default LoginFooter;
