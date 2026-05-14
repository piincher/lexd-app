/**
 * TicketHeader Component
 * Appbar header for ticket detail screen
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { Ticket, TICKET_TYPE_LABELS } from '../../types';

interface TicketHeaderProps {
  navigation: any;
  ticket?: Ticket;
}

export const TicketHeader: React.FC<TicketHeaderProps> = ({ navigation, ticket }) => {
  const { colors } = useAppTheme();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content
        title={ticket?.ticketNumber || 'Ticket'}
        titleStyle={styles.title}
        subtitle={ticket ? TICKET_TYPE_LABELS[ticket.type] : undefined}
        subtitleStyle={styles.subtitle}
      />
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={navigation.theme?.colors?.onSurface || colors.text.primary}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.bold,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
});
