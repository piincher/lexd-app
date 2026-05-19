import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RecipientSelector.styles';

interface DatePickerRowProps {
  dateLabel?: string;
  onOpenCalendar?: () => void;
  onFetchByDate?: () => void;
  isFetchingByDate?: boolean;
}

export const DatePickerRow: React.FC<DatePickerRowProps> = ({
  dateLabel,
  onOpenCalendar,
  onFetchByDate,
  isFetchingByDate,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.dateRow}>
      <TouchableOpacity onPress={onOpenCalendar} style={styles.datePicker} activeOpacity={0.7}>
        <Ionicons name="calendar-outline" size={18} color={colors.primary[500]} />
        <Text style={styles.dateText}>{dateLabel || 'Choisir une date'}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.neutral[400]} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onFetchByDate}
        disabled={isFetchingByDate || !dateLabel}
        style={[styles.fetchButton, (!dateLabel || isFetchingByDate) && styles.fetchButtonDisabled]}
        activeOpacity={0.7}
      >
        <Text style={styles.fetchButtonText}>
          {isFetchingByDate ? 'Chargement...' : 'Chercher'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
