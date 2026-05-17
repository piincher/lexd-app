import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPickupInfoCardStyles } from './PickupInfoCard.styles';

interface PickupContactInfoProps {
  address?: string;
  phone?: string;
}

export const PickupContactInfo: React.FC<PickupContactInfoProps> = ({ address, phone }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createPickupInfoCardStyles(colors, isDark);

  return (
    <View style={styles.contactInfo}>
      <Text style={styles.contactLabel}>
        Adresse:{' '}
        <Text style={styles.contactValue}>{address}</Text>
      </Text>
      {!!phone && (
        <Text style={[styles.contactLabel, { marginTop: 6 }]}>
          Téléphone:{' '}
          <Text style={styles.contactValue}>{phone}</Text>
        </Text>
      )}
    </View>
  );
};
