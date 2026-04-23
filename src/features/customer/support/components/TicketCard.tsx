/**
 * Ticket Card Component
 * Modern preview card for ticket list view
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { Ticket, TICKET_TYPE_LABELS, TICKET_TYPE_ICONS } from '../types';
import { TicketStatusBadge } from './TicketStatusBadge';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TicketCardProps {
  ticket: Ticket;
  onPress?: () => void;
}

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffInHours < 24) return format(date, 'HH:mm', { locale: fr });
    if (diffInHours < 48) return 'Hier';
    return format(date, 'dd MMM', { locale: fr });
  } catch {
    return '';
  }
};

const getLastMessagePreview = (ticket: Ticket): string | null => {
  if (ticket.messages.length === 0) {
    return ticket.description.substring(0, 100) + (ticket.description.length > 100 ? '...' : '');
  }
  const lastMessage = ticket.messages[ticket.messages.length - 1];
  const prefix = lastMessage.sender === 'ADMIN' ? 'Admin: ' : 'Vous: ';
  const preview = lastMessage.message.substring(0, 60);
  return prefix + preview + (lastMessage.message.length > 60 ? '...' : '');
};

const BORDER_COLORS: Record<string, string> = {
  LOW: '#9CA3AF', MEDIUM: '#3B82F6', HIGH: '#F97316', URGENT: '#EF4444',
};

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onPress }) => {
  const { colors } = useAppTheme();
  const typeIcon = TICKET_TYPE_ICONS[ticket.type] as MaterialCommunityIconName;
  const typeLabel = TICKET_TYPE_LABELS[ticket.type];
  const lastMessage = getLastMessagePreview(ticket);
  const hasUnread = ticket.messages.some(
    (m) => m.sender === 'ADMIN' && new Date(m.createdAt) > new Date(ticket.updatedAt)
  );
  const borderColor = BORDER_COLORS[ticket.priority];

  const styles = useMemo(() => StyleSheet.create({
    card: {
      marginHorizontal: 16, marginVertical: 6, borderRadius: 16,
      backgroundColor: colors.background.card, ...Theme.shadows.md, overflow: 'hidden',
    },
    borderAccent: { width: 4, backgroundColor: borderColor },
    content: { flex: 1, padding: 14 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    typeLabel: { fontFamily: Fonts.regular, fontSize: 11, color: colors.text.secondary },
    subject: { fontFamily: Fonts.meduim, fontSize: 15, color: colors.text.primary, marginBottom: 6 },
    preview: { fontFamily: Fonts.regular, fontSize: 13, color: colors.text.secondary, lineHeight: 18, marginBottom: 10 },
    footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    footerLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    dateText: { fontFamily: Fonts.regular, fontSize: 12, color: colors.text.secondary },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary.main },
  }), [colors, borderColor]);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.borderAccent} />
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <View style={styles.metaRow}>
                <MaterialCommunityIcons name={typeIcon} size={14} color={colors.text.secondary} />
                <Text style={styles.typeLabel}>{typeLabel}</Text>
              </View>
              <TicketStatusBadge status={ticket.status} />
            </View>
            <Text style={styles.subject} numberOfLines={1}>{ticket.subject}</Text>
            {lastMessage && <Text style={styles.preview} numberOfLines={2}>{lastMessage}</Text>}
            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <MaterialCommunityIcons name="clock-outline" size={12} color={colors.text.secondary} />
                <Text style={styles.dateText}>{formatDate(ticket.updatedAt)}</Text>
                {ticket.messages.length > 0 && (
                  <>
                    <Text style={styles.dateText}>·</Text>
                    <MaterialCommunityIcons name="message-outline" size={12} color={colors.text.secondary} />
                    <Text style={styles.dateText}>{ticket.messages.length}</Text>
                  </>
                )}
              </View>
              {hasUnread && <View style={styles.unreadDot} />}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

TicketCard.displayName = 'TicketCard';

export default TicketCard;
