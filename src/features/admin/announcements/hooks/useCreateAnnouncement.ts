import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementAdminApi } from "../api/announcementAdminApi";
import type { Announcement, CreateAnnouncementInput } from "../types/announcement.types";

const ANNOUNCEMENT_KEY = "admin_announcements";

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation<Announcement, Error, CreateAnnouncementInput>({
    mutationFn: (data) => announcementAdminApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANNOUNCEMENT_KEY] });
    },
  });
};
