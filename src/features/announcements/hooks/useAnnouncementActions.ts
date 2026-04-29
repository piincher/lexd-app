import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementApi } from "../api/announcementApi";
import { announcementQueryKeys } from "./useActiveAnnouncements";

export const useAnnouncementActions = () => {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: announcementQueryKeys.active });

  const markRead = useMutation({
    mutationFn: announcementApi.markRead,
    onSuccess: refresh,
  });

  const dismiss = useMutation({
    mutationFn: announcementApi.dismiss,
    onSuccess: refresh,
  });

  const acknowledge = useMutation({
    mutationFn: announcementApi.acknowledge,
    onSuccess: refresh,
  });

  return { markRead, dismiss, acknowledge };
};
