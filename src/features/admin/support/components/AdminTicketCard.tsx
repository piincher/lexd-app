import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  ADMIN_TICKET_PRIORITY_LABELS,
  ADMIN_TICKET_STATUS_COLORS,
  ADMIN_TICKET_STATUS_LABELS,
  ADMIN_TICKET_TYPE_LABELS,
  AdminTicket,
} from '../types';

interface AdminTicketCardProps {
  ticket: AdminTicket;
  onPress: () => void;
}

const getCustomerName = (ticket: AdminTicket) => {
  if (typeof ticket.userId === 'string') return 'Client';
  return [ticket.userId.firstName, ticket.userId.lastName].filter(Boolean).join(' ') || 'Client';
};

const formatDate = (value: string) => {
  try {
    return new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  } catch {
    return '';
  }
};

export const AdminTicketCard: React.FC<AdminTicketCardProps> = ({ ticket, onPress }) => {
  const { colors } = useAppTheme();
  const statusColor = ADMIN_TICKET_STATUS_COLORS[ticket.status];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
      <View style={[styles.card, { backgroundColor: colors.background.card }]}>
        <View style={[styles.accent, { backgroundColor: statusColor }]} />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={[styles.number, { color: colors.text.secondary }]}>{ticket.ticketNumber}</Text>
            <View style={[styles.status, { backgroundColor: `${statusColor}18` }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {ADMIN_TICKET_STATUS_LABELS[ticket.status]}
              </Text>
            </View>
          </View>
          <Text style={[styles.subject, { color: colors.text.primary }]} numberOfLines={1}>
            {ticket.subject}
          </Text>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="account-outline" size={14} color={colors.text.secondary} />
            <Text style={[styles.meta, { color: colors.text.secondary }]} numberOfLines={1}>
              {getCustomerName(ticket)}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.text.secondary }]}>
              {ADMIN_TICKET_TYPE_LABELS[ticket.type]} · {ADMIN_TICKET_PRIORITY_LABELS[ticket.priority]}
            </Text>
            <Text style={[styles.footerText, { color: colors.text.secondary }]}>
              {formatDate(ticket.updatedAt)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  pressed: {
    opacity: 0.85,
  },
  card: {
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  accent: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  number: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  status: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
  },
  subject: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    marginBottom: 8,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  meta: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
});
