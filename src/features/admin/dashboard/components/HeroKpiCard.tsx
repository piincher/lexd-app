import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { lightTheme } from "@src/constants/Theme";
import { createKPICardsStyles } from "./KPICards.styles";

interface HeroKpiCardProps {
  value: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  trendLabel: string;
  onPress: () => void;
}

export const HeroKpiCard: React.FC<HeroKpiCardProps> = ({
  value,
  label,
  icon,
  trendLabel,
  onPress,
}) => {
  const styles = createKPICardsStyles(lightTheme.colors, false);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.heroCard,
        pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
      ]}
    >
      <LinearGradient
        colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        <View style={styles.heroDecor} />
        <View style={styles.heroTop}>
          <View style={styles.heroIconWrap}>
            <MaterialCommunityIcons name={icon} size={22} color="#FFF" />
          </View>
          <View style={styles.heroTrend}>
            <MaterialCommunityIcons name="arrow-up" size={11} color="#FFF" />
            <Text style={styles.heroTrendText}>{trendLabel}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.heroValue}>{value}</Text>
          <Text style={styles.heroLabel}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};
