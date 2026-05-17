import React, { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Ticket } from '../../types';
import { TicketCard } from '../../components/TicketCard';

interface TicketListProps {
  tickets: Ticket[];
  onTicketPress: (id: string) => void;
  onRefresh: () => void;
  isFetching: boolean;
  contentContainerStyle?: any;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onTicketPress,
  onRefresh,
  isFetching,
  contentContainerStyle,
}) => {
  const renderItem = useCallback(({ item }: { item: Ticket }) => (
    <TicketCard ticket={item} onPress={() => onTicketPress(item._id)} />
  ), [onTicketPress]);

  return (
    <FlashList
      data={tickets}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={contentContainerStyle}
      refreshing={isFetching}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={140}
    />
  );
};
