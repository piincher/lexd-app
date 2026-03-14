/**
 * Token Service
 * 
 * Provides token access for API authentication
 */

import { useAuth } from "@src/store/Auth";

/**
 * Get the current auth token
 */
export const getToken = (): string | null => {
  return useAuth.getState().token;
};

/**
 * Get the auth header value for API requests
 */
export const getAuthHeader = (): string | null => {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
};
