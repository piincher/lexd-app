/**
 * TimelineDateMarker - Date/time display component
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { Theme } from '@src/constants/Theme';

interface TimelineDateMarkerProps {
  timestamp: string;
  label?: string;
  showIcon?: boolean;
}

export const TimelineDateMarker: React.FC<TimelineDateMarkerProps> = ({
  timestamp,
  label,
  showIcon = true,
}) => {
  const formatDate = (ts: string): string => {
    try {
      return format(new Date(ts), 'dd MMM yyyy, HH:mm', { locale: fr });
    } catch {
      return ts;
    }
  };

  return (
    <View style={styles.container}>
      {showIcon && (
        <Ionicons name="time-outline" size={14} color={Theme.neutral[500]} />
      )}
      <View style={styles.textContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Text style={styles.date}>{formatDate(timestamp)}</Text>
      </View>
    </View>
  );
};

export const formatTimestamp = (timestamp?: string): string => {
  if (!timestamp) return '';
  try {
    return format(new Date(timestamp), 'dd MMM yyyy, HH:mm', { locale: fr });
  } catch {
    return timestamp;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
  date: {
    fontSize: 12,
    color: Theme.neutral[700],
    fontWeight: '500',
  },
});
