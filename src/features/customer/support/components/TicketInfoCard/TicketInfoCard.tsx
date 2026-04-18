/**
 * TicketInfoCard Component
 * Displays ticket details (number, status, type, priority, dates)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { TicketStatusBadge } from '../TicketStatusBadge';
import { Ticket, TICKET_TYPE_LABELS, TICKET_PRIORITY_LABELS, TICKET_PRIORITY_COLORS } from '../../types';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface TicketInfoCardProps {
  ticket: Ticket;
}

export const TicketInfoCard: React.FC<TicketInfoCardProps> = ({ ticket }) => {
  const theme = useTheme();

  return (
    <Card style={styles.container} mode="elevated">
      <Card.Content>
        {/* Ticket Number and Status */}
        <View style={styles.header}>
          <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
          <TicketStatusBadge status={ticket.status} />
        </View>

        <Divider style={styles.divider} />

        {/* Type and Priority */}
        <View style={styles.row}>
          <View style={styles.item}>
            <MaterialCommunityIcons name="tag-outline" size={16} color={COLORS.DimGray} />
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{TICKET_TYPE_LABELS[ticket.type]}</Text>
          </View>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name="flag-outline"
              size={16}
              color={TICKET_PRIORITY_COLORS[ticket.priority]}
            />
            <Text style={styles.label}>Priorité:</Text>
            <Text style={[styles.value, { color: TICKET_PRIORITY_COLORS[ticket.priority] }]}>
              {TICKET_PRIORITY_LABELS[ticket.priority]}
            </Text>
          </View>
        </View>

        {/* Created Date */}
        <View style={styles.item}>
          <MaterialCommunityIcons name="calendar-outline" size={16} color={COLORS.DimGray} />
          <Text style={styles.label}>Créé le:</Text>
          <Text style={styles.value}>
            {format(new Date(ticket.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Subject */}
        <Text style={styles.subject}>{ticket.subject}</Text>

        {/* Description */}
        <Text style={styles.description}>{ticket.description}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketNumber: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: COLORS.Silver,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginLeft: 6,
    marginRight: 4,
  },
  value: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: COLORS.DarkGrey,
  },
  subject: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: COLORS.DarkGrey,
    marginBottom: 8,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DimGray,
    lineHeight: 20,
  },
});
