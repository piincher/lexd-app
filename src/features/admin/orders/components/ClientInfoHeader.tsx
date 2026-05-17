import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientInfoCardStyles } from './ClientInfoCard.styles';

export const ClientInfoHeader: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useClientInfoCardStyles();

  return (
    <View style={styles.cardHeader}>
      <MaterialCommunityIcons name="account" size={24} color={colors.primary.main} />
      <Text style={styles.cardTitle}>Client Information</Text>
    </View>
  );
};
