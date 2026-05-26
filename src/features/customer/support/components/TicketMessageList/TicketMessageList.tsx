/**
 * TicketMessageList Component
 * Displays the list of messages in a ticket thread
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { TicketMessageBubble } from '../TicketMessageBubble';
import { TicketMessage } from '../../types';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TicketMessageListProps {
  messages: TicketMessage[];
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const TicketMessageList: React.FC<TicketMessageListProps> = ({
  messages,
  ListHeaderComponent,
  ListFooterComponent,
  refreshing,
  onRefresh,
}) => {
  const flatListRef = useRef<any>(null);
  const { colors, isDark } = useAppTheme();

  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length]);

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
      color: colors.text.secondary,
      marginTop: 12,
    },
    emptySubtext: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 4,
    },
  });

  return (
    <FlashList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TicketMessageBubble message={item} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="message-text-outline" size={48} color={colors.text.secondary} />
          <Text style={styles.emptyText}>Aucun message encore</Text>
          <Text style={styles.emptySubtext}>
            Envoyez un message pour commencer la conversation
          </Text>
        </View>
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};
