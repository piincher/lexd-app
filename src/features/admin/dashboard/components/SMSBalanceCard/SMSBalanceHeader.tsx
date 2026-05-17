import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './SMSBalanceCard.styles';

interface SMSBalanceHeaderProps {
  meta: { icon: string; label: string };
}

export const SMSBalanceHeader: React.FC<SMSBalanceHeaderProps> = ({ meta }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="message-badge" size={20} color={colors.text.inverse} />
        </View>
        <View>
          <Text style={styles.title}>Crédits SMS</Text>
          <Text style={styles.subtitle}>Solde disponible</Text>
        </View>
      </View>
      <View style={styles.statusBadge}>
        <MaterialCommunityIcons name={meta.icon as any} size={12} color={colors.text.inverse} />
        <Text style={styles.statusText}>{meta.label}</Text>
      </View>
    </View>
  );
};
