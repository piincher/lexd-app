import React from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { createPriorityPanelStyles } from './styles';

interface PriorityPanelHeaderProps {
  onPress: () => void;
  styles: ReturnType<typeof createPriorityPanelStyles>;
}

export const PriorityPanelHeader: React.FC<PriorityPanelHeaderProps> = ({ onPress, styles }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.headerRow}>
      <Text style={styles.eyebrow}>À traiter</Text>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.queueLink, pressed && styles.pressed]} accessibilityRole="button" accessibilityLabel="Ouvrir la file de travail" android_ripple={{ color: colors.primary.main + '18' }}>
        <Text style={styles.queueLinkText}>Voir la file</Text>
        <MaterialCommunityIcons name="arrow-right" size={16} color={colors.primary.main} />
      </Pressable>
    </View>
  );
};
