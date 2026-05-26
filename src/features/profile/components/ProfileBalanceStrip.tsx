import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createProfileHeaderStyles } from './ProfileHeader.styles';

interface ProfileBalanceStripProps {
  balanceFormatted: string;
}

export const ProfileBalanceStrip: React.FC<ProfileBalanceStripProps> = ({ balanceFormatted }) => {
  const { colors } = useAppTheme();
  const styles = createProfileHeaderStyles(colors);

  return (
    <View style={styles.balanceStrip}>
      <View style={styles.balanceLeft}>
        <MaterialCommunityIcons name="wallet-outline" size={20} color={colors.primary[700]} />
        <Text style={styles.balanceLabel}>Solde à payer</Text>
      </View>
      <Text style={styles.balanceValue} numberOfLines={1}>
        {balanceFormatted} FCFA
      </Text>
    </View>
  );
};
