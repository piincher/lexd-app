import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface DashboardHeaderGreetingProps {
  styles: any;
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
      <Text style={styles.name} numberOfLines={1}>
        {name} 👋
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    <View style={styles.avatarWrap}>
      <LinearGradient
        colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.15)']} // Decorative white gradient on colored header
        style={styles.avatarGradient}
      >
        <Text style={styles.avatarText}>{initials}</Text>
      </LinearGradient>
    </View>
  </View>
);
