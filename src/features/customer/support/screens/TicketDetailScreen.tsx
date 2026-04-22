/**
 * Ticket Detail Screen
 * Shows ticket details with chat-like message interface
 */

import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Screen } from '@src/shared/ui';
import { useGetTicket, useAddMessage, useRateTicket } from '../hooks/useTickets';
import { TicketDetailSkeleton } from '../components/TicketDetailSkeleton';
import { showMessage } from 'react-native-flash-message';
import { TicketDetailHeader } from './components/TicketDetailHeader';
import { TicketDetailContent } from './components/TicketDetailContent';
import { ErrorState } from './components/ErrorState';

export const TicketDetailScreen: React.FC<RootStackScreenProps<'TicketDetail'>> = ({
  navigation,
  route,
}) => {
  const { ticketId } = route.params;
  const { data: ticket, isLoading, isError, refetch } = useGetTicket(ticketId);
  const addMessageMutation = useAddMessage();
  const rateTicketMutation = useRateTicket();

  const handleSendMessage = async (message: string) => {
    try {
      await addMessageMutation.mutateAsync({ ticketId, message });
    } catch {
      showMessage({
        message: 'Erreur',
        description: 'Impossible d\'envoyer le message. Veuillez réessayer.',
        type: 'danger',
      });
    }
  };

  const handleRate = async (rating: number) => {
    try {
      await rateTicketMutation.mutateAsync({ ticketId, rating });
      showMessage({
        message: 'Merci !',
        description: 'Votre évaluation a été enregistrée.',
        type: 'success',
      });
    } catch {
      showMessage({
        message: 'Erreur',
        description: 'Impossible d\'envoyer l\'évaluation.',
        type: 'danger',
      });
    }
  };

  if (isLoading) {
    return (
      <Screen header={<TicketDetailHeader onBack={() => navigation.goBack()} />} scrollable={false}>
        <TicketDetailSkeleton />
      </Screen>
    );
  }

  if (isError || !ticket) {
    return (
      <Screen header={<TicketDetailHeader onBack={() => navigation.goBack()} />} scrollable={false}>
        <ErrorState onRetry={refetch} />
      </Screen>
    );
  }

  return (
    <Screen
      header={<TicketDetailHeader ticket={ticket} onBack={() => navigation.goBack()} />}
      scrollable={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TicketDetailContent
          ticket={ticket}
          onRefresh={refetch}
          onSendMessage={handleSendMessage}
          isSending={addMessageMutation.isPending}
          onRate={handleRate}
          isRating={rateTicketMutation.isPending}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default TicketDetailScreen;
