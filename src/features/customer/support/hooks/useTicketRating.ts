/**
 * useTicketRating Hook
 * Handles rating resolved/closed tickets
 */

import { useCallback, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useRateTicket } from './useTickets';
import { Ticket } from '../types';

interface UseTicketRatingOptions {
  ticket: Ticket;
}

export const useTicketRating = ({ ticket }: UseTicketRatingOptions) => {
  const [rating, setRating] = useState(ticket.rating || 0);
  const rateTicketMutation = useRateTicket();

  const canRate = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED';
  const hasRated = !!ticket.rating;

  const submitRating = useCallback(
    async (value: number) => {
      if (!canRate || value === 0) return;

      try {
        await rateTicketMutation.mutateAsync({
          ticketId: ticket._id,
          rating: value,
        });
        showMessage({
          message: 'Merci !',
          description: 'Votre évaluation a été enregistrée.',
          type: 'success',
        });
      } catch (error) {
        showMessage({
          message: 'Erreur',
          description: 'Impossible d\'envoyer l\'évaluation.',
          type: 'danger',
        });
        throw error;
      }
    },
    [ticket._id, canRate, rateTicketMutation]
  );

  return {
    rating,
    setRating,
    submitRating,
    canRate,
    hasRated,
    isPending: rateTicketMutation.isPending,
  };
};
