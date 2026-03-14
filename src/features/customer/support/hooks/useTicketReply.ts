/**
 * useTicketReply Hook
 * Handles sending reply messages to tickets
 */

import { useCallback } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useAddMessage } from './useTickets';

interface UseTicketReplyOptions {
  ticketId: string;
  onSuccess?: () => void;
}

export const useTicketReply = ({ ticketId, onSuccess }: UseTicketReplyOptions) => {
  const addMessageMutation = useAddMessage();

  const sendReply = useCallback(
    async (message: string) => {
      const trimmedMessage = message.trim();
      if (!trimmedMessage) return;

      try {
        await addMessageMutation.mutateAsync({
          ticketId,
          message: trimmedMessage,
        });
        onSuccess?.();
      } catch (error) {
        showMessage({
          message: 'Erreur',
          description: 'Impossible d\'envoyer le message. Veuillez réessayer.',
          type: 'danger',
        });
        throw error;
      }
    },
    [ticketId, addMessageMutation, onSuccess]
  );

  return {
    sendReply,
    isPending: addMessageMutation.isPending,
  };
};
