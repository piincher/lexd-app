import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

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
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.meduim,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  partnersScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  partnerLogo: {
    width: 80,
    height: 40,
    resizeMode: "contain",
    marginRight: 16,
  },
});
