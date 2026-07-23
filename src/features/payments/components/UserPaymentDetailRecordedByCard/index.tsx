import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE } from '@src/shared/ui/designLanguage';
import { styles } from './styles';

interface CreatedBy {
  id: string;
  name: string | null;
}

interface UserPaymentDetailRecordedByCardProps {
  createdBy: CreatedBy;
}

export const UserPaymentDetailRecordedByCard: React.FC<UserPaymentDetailRecordedByCardProps> = ({
  createdBy,
}) => {
  const { colors } = useAppTheme();

  return (
    <Surface
      style={[
        styles.card,
        {
          backgroundColor: colors.background.default,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="account-check" size={22} color={colors.primary.main} />
        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Enregistré par</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.adminRow}>
        <View style={[styles.adminAvatar, { backgroundColor: colors.primary.main + '15' }]}>
          <MaterialCommunityIcons name="account" size={24} color={colors.primary.main} />
        </View>
        <Text style={[styles.adminName, { color: colors.text.primary }]}>
          {createdBy.name || 'Administrateur'}
        </Text>
      </View>
    </Surface>
  );
};
