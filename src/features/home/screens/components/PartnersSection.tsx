import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const PARTNER_LOGOS = [
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png",
];

export const PartnersSection: React.FC = () => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.section}>
         <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Les services utilisés
         </Text>
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.partnersScroll}
         >
            {PARTNER_LOGOS.map((logo, index) => (
               <Image key={index} source={{ uri: logo }} style={styles.partnerLogo} />
            ))}
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   section: {
      marginVertical: 24,
      paddingHorizontal: 16,
   },
   sectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 26,
      marginBottom: 24,
      textAlign: "center",
   },
   partnersScroll: {
      paddingHorizontal: 16,
   },
   partnerLogo: {
      width: 70,
      height: 80,
      resizeMode: "contain",
      marginRight: 32,
   },
});
