import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { FlashListRef } from '@shopify/flash-list';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AdminTicketMessage } from '../types';

interface AdminTicketMessageListProps {
  messages: AdminTicketMessage[];
  header: React.ReactElement;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const formatTime = (value: string) => {
  try {
    return new Date(value).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
};

const MessageBubble = ({ message }: { message: AdminTicketMessage }) => {
  const { colors } = useAppTheme();
  const isAdmin = message.sender === 'ADMIN';
  const bubbleBg = isAdmin ? colors.primary.main : colors.background.card;
  const textColor = isAdmin ? colors.text.inverse : colors.text.primary;

  return (
    <View style={[styles.bubbleWrap, isAdmin ? styles.adminWrap : styles.customerWrap]}>
      <View style={[styles.bubble, { backgroundColor: bubbleBg }]}>
        <Text style={[styles.sender, { color: textColor }]}>{isAdmin ? 'Admin' : 'Client'}</Text>
        <Text style={[styles.body, { color: textColor }]}>{message.message}</Text>
        <Text style={[styles.time, { color: isAdmin ? 'rgba(255,255,255,0.75)' : colors.text.secondary }]}>
          {formatTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export const AdminTicketMessageList: React.FC<AdminTicketMessageListProps> = ({
  messages,
  header,
  refreshing,
  onRefresh,
}) => {
  const ref = useRef<FlashListRef<AdminTicketMessage>>(null);

  useEffect(() => {
    if (messages.length) {
      setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 80);
    }
  }, [messages.length]);

  return (
    <FlashList
      ref={ref}
      data={messages}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <MessageBubble message={item} />}
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.empty}>Aucun échange pour le moment.</Text>}
      contentContainerStyle={styles.content}
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 88,
  },
  bubbleWrap: {
    marginVertical: 5,
  },
  adminWrap: {
    alignItems: 'flex-end',
  },
  customerWrap: {
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 14,
    maxWidth: '86%',
    padding: 12,
  },
  sender: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  time: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 6,
  },
  empty: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    paddingVertical: 24,
    textAlign: 'center',
  },
});
