/**
 * TicketMessageList Component
 * Displays the list of messages in a ticket thread
 */

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { TicketMessageBubble } from '../TicketMessageBubble';
import { TicketMessage } from '../../types';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface TicketMessageListProps {
  messages: TicketMessage[];
}

export const TicketMessageList: React.FC<TicketMessageListProps> = ({ messages }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="message-text-outline" size={48} color={COLORS.SlateGray} />
        <Text style={styles.emptyText}>Aucun message encore</Text>
        <Text style={styles.emptySubtext}>
          Envoyez un message pour commencer la conversation
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TicketMessageBubble message={item} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: COLORS.DimGray,
    marginTop: 12,
  },
  emptySubtext: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.SlateGray,
    marginTop: 4,
  },
});
