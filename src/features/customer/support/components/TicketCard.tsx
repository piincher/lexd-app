/**
 * Ticket Card Component
 * Preview card for ticket list view
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Ticket, TICKET_TYPE_LABELS, TICKET_TYPE_ICONS } from '../types';
import { TicketStatusBadge } from './TicketStatusBadge';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

interface TicketCardProps {
  ticket: Ticket;
  onPress?: () => void;
}

/**
 * Format date for display
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return format(date, 'HH:mm', { locale: fr });
    }
    if (diffInHours < 48) {
      return 'Hier';
    }
    return format(date, 'dd MMM', { locale: fr });
  } catch {
    return '';
  }
};

/**
 * Get last message preview
 */
const getLastMessagePreview = (ticket: Ticket): string | null => {
  if (ticket.messages.length === 0) {
    return ticket.description.substring(0, 100) + (ticket.description.length > 100 ? '...' : '');
  }
  const lastMessage = ticket.messages[ticket.messages.length - 1];
  const prefix = lastMessage.sender === 'ADMIN' ? 'Admin: ' : 'Vous: ';
  const preview = lastMessage.message.substring(0, 60);
  return prefix + preview + (lastMessage.message.length > 60 ? '...' : '');
};

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onPress,
}) => {
  const theme = useTheme();
  const typeIcon = TICKET_TYPE_ICONS[ticket.type];
  const typeLabel = TICKET_TYPE_LABELS[ticket.type];
  const lastMessage = getLastMessagePreview(ticket);
  const hasNewMessages = ticket.messages.some(
    (m) => m.sender === 'ADMIN' && new Date(m.createdAt) > new Date(ticket.updatedAt)
  );

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.ticketNumberContainer}>
              <MaterialCommunityIcons
                name={typeIcon as any}
                size={18}
                color={theme.colors.primary}
                style={styles.typeIcon}
              />
              <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
            </View>
            <TicketStatusBadge status={ticket.status} />
          </View>

          {/* Type Label */}
          <Text style={styles.typeLabel}>{typeLabel}</Text>

          {/* Subject */}
          <Text style={styles.subject} numberOfLines={1}>
            {ticket.subject}
          </Text>

          {/* Last Message Preview */}
          {lastMessage && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewText} numberOfLines={2}>
                {lastMessage}
              </Text>
              {hasNewMessages && (
                <View style={styles.unreadBadge}>
                  <MaterialCommunityIcons name="circle" size={8} color={theme.colors.primary} />
                </View>
              )}
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.DimGray} />
            <Text style={styles.dateText}>{formatDate(ticket.updatedAt)}</Text>
            {ticket.messages.length > 0 && (
              <>
                <View style={styles.dot} />
                <MaterialCommunityIcons name="message-outline" size={14} color={COLORS.DimGray} />
                <Text style={styles.dateText}>{ticket.messages.length} message{ticket.messages.length > 1 ? 's' : ''}</Text>
              </>
            )}
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

TicketCard.displayName = 'TicketCard';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    borderRadius: 12,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    marginRight: 8,
  },
  ticketNumber: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
  typeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginBottom: 4,
  },
  subject: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: COLORS.DarkGrey,
    marginBottom: 8,
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.FeatherWhite,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  previewText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    lineHeight: 18,
  },
  unreadBadge: {
    marginLeft: 8,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.SlateGray,
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.SlateGray,
    marginHorizontal: 8,
  },
});

export default TicketCard;
