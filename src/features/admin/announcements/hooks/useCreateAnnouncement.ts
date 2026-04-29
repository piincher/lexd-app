import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementAdminApi } from "../api/announcementAdminApi";
import type { Announcement, CreateAnnouncementInput } from "../types/announcement.types";
import { ANNOUNCEMENT_KEY } from "./useAnnouncements";

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation<Announcement, Error, CreateAnnouncementInput>({
    mutationFn: (data) => announcementAdminApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANNOUNCEMENT_KEY] });
    },
  });
};

export const useArchiveAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation<Announcement, Error, string>({
    mutationFn: (id) => announcementAdminApi.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANNOUNCEMENT_KEY] });
    },
  });
};
