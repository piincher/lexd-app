import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE } from '@src/shared/ui/designLanguage';
import { styles } from './styles';

interface MethodConfig {
  icon: string;
  color: string;
  label: string;
}

interface StatusConfig {
  color: string;
  bgColor: string;
  label: string;
}

interface UserPaymentDetailAmountCardProps {
  amount: number;
  methodConfig: MethodConfig;
  statusConfig: StatusConfig;
  formattedDate: string;
}

export const UserPaymentDetailAmountCard: React.FC<UserPaymentDetailAmountCardProps> = ({
  amount,
  methodConfig,
  statusConfig,
  formattedDate,
}) => {
  const { colors } = useAppTheme();

  return (
    <Surface
      style={[
        styles.heroCard,
        {
          backgroundColor: colors.background.default,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={[styles.methodIcon, { backgroundColor: methodConfig.color + '15' }]}>
        <MaterialCommunityIcons name={methodConfig.icon as any} size={32} color={methodConfig.color} />
      </View>
      <Text style={[styles.amountText, { color: colors.text.primary }]}>
        {amount.toLocaleString('fr-FR')} FCFA
      </Text>
      <Chip
        style={[styles.statusChip, { backgroundColor: statusConfig.bgColor }]}
        textStyle={{ color: statusConfig.color, fontFamily: Fonts.bold, fontSize: 13 }}
      >
        {statusConfig.label}
      </Chip>
      <Text style={[styles.methodText, { color: colors.text.secondary }]}>{methodConfig.label}</Text>
      <Text style={[styles.dateText, { color: colors.text.secondary }]}>{formattedDate}</Text>
    </Surface>
  );
};
