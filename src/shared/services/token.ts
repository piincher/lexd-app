/**
 * Token Service
 *
 * Provides token access for API authentication
 */

import { getAuthStoreRef } from "@src/shared/api/authStoreRef";

/**
 * Get the current auth token
 */
export const getToken = (): string | null => {
  return getAuthStoreRef()?.getState().token || null;
};

/**
 * Get the auth header value for API requests
 */
export const getAuthHeader = (): string | null => {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
};
