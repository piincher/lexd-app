/**
 * Ticket Message Bubble Component
 * Chat bubble for ticket messages
 */

import React from 'react';
import { View } from 'react-native';
import { TicketMessage } from '../types';
import { MessageAvatar } from './MessageAvatar';
import { MessageContent } from './MessageContent';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getStyles } from './TicketMessageBubble.styles';

interface TicketMessageBubbleProps {
  message: TicketMessage;
  isLast?: boolean;
}

export const TicketMessageBubble: React.FC<TicketMessageBubbleProps> = ({
  message,
  isLast = false,
}) => {
  const { colors } = useAppTheme();
  const isCustomer = message.sender === 'CUSTOMER';
  const styles = getStyles(colors);

  return (
    <View
      style={[
        styles.container,
        isCustomer ? styles.customerContainer : styles.adminContainer,
      ]}
    >
      {!isCustomer && <MessageAvatar isCustomer={isCustomer} />}
      <MessageContent
        message={message.message}
        createdAt={message.createdAt}
        isCustomer={isCustomer}
        isLast={isLast}
      />
      {isCustomer && <MessageAvatar isCustomer={isCustomer} />}
    </View>
  );
};

export default TicketMessageBubble;
