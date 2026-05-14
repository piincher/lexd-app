/**
 * TimelineEvent - Single event card display
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { TimelineDateMarker } from './TimelineDateMarker';

interface TimelineEventProps {
  title: string;
  subtitle?: string;
  timestamp?: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  title,
  subtitle,
  timestamp,
  isCompleted = false,
  isCurrent = false,
  icon = 'location',
}) => {
  const iconColor = isCurrent ? Theme.status.info : 
                    isCompleted ? Theme.status.success : Theme.neutral[400];
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {timestamp && <TimelineDateMarker timestamp={timestamp} />}
      </View>
      {isCompleted && (
        <Ionicons name="checkmark-circle" size={20} color={Theme.status.success} />
      )}
      {isCurrent && (
        <View style={styles.currentBadge}>
          <Text style={styles.currentText}>ACTUEL</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  subtitle: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  currentBadge: {
    backgroundColor: Theme.status.info,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
  },
  currentText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'Theme.colors.text.inverse',
  },
});
