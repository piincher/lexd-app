/**
 * Ticket Empty State
 * Beautiful empty state when no tickets are found
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TicketEmptyStateProps {
  onCreateTicket: () => void;
}

export const TicketEmptyState: React.FC<TicketEmptyStateProps> = ({ onCreateTicket }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.primary[50] }]}>
        <Ionicons name="chatbubbles-outline" size={48} color={colors.primary.main} />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>Aucune demande trouvée</Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Vous n&apos;avez pas encore de demande d&apos;assistance. Créez une demande si vous avez besoin d&apos;aide.
      </Text>
      <Button
        mode="contained"
        onPress={onCreateTicket}
        style={styles.button}
        icon="plus"
        buttonColor={colors.primary.main}
        textColor={colors.text.inverse}
      >
        Créer une demande
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    borderRadius: 12,
  },
});

export default TicketEmptyState;
