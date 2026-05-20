import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RewardSettingsToggle.styles';

interface RewardSettingsToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

export const RewardSettingsToggle: React.FC<RewardSettingsToggleProps> = ({
  enabled,
  onChange,
  disabled = false,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={[styles.iconCircle, { backgroundColor: enabled ? colors.status.success + '18' : colors.status.error + '18' }]}>
          <MaterialCommunityIcons
            name={enabled ? 'check-circle-outline' : 'close-circle-outline'}
            size={22}
            color={enabled ? colors.status.success : colors.status.error}
          />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Système de récompense</Text>
          <Text style={styles.subtitle}>
            {enabled ? 'Actif — les clients peuvent gagner et utiliser des points' : 'Inactif — le système est désactivé'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.toggleTrack,
          enabled && styles.toggleTrackActive,
          disabled && styles.toggleDisabled,
        ]}
        onPress={() => !disabled && onChange(!enabled)}
        activeOpacity={0.8}
      >
        <View style={[styles.toggleThumb, enabled && styles.toggleThumbActive]} />
      </TouchableOpacity>
    </View>
  );
};
