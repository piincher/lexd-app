import { useAppTheme } from '@src/providers/ThemeProvider';
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

interface FeaturesSectionProps {
   colors: any;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ colors }) => {
   const textColor = colors.text?.primary ?? colors.text;
   const cardBg = colors.background?.card ?? colors.background.default;

   const FEATURES = [
      { label: "Expédition rapide", icon: "bolt" as const, color: colors.status.info },
      { label: "Suivi en temps réel", icon: "location-dot" as const, color: colors.accent.mint },
      { label: "Assurance complète", icon: "shield-halved" as const, color: colors.status.warning },
      { label: "Dédouanement inclus", icon: "file-invoice" as const, color: colors.primary.main },
      { label: "Service client 24/7", icon: "headset" as const, color: colors.status.error },
      { label: "Prix compétitifs", icon: "tags" as const, color: colors.status.success },
   ];

   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: textColor }]}>
            Pourquoi LEXD ?
         </Text>
         <View style={styles.grid}>
            {FEATURES.map((feature) => (
               <View
                  key={feature.label}
                  style={[styles.featureCard, { backgroundColor: cardBg, borderColor: colors.border }]}
               >
                  <View style={[styles.iconCircle, { backgroundColor: feature.color + "15" }]}>
                     <FontAwesome6 name={feature.icon} size={18} color={feature.color} />
                  </View>
                  <Text style={[styles.featureText, { color: textColor }]}>
                     {feature.label}
                  </Text>
               </View>
            ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   section: {
      paddingHorizontal: 16,
      paddingVertical: 24,
   },
   sectionTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      marginBottom: 16,
   },
   grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
   },
   featureCard: {
      width: "48%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderRadius: RADIUS.card,
      borderWidth: HAIRLINE,
   },
   iconCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
   },
   featureText: {
      fontSize: 13,
      fontFamily: Fonts.meduim,
      flexShrink: 1,
   },
});
