import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";

interface FeaturesSectionProps {
  colors: any;
}

const FEATURES = [
  "Expedition rapide",
  "Suivi en temps réel",
  "Assurance complète",
  "Dedouanement inclus",
  "Service client 24/7",
];

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ colors }) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Pourquoi ChinaLink Express?
      </Text>
      <View style={styles.featuresGrid}>
        {FEATURES.map((feature, index) => (
          <Animated.View
            key={index}
            style={styles.featureItem}
            entering={FadeInDown.delay(index * 100).springify()}
          >
            <FontAwesome6 name="check-circle" size={20} color="#1ED7B5" />
            <Text style={[styles.featureText, { color: colors.text }]}>
              {feature}
            </Text>
          </Animated.View>
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
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
});
