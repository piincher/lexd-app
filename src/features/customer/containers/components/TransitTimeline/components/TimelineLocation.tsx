/**
 * TimelineLocation - Location/port display component
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: colors.background.paper,
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
    },
    mainPortContainer: {
      backgroundColor: colors.feedback.successBg,
      borderWidth: 2,
      borderColor: colors.status.success,
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
      color: colors.text.primary,
    },
    mainPortLocation: {
      fontSize: 18,
      color: colors.status.success,
    },
    code: {
      fontSize: 12,
      color: colors.text.secondary,
      marginLeft: 4,
    },
    country: {
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
      marginLeft: 30,
    },
    badge: {
      backgroundColor: colors.status.success,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: Theme.radius.full,
      alignSelf: 'flex-start',
      marginTop: Theme.spacing.sm,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.text.inverse,
    },
  }), [colors]);

  return (
  <View style={[styles.container, isMainPort && styles.mainPortContainer]}>
    <View style={styles.header}>
      <Ionicons 
        name={isMainPort ? 'boat' : 'location'} 
        size={isMainPort ? 24 : 18} 
        color={isMainPort ? colors.status.success : colors.primary.main} 
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
};
