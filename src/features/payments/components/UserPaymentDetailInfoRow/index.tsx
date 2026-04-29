import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './styles';

interface UserPaymentDetailInfoRowProps {
  icon: string;
  label: string;
  value: string;
  color?: string;
}

export const UserPaymentDetailInfoRow: React.FC<UserPaymentDetailInfoRowProps> = ({
  icon,
  label,
  value,
  color,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.infoRow, { borderBottomColor: colors.background.paper }]}>
      <MaterialCommunityIcons
        name={icon as any}
        size={16}
        color={colors.text.secondary}
        style={styles.infoIcon}
      />
      <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: color || colors.text.primary }]}>{value}</Text>
    </View>
  );
};
