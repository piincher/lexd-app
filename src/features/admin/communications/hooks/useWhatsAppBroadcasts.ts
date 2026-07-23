import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import {
  listWhatsAppBroadcasts,
  getWhatsAppBroadcast,
  retryWhatsAppBroadcast,
  cancelWhatsAppBroadcast,
  type BroadcastStatus,
} from "../api/whatsappApi";

const isTerminal = (status?: BroadcastStatus) =>
  status === "completed" || status === "cancelled";

/** History list. Auto-refreshes while any broadcast is still running. */
export const useWhatsAppBroadcasts = () => {
  const query = useQuery({
    queryKey: ["whatsapp", "broadcasts"],
    queryFn: () => listWhatsAppBroadcasts(1, 30),
    refetchInterval: (q) => {
      const items = q.state.data?.broadcasts ?? [];
      return items.some((b) => !isTerminal(b.status)) ? 5000 : false;
    },
  });

  return {
    broadcasts: query.data?.broadcasts ?? [],
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    isError: query.isError,
    refetch: query.refetch,
  };
};

/** Single broadcast with live progress polling + retry/cancel controls. */
export const useWhatsAppBroadcast = (broadcastId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["whatsapp", "broadcast", broadcastId],
    queryFn: () => getWhatsAppBroadcast(broadcastId),
    enabled: !!broadcastId,
    // Poll every 3s while the job is live; stop once it reaches a terminal state.
    refetchInterval: (q) => (isTerminal(q.state.data?.status) ? false : 3000),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["whatsapp", "broadcast", broadcastId] });
    queryClient.invalidateQueries({ queryKey: ["whatsapp", "broadcasts"] });
  };

  const retry = useMutation({
    mutationFn: () => retryWhatsAppBroadcast(broadcastId),
    onSuccess: (data) => {
      showMessage({
        message: "Reprise de l'envoi",
        description: `${data.requeued} destinataire(s) reprogrammé(s).`,
        type: "success",
      });
      invalidate();
    },
    onError: (e: Error) =>
      showMessage({ message: "Échec de la reprise", description: e.message, type: "danger" }),
  });

  const cancel = useMutation({
    mutationFn: () => cancelWhatsAppBroadcast(broadcastId),
    onSuccess: () => {
      showMessage({ message: "Envoi annulé", type: "success" });
      invalidate();
    },
    onError: (e: Error) =>
      showMessage({ message: "Échec de l'annulation", description: e.message, type: "danger" }),
  });

  const broadcast = query.data;
  const failedCount = broadcast?.counts.failed ?? 0;

  // Backend only allows retry once the job is settled (completed/paused), never
  // mid-flight — mirror that so the button doesn't offer an action that 409s.
  const canRetry =
    !!broadcast &&
    failedCount > 0 &&
    (broadcast.status === "completed" || broadcast.status === "paused");

  const canCancel = !!broadcast && !isTerminal(broadcast.status);

  return {
    broadcast,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    retry: retry.mutate,
    isRetrying: retry.isPending,
    cancel: cancel.mutate,
    isCancelling: cancel.isPending,
    canRetry,
    canCancel,
  };
};
