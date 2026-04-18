/**
 * Ticket Message Bubble Component
 * Chat bubble for ticket messages
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { TicketMessage, MessageSender } from '../types';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

interface TicketMessageBubbleProps {
  message: TicketMessage;
  isLast?: boolean;
}

/**
 * Format message time
 */
const formatTime = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'HH:mm', { locale: fr });
  } catch {
    return '';
  }
};

/**
 * Format full date
 */
const formatFullDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'dd MMM yyyy à HH:mm', { locale: fr });
  } catch {
    return '';
  }
};

export const TicketMessageBubble: React.FC<TicketMessageBubbleProps> = ({
  message,
  isLast = false,
}) => {
  const theme = useTheme();
  const isCustomer = message.sender === 'CUSTOMER';

  return (
    <View
      style={[
        styles.container,
        isCustomer ? styles.customerContainer : styles.adminContainer,
      ]}
    >
      {/* Avatar for admin */}
      {!isCustomer && (
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account-tie" size={20} color={COLORS.white} />
        </View>
      )}

      {/* Message Bubble */}
      <View
        style={[
          styles.bubble,
          isCustomer ? styles.customerBubble : styles.adminBubble,
          { backgroundColor: isCustomer ? theme.colors.primary : COLORS.white },
          isLast && styles.lastBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: isCustomer ? COLORS.white : COLORS.DarkGrey },
          ]}
        >
          {message.message}
        </Text>
        <Text
          style={[
            styles.timeText,
            { color: isCustomer ? 'rgba(255,255,255,0.7)' : COLORS.SlateGray },
          ]}
        >
          {formatTime(message.createdAt)}
        </Text>
      </View>

      {/* Avatar for customer */}
      {isCustomer && (
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <MaterialCommunityIcons name="account" size={20} color={COLORS.white} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  customerContainer: {
    justifyContent: 'flex-end',
  },
  adminContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.DimGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  customerBubble: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4,
  },
  adminBubble: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.Silver,
  },
  lastBubble: {
    marginBottom: 8,
  },
  messageText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  timeText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default TicketMessageBubble;
