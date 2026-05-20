import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./RolloutSlider.styles";

type RolloutSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const PRESETS = [0, 25, 50, 75, 100];

export function RolloutSlider({ value, onChange }: RolloutSliderProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="progress-upload" size={18} color={colors.primary.main} />
        <Text style={styles.title}>Déploiement progressif</Text>
        <View style={[styles.valueBadge, { backgroundColor: colors.primary.main + "15" }]}>
          <Text style={[styles.valueText, { color: colors.primary.main }]}>{value}%</Text>
        </View>
      </View>

      {/* Visual bar */}
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${value}%`, backgroundColor: colors.primary.main }]} />
      </View>

      {/* Preset buttons */}
      <View style={styles.presetsRow}>
        {PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset}
            style={[styles.presetButton, value === preset && { backgroundColor: colors.primary.main }]}
            onPress={() => onChange(preset)}
            activeOpacity={0.7}
          >
            <Text style={[styles.presetText, value === preset && { color: colors.text.inverse }]}>
              {preset}%
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.hint}>
        {value === 0
          ? "Aucun utilisateur ne recevra la notification de mise à jour."
          : value === 100
          ? "Tous les utilisateurs recevront la notification."
          : `Environ ${value}% des utilisateurs verront la notification.`}
      </Text>
    </View>
  );
}
