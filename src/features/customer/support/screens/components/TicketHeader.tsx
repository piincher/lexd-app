/**
 * TicketHeader Component
 * Appbar header for ticket detail screen
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Ticket, TICKET_TYPE_LABELS } from '../../types';

interface TicketHeaderProps {
  navigation: any;
  ticket?: Ticket;
}

export const TicketHeader: React.FC<TicketHeaderProps> = ({ navigation, ticket }) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => navigation.goBack()} />
    <Appbar.Content
      title={ticket?.ticketNumber || 'Ticket'}
      titleStyle={styles.title}
      subtitle={ticket ? TICKET_TYPE_LABELS[ticket.type] : undefined}
      subtitleStyle={styles.subtitle}
    />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.bold,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
});
