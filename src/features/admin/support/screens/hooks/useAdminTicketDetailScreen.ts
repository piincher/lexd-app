import { useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useAdminTicket, useAdminTicketReply, useAdminTicketStatusUpdate } from '../../hooks';
import type { AdminTicketStatus } from '../../types';

export const useAdminTicketDetailScreen = (ticketId: string) => {
  const { data: ticket, isLoading, isError, refetch, isFetching } = useAdminTicket(ticketId);
  const replyMutation = useAdminTicketReply();
  const statusMutation = useAdminTicketStatusUpdate();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleReply = useCallback(
    async (message: string) => {
      try {
        await replyMutation.mutateAsync({ ticketId, message });
      } catch {
        showMessage({ message: 'Erreur', description: "Impossible d'envoyer la réponse.", type: 'danger' });
      }
    },
    [replyMutation, ticketId]
  );

  const handleStatus = useCallback(
    async (status: AdminTicketStatus) => {
      try {
        await statusMutation.mutateAsync({ ticketId, status });
        showMessage({ message: 'Ticket mis à jour', type: 'success' });
      } catch {
        showMessage({ message: 'Erreur', description: 'Impossible de changer le statut.', type: 'danger' });
      }
    },
    [statusMutation, ticketId]
  );

  const handleCall = useCallback((phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      showMessage({ message: 'Erreur', description: "Impossible d'ouvrir l'appel.", type: 'danger' });
    });
  }, []);

  return {
    ticket,
    isLoading,
    isError,
    refreshing,
    isFetching,
    isReplyPending: replyMutation.isPending,
    isStatusPending: statusMutation.isPending,
    handlers: {
      handleRefresh,
      handleReply,
      handleStatus,
      handleCall,
    },
  };
};
