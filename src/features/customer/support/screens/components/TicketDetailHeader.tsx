/**
 * TicketDetailHeader Component
 * Appbar header for ticket detail screen
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Ticket, TICKET_TYPE_LABELS } from '../../types';

interface TicketDetailHeaderProps {
  ticket?: Ticket;
  onBack: () => void;
}

export const TicketDetailHeader: React.FC<TicketDetailHeaderProps> = ({ ticket, onBack }) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={onBack} />
    <Appbar.Content
      title={ticket?.ticketNumber || 'Demande'}
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
