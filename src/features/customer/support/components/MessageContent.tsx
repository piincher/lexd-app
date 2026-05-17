import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getStyles } from './TicketMessageBubble.styles';

interface MessageContentProps {
  message: string;
  createdAt: string;
  isCustomer: boolean;
  isLast: boolean;
}

const formatTime = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'HH:mm', { locale: fr });
  } catch {
    return '';
  }
};

export const MessageContent: React.FC<MessageContentProps> = ({
  message,
  createdAt,
  isCustomer,
  isLast,
}) => {
  const { colors } = useAppTheme();
  const theme = useTheme();
  const styles = getStyles(colors);

  return (
    <View
      style={[
        styles.bubble,
        isCustomer ? styles.customerBubble : styles.adminBubble,
        { backgroundColor: isCustomer ? theme.colors.primary : colors.background.card },
        isLast && styles.lastBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          { color: isCustomer ? colors.text.inverse : colors.text.primary },
        ]}
      >
        {message}
      </Text>
      <Text
        style={[
          styles.timeText,
          { color: isCustomer ? colors.text.inverse : colors.text.secondary },
        ]}
      >
        {formatTime(createdAt)}
      </Text>
    </View>
  );
};
