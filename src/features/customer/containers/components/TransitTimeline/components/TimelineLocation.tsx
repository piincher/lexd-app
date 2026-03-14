/**
 * TimelineLocation - Location/port display component
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface TimelineLocationProps {
  location: string;
  code?: string;
  country?: string;
  isMainPort?: boolean;
}

export const TimelineLocation: React.FC<TimelineLocationProps> = ({
  location,
  code,
  country,
  isMainPort = false,
}) => (
  <View style={[styles.container, isMainPort && styles.mainPortContainer]}>
    <View style={styles.header}>
      <Ionicons 
        name={isMainPort ? 'boat' : 'location'} 
        size={isMainPort ? 24 : 18} 
        color={isMainPort ? '#059669' : Theme.primary[500]} 
      />
      <View style={styles.textContainer}>
        <Text style={[styles.location, isMainPort && styles.mainPortLocation]}>
          {location}
        </Text>
        {code && (
          <Text style={styles.code}>({code})</Text>
        )}
      </View>
    </View>
    {country && (
      <Text style={styles.country}>{country}</Text>
    )}
    {isMainPort && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>PORT PRINCIPAL</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  mainPortContainer: {
    backgroundColor: '#D1FAE5',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Theme.spacing.sm,
    flex: 1,
  },
  location: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  mainPortLocation: {
    fontSize: 18,
    color: '#059669',
  },
  code: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginLeft: 4,
  },
  country: {
    fontSize: 13,
    color: Theme.neutral[600],
    marginTop: 2,
    marginLeft: 30,
  },
  badge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    alignSelf: 'flex-start',
    marginTop: Theme.spacing.sm,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFF',
  },
});
