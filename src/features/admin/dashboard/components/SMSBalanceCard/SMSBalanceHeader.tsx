import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './SMSBalanceCard.styles';

type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface SMSBalanceHeaderProps {
  meta: { icon: MaterialCommunityIconName; label: string; color: string };
}

export const SMSBalanceHeader: React.FC<SMSBalanceHeaderProps> = ({ meta }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={[styles.iconWrap, { backgroundColor: meta.color + '18' }]}>
          <MaterialCommunityIcons name="message-badge" size={20} color={meta.color} />
        </View>
        <View>
          <Text style={styles.title}>Crédits SMS</Text>
          <Text style={styles.subtitle}>Solde disponible</Text>
        </View>
      </View>
      <View style={styles.statusBadge}>
        <MaterialCommunityIcons name={meta.icon} size={12} color={meta.color} />
        <Text style={styles.statusText}>{meta.label}</Text>
      </View>
    </View>
  );
};
