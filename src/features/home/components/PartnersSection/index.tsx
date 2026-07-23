import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { HAIRLINE } from "@src/shared/ui/designLanguage";

interface PartnersSectionProps {
   colors: any;
}

const PARTNER_LOGOS = [
   "https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png",
   "https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png",
   "https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png",
   "https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png",
   "https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png",
];

export const PartnersSection: React.FC<PartnersSectionProps> = ({ colors }) => {
  const styles = createStyles(colors);
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
     borderWidth: HAIRLINE,
     borderColor: colors.border,
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 12,
   },
   logo: {
      width: 70,
      height: 35,
      resizeMode: "contain",
   },
});
