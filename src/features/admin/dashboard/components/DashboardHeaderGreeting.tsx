import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import type { createDashboardHeaderStyles } from './DashboardHeader.styles';

type DashboardHeaderStyles = ReturnType<typeof createDashboardHeaderStyles>;

interface DashboardHeaderGreetingProps {
  styles: DashboardHeaderStyles;
  greeting: string;
  name: string;
  subtitle: string;
  initials: string;
}

export const DashboardHeaderGreeting: React.FC<DashboardHeaderGreetingProps> = ({
  styles,
  greeting,
  name,
  subtitle,
  initials,
}) => (
  <View style={styles.mainRow}>
    <View style={styles.greetingBlock}>
      <Text style={styles.greeting}>{greeting},</Text>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    <View style={styles.avatarWrap}>
      <View style={styles.avatarInner}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    </View>
  </View>
);
