import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useRecipientSelectorStyles } from './RecipientSelector.styles';

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
  const styles = useRecipientSelectorStyles();

  return (
    <View style={styles.dateRow}>
      <TouchableOpacity onPress={onOpenCalendar} style={styles.datePicker} activeOpacity={0.7}>
        <Ionicons name="calendar-outline" size={18} color={Theme.primary[500]} />
        <Text style={styles.dateText}>{dateLabel || 'Choisir une date'}</Text>
        <Ionicons name="chevron-down" size={16} color={Theme.neutral[400]} />
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
