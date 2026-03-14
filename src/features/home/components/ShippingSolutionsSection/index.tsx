import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";

interface ShippingSolutionsSectionProps {
  onPressAir: () => void;
  onPressSea: () => void;
  colors: any; // for theme colors if needed
}

export const ShippingSolutionsSection: React.FC<ShippingSolutionsSectionProps> = ({
  onPressAir,
  onPressSea,
  colors,
}) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Nos Solutions d'Expédition
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        <Animated.View entering={FadeInRight.delay(200)}>
          <Pressable onPress={onPressAir} style={styles.card}>
            <LinearGradient colors={["#4A90E2", "#1ED7B5"]} style={styles.cardGradient}>
              <FontAwesome6 name="plane" size={48} color="white" />
              <Text style={styles.cardTitle}>Fret Aérien</Text>
              <Text style={styles.cardText}>
                Livraison rapide en 2 à 3 semaines avec suivi en temps réel
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(400)}>
          <Pressable onPress={onPressSea} style={styles.card}>
            <LinearGradient colors={["#1ED7B5", "#4A90E2"]} style={styles.cardGradient}>
              <FontAwesome6 name="ship" size={48} color="white" />
              <Text style={styles.cardTitle}>Sea Freight</Text>
              <Text style={styles.cardText}>
                Expédition économique en vrac (6 à 8 semaines)
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 180,
    height: 220,
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: "white",
    marginTop: 12,
    textAlign: "center",
  },
  cardText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "white",
    marginTop: 8,
    textAlign: "center",
    opacity: 0.9,
  },
});

export default ShippingSolutionsSection;
