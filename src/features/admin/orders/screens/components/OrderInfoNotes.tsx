import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderInfoSection.styles';

interface OrderInfoNotesProps {
  note: string;
}

export const OrderInfoNotes: React.FC<OrderInfoNotesProps> = ({ note }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.notesSection}>
      <View style={styles.notesHeader}>
        <MaterialCommunityIcons name="note-text" size={18} color={colors.text.secondary} />
        <Text style={styles.notesTitle}>Notes</Text>
      </View>
      <Text style={styles.notesText}>{note}</Text>
    </View>
  );
};
