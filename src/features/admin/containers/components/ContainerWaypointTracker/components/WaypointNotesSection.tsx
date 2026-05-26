import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './WaypointDetails.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WaypointNotesSectionProps {
  notes: string;
}

export const WaypointNotesSection: React.FC<WaypointNotesSectionProps> = ({ notes }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notes</Text>
      <View style={styles.notesContainer}>
        <Ionicons name="document-text-outline" size={16} color={colors.neutral[500]} />
        <Text style={styles.notesText}>{notes}</Text>
      </View>
    </View>
  );
};
