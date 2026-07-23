import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE } from '@src/shared/ui/designLanguage';
import { styles } from './styles';

interface UserPaymentDetailNotesCardProps {
  notes: string;
}

export const UserPaymentDetailNotesCard: React.FC<UserPaymentDetailNotesCardProps> = ({ notes }) => {
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
        <MaterialCommunityIcons name="note-text" size={22} color={colors.primary.main} />
        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Notes</Text>
      </View>
      <Divider style={styles.divider} />
      <Text style={[styles.notesText, { color: colors.text.primary }]}>{notes}</Text>
    </Surface>
  );
};
