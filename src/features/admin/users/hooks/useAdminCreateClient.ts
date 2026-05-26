/**
 * useAdminCreateClient - Inline client creation from the receive-goods flow.
 *
 * When an operator searches for a client and gets no results, they can create the client
 * on the spot via the "Ajouter ce client" CTA. This hook wraps the v1 `POST /user/admin/create`
 * endpoint with React Query, invalidates the search caches so the freshly created client
 * immediately appears in subsequent searches, and surfaces backend conflict errors
 * (e.g. "Cet utilisateur existe déjà") in a typed shape the modal can read.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, type UserRegistrationRequest } from '../api/userApi';
import type { userData } from '@src/shared/types/user';

// Cache keys used by useSearchUsers — invalidating these is what makes the new client
// show up in the receive-goods client search without a manual refresh.
const ALL_USERS_KEY = 'all-users-client-search-v2';
const SERVER_SEARCH_KEY = 'users-server-search';

export type CreateClientError = {
  message: string;
  status?: number;
};

export type CreateClientResult = {
  success: boolean;
  user: userData;
};

export const useAdminCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateClientResult, CreateClientError, UserRegistrationRequest>({
    mutationFn: async (payload) => {
      try {
        const res = await createUser(payload);
        return res as CreateClientResult;
      } catch (err: unknown) {
        const e = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
        const status = e?.response?.status;
        const message =
          e?.response?.data?.message ||
          e?.message ||
          'Création du client échouée';
        // Re-throw as a typed error so the modal can branch on status (409-like conflict).
        const wrapped: CreateClientError = { message, status };
        throw wrapped;
      }
    },
    onSuccess: () => {
      // Drop the search caches so the next keystroke includes the newly-created client.
      queryClient.invalidateQueries({ queryKey: [ALL_USERS_KEY] });
      queryClient.invalidateQueries({ queryKey: [SERVER_SEARCH_KEY] });
    },
  });
};
