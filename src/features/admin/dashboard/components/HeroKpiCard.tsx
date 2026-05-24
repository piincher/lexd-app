import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./KPICards.styles";

interface HeroKpiCardProps {
  value: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  trendLabel: string;
  accentColor: string;
  accentBgColor: string;
  onPress: () => void;
}

export const HeroKpiCard: React.FC<HeroKpiCardProps> = ({
  value,
  label,
  icon,
  trendLabel,
  accentColor,
  accentBgColor,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.heroCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.heroAccentBar, { backgroundColor: accentColor }]} />
      <View style={styles.heroBody}>
        <View style={styles.heroTop}>
          <View style={[styles.heroIconWrap, { backgroundColor: accentBgColor }]}>
            <MaterialCommunityIcons name={icon} size={22} color={accentColor} />
          </View>
          <View style={styles.heroTrend}>
            <MaterialCommunityIcons name="database-check" size={12} color={accentColor} />
            <Text style={styles.heroTrendText}>{trendLabel}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.heroValue} numberOfLines={1} adjustsFontSizeToFit>
            {value}
          </Text>
          <Text style={styles.heroLabel}>{label}</Text>
        </View>
      </View>
    </Pressable>
  );
};
