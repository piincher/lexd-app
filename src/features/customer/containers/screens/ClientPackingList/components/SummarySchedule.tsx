import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SummaryScheduleProps {
  loadDate?: string | null;
  departureDate?: string;
  dakarPortArrivalAt?: string | null;
  arrivalDate?: string;
  formatDate: (date?: string) => string;
  formatDateTime?: (date?: string | null) => string;
}

export const SummarySchedule: React.FC<SummaryScheduleProps> = ({
  loadDate,
  departureDate,
  dakarPortArrivalAt,
  arrivalDate,
  formatDate,
  formatDateTime,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.scheduleContainer}>
      <View style={styles.datesContainer}>
        <View style={styles.dateItem}>
          <MaterialCommunityIcons name="calendar-check" size={16} color={colors.text.secondary} />
          <Text style={[styles.dateLabel, { color: colors.status.success }]}>Chargement:</Text>
          <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
            {formatDateTime ? formatDateTime(loadDate || departureDate) : formatDate(loadDate || departureDate)}
          </Text>
        </View>
        <View style={styles.dateItem}>
          <MaterialCommunityIcons name="ferry" size={16} color={colors.text.secondary} />
          <Text style={[styles.dateLabel, { color: colors.status.success }]}>Dakar:</Text>
          <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
            {formatDateTime ? formatDateTime(dakarPortArrivalAt || arrivalDate) : formatDate(dakarPortArrivalAt || arrivalDate)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    gap: 10,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginLeft: 6,
  },
  dateValue: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    marginLeft: 4,
  },
});
