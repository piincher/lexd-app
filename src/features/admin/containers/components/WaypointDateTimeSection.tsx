import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Theme } from '@src/constants/Theme';

interface WaypointDateTimeSectionProps {
  delay?: number;
  actualArrival: Date | null;
  actualDeparture: Date | null;
  showArrivalPicker: boolean;
  showDeparturePicker: boolean;
  onArrivalChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  onDepartureChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  onShowArrivalPicker: () => void;
  onShowDeparturePicker: () => void;
  onClearArrival: () => void;
  onClearDeparture: () => void;
}

const formatDateTime = (date: Date | null): string => {
  if (!date) return 'Sélectionner une date';
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const WaypointDateTimeSection: React.FC<WaypointDateTimeSectionProps> = ({
  delay = 0,
  actualArrival,
  actualDeparture,
  showArrivalPicker,
  showDeparturePicker,
  onArrivalChange,
  onDepartureChange,
  onShowArrivalPicker,
  onShowDeparturePicker,
  onClearArrival,
  onClearDeparture,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(delay)} style={styles.section}>
      <Text style={styles.sectionTitle}>Horaires</Text>

      {/* Actual Arrival */}
      <View style={styles.dateField}>
        <Text style={styles.dateLabel}>Arrivée Réelle</Text>
        <TouchableOpacity style={styles.datePicker} onPress={onShowArrivalPicker}>
          <Ionicons name="calendar" size={20} color={Theme.primary[500]} />
          <Text style={styles.datePickerText}>{formatDateTime(actualArrival)}</Text>
        </TouchableOpacity>
        {actualArrival && (
          <TouchableOpacity style={styles.clearButton} onPress={onClearArrival}>
            <Ionicons name="close-circle" size={18} color={Theme.status.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* Actual Departure */}
      <View style={styles.dateField}>
        <Text style={styles.dateLabel}>Départ Réel</Text>
        <TouchableOpacity style={styles.datePicker} onPress={onShowDeparturePicker}>
          <Ionicons name="calendar" size={20} color={Theme.primary[500]} />
          <Text style={styles.datePickerText}>{formatDateTime(actualDeparture)}</Text>
        </TouchableOpacity>
        {actualDeparture && (
          <TouchableOpacity style={styles.clearButton} onPress={onClearDeparture}>
            <Ionicons name="close-circle" size={18} color={Theme.status.error} />
          </TouchableOpacity>
        )}
      </View>

      {showArrivalPicker && (
        <DateTimePicker
          value={actualArrival || new Date()}
          mode="datetime"
          display="default"
          onChange={onArrivalChange}
        />
      )}

      {showDeparturePicker && (
        <DateTimePicker
          value={actualDeparture || new Date()}
          mode="datetime"
          display="default"
          onChange={onDepartureChange}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.md,
  },
  dateField: {
    marginBottom: Theme.spacing.md,
  },
  dateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  datePickerText: {
    flex: 1,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  clearButton: {
    position: 'absolute',
    right: Theme.spacing.md,
    top: 32,
  },
});
