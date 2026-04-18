/**
 * DashboardWelcomeHeader
 * Welcome message, avatar, and notification button
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Appbar, useTheme } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/features/notifications';

export interface DashboardWelcomeHeaderProps {
  userName?: string;
  onNotificationPress: () => void;
}

const getWelcomeMessage = (name: string): string => {
  const hour = new Date().getHours();
  const firstName = name.split(' ')[0] || 'Client';
  if (hour < 12) return `Bonjour, ${firstName} ☀️`;
  if (hour < 18) return `Bon après-midi, ${firstName} 👋`;
  return `Bonsoir, ${firstName} 🌙`;
};

export const DashboardWelcomeHeader: React.FC<DashboardWelcomeHeaderProps> = ({
  userName = 'Client',
  onNotificationPress,
}) => {
  const theme = useTheme();

  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.headerLeft}>
        <Avatar.Text
          size={40}
          label={userName[0]?.toUpperCase() || 'C'}
          style={{ backgroundColor: theme.colors.primary }}
          color={Theme.neutral.white}
        />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>{getWelcomeMessage(userName)}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Suivez vos marchandises en temps réel
          </Text>
        </View>
      </View>
      <NotificationBell
        onPress={onNotificationPress}
        size={24}
        color={theme.colors.onSurface}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  headerText: {
    marginLeft: Theme.spacing.md,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  notificationButton: {
    marginRight: Theme.spacing.sm,
  },
});

export default DashboardWelcomeHeader;
