import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RecipientSelector.styles';

type SourceMode = 'all' | 'date';

interface ModeToggleProps {
  mode: SourceMode;
  onModeChange: (mode: SourceMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.modeRow}>
      <TouchableOpacity
        onPress={() => onModeChange('all')}
        style={[styles.modeTab, mode === 'all' && styles.modeTabActive]}
        activeOpacity={0.7}
      >
        <Ionicons name="people" size={16} color={mode === 'all' ? colors.text.inverse : colors.neutral[500]} />
        <Text style={[styles.modeText, mode === 'all' && styles.modeTextActive]}>
          Tous les clients
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onModeChange('date')}
        style={[styles.modeTab, mode === 'date' && styles.modeTabActive]}
        activeOpacity={0.7}
      >
        <Ionicons name="calendar" size={16} color={mode === 'date' ? colors.text.inverse : colors.neutral[500]} />
        <Text style={[styles.modeText, mode === 'date' && styles.modeTextActive]}>
          Par date depart
        </Text>
      </TouchableOpacity>
    </View>
  );
};
