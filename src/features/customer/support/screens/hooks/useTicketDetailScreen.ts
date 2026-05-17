import { useCallback } from 'react';
import { useGetTicket, useAddMessage, useRateTicket } from '../../hooks/useTickets';
import { showMessage } from 'react-native-flash-message';

export const useTicketDetailScreen = (ticketId: string) => {
  const { data: ticket, isLoading, isError, refetch } = useGetTicket(ticketId);
  const addMessageMutation = useAddMessage();
  const rateTicketMutation = useRateTicket();

  const handleSendMessage = useCallback(async (message: string) => {
    try {
      await addMessageMutation.mutateAsync({ ticketId, message });
    } catch {
      showMessage({
        message: 'Erreur',
        description: 'Impossible d\'envoyer le message. Veuillez réessayer.',
        type: 'danger',
      });
    }
  }, [ticketId, addMessageMutation]);

  const handleRate = useCallback(async (rating: number) => {
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
  }, [ticketId, rateTicketMutation]);

  return {
    ticket,
    isLoading,
    isError,
    refetch,
    isSending: addMessageMutation.isPending,
    isRating: rateTicketMutation.isPending,
    handlers: {
      handleSendMessage,
      handleRate,
    },
  };
};
