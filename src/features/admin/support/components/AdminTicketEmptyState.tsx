import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AdminTicketEmptyStateProps {
  title?: string;
  message?: string;
}

export const AdminTicketEmptyState: React.FC<AdminTicketEmptyStateProps> = ({
  title = 'Aucun ticket',
  message = 'Les demandes support apparaîtront ici.',
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="ticket-confirmation-outline" size={48} color={colors.text.secondary} />
      <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.text.secondary }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 17,
    marginTop: 12,
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});
