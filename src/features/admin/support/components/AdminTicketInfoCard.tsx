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

interface AdminTicketInfoCardProps {
  ticket: AdminTicket;
  onCallCustomer?: (phone: string) => void;
}

const getCustomer = (ticket: AdminTicket) => (typeof ticket.userId === 'string' ? null : ticket.userId);

export const AdminTicketInfoCard: React.FC<AdminTicketInfoCardProps> = ({ ticket, onCallCustomer }) => {
  const { colors } = useAppTheme();
  const customer = getCustomer(ticket);
  const statusColor = ADMIN_TICKET_STATUS_COLORS[ticket.status];
  const customerName = [customer?.firstName, customer?.lastName].filter(Boolean).join(' ') || 'Client';

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <View style={styles.topRow}>
        <View style={styles.titleWrap}>
          <Text style={[styles.number, { color: colors.text.secondary }]}>{ticket.ticketNumber}</Text>
          <Text style={[styles.subject, { color: colors.text.primary }]}>{ticket.subject}</Text>
        </View>
        <View style={[styles.status, { backgroundColor: `${statusColor}18` }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {ADMIN_TICKET_STATUS_LABELS[ticket.status]}
          </Text>
        </View>
      </View>
      <Text style={[styles.description, { color: colors.text.secondary }]}>{ticket.description}</Text>
      <View style={styles.metaGrid}>
        <Meta label="Type" value={ADMIN_TICKET_TYPE_LABELS[ticket.type]} />
        <Meta label="Priorité" value={ADMIN_TICKET_PRIORITY_LABELS[ticket.priority]} />
        <Meta label="Client" value={customerName} />
        <Meta label="Téléphone" value={customer?.phoneNumber || 'Non renseigné'} />
      </View>
      {customer?.phoneNumber && onCallCustomer ? (
        <Pressable style={[styles.callButton, { borderColor: colors.primary.main }]} onPress={() => onCallCustomer(customer.phoneNumber!)}>
          <MaterialCommunityIcons name="phone-outline" size={16} color={colors.primary.main} />
          <Text style={[styles.callText, { color: colors.primary.main }]}>Appeler le client</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const Meta = ({ label, value }: { label: string; value: string }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.metaItem}>
      <Text style={[styles.metaLabel, { color: colors.text.secondary }]}>{label}</Text>
      <Text style={[styles.metaValue, { color: colors.text.primary }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 14,
    padding: 14,
    ...Theme.shadows.sm,
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  titleWrap: {
    flex: 1,
  },
  number: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  subject: {
    fontFamily: Fonts.bold,
    fontSize: 17,
    marginTop: 3,
  },
  status: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  metaItem: {
    minWidth: '45%',
  },
  metaLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  metaValue: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    marginTop: 2,
  },
  callButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 10,
  },
  callText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
  },
});
