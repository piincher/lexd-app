import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

interface PartnersSectionProps {
   colors: any;
}

const PARTNER_LOGOS = [
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png",
];

export const PartnersSection: React.FC<PartnersSectionProps> = ({ colors }) => {
  const styles = useMemo(() => createStyles(colors), [colors]);
   const textColor = colors.text?.primary ?? colors.text;

   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: textColor }]}>
            Nos Partenaires
         </Text>
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
         >
            {PARTNER_LOGOS.map((logo, index) => (
               <View key={index} style={[styles.logoContainer, { shadowColor: colors.neutral[900] }]}>
                  <Image source={{ uri: logo }} style={styles.logo} />
               </View>
            ))}
         </ScrollView>
      </View>
   );
};

const createStyles = (colors: any) => StyleSheet.create({
   section: {
      marginVertical: 24,
   },
   sectionTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      marginBottom: 16,
      paddingHorizontal: 16,
   },
   scrollContent: {
      paddingHorizontal: 16,
      gap: 12,
   },
   logoContainer: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 12,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
   },
   logo: {
      width: 70,
      height: 35,
      resizeMode: "contain",
   },
});
