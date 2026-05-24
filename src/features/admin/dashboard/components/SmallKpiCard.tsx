import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./KPICards.styles";

interface SmallKpiCardProps {
  value: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor: string;
  progressWidth: number;
  progressColor: string;
  iconBgColor: string;
  onPress: () => void;
}

export const SmallKpiCard: React.FC<SmallKpiCardProps> = ({
  value,
  label,
  icon,
  iconColor,
  progressWidth,
  progressColor,
  iconBgColor,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.smallCard,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.smallIconWrap,
          { backgroundColor: iconBgColor },
        ]}
      >
        <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.smallValue} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.smallLabel}>{label}</Text>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressWidth}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>
    </Pressable>
  );
};
