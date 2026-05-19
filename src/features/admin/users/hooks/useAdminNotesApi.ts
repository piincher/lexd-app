import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClientV2 } from '@src/api/client';

export interface AdminNote {
  _id: string;
  text: string;
  createdBy: { firstName: string; lastName: string };
  createdAt: string;
}

const adminNotesKeys = {
  all: (userId: string) => ['adminNotes', userId] as const,
};

export const useAdminNotesQuery = (userId: string) =>
  useQuery<AdminNote[], Error>({
    queryKey: adminNotesKeys.all(userId),
    queryFn: async () => {
      const response = await apiClientV2.get(`/user/${userId}/admin-notes`);
      return response.data.data;
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });

export const useAddAdminNote = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<AdminNote[], Error, string>({
    mutationFn: async (text: string) => {
      const response = await apiClientV2.post(`/user/${userId}/admin-notes`, { text });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminNotesKeys.all(userId) });
    },
  });
};

export const useDeleteAdminNote = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<AdminNote[], Error, string>({
    mutationFn: async (noteId: string) => {
      const response = await apiClientV2.delete(`/user/${userId}/admin-notes/${noteId}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminNotesKeys.all(userId) });
    },
  });
};
