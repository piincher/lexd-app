/**
 * TicketDetailContent Component
 * Main content area: info card + messages + reply form + rating
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { Ticket } from '../../types';
import { TicketInfoCard } from '../../components/TicketInfoCard';
import { TicketMessageList } from '../../components/TicketMessageList';
import { TicketReplyForm } from '../../components/TicketReplyForm';
import { TicketClosedBanner } from '../../components/TicketClosedBanner';
import { TicketRatingSection } from '../../components/TicketRatingSection';

interface TicketDetailContentProps {
  ticket: Ticket;
  onRefresh: () => void;
  onSendMessage: (message: string) => void;
  isSending: boolean;
  onRate: (rating: number) => void;
  isRating: boolean;
}

export const TicketDetailContent: React.FC<TicketDetailContentProps> = ({
  ticket,
  onRefresh,
  onSendMessage,
  isSending,
  onRate,
  isRating,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const canReply = !['RESOLVED', 'CLOSED'].includes(ticket.status);
  const [rating, setRating] = useState(ticket.rating || 0);
  const showRating = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED';

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <TicketMessageList
        messages={ticket.messages}
        ListHeaderComponent={<TicketInfoCard ticket={ticket} />}
        ListFooterComponent={
          showRating ? (
            <TicketRatingSection
              rating={rating}
              onRatingChange={setRating}
              onSubmit={() => onRate(rating)}
              hasRated={!!ticket.rating}
              isPending={isRating}
            />
          ) : null
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {canReply ? (
        <TicketReplyForm onSend={onSendMessage} isPending={isSending} />
      ) : (
        <TicketClosedBanner status={ticket.status} />
      )}
    </View>
  );
};
