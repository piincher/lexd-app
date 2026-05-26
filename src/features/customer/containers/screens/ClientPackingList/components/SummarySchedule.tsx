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

  const dates = [
    {
      icon: 'calendar-check' as const,
      label: 'Chargement',
      value: formatDateTime ? formatDateTime(loadDate || departureDate) : formatDate(loadDate || departureDate),
    },
    {
      icon: 'ferry' as const,
      label: 'Arrivée Dakar',
      value: formatDateTime ? formatDateTime(dakarPortArrivalAt || arrivalDate) : formatDate(dakarPortArrivalAt || arrivalDate),
    },
  ];

  return (
    <View style={styles.scheduleContainer}>
      {dates.map((d, i) => (
        <View key={d.label} style={styles.dateItem}>
          <View style={[styles.dateIconWrap, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name={d.icon} size={16} color={colors.text.muted} />
          </View>
          <View style={styles.dateContent}>
            <Text style={[styles.dateLabel, { color: colors.text.muted }]}>
              {d.label}
            </Text>
            <Text style={[styles.dateValue, { color: colors.text.primary }]} numberOfLines={1}>
              {d.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  dateIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dateLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  dateValue: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
  },
});
