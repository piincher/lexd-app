import { apiClientV2 } from '@src/shared/api/client';
import type { ActiveEvent } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

/**
 * Fetch the single active event for the given region (if any).
 * Public endpoint — no auth required. Returns null when no event is live
 * (the backend responds 404, which we treat as "no event").
 */
export const getActiveEvent = async (region?: string): Promise<ActiveEvent | null> => {
  try {
    const response = await apiClientV2.get<ApiResponse<ActiveEvent>>('/public/active-event', {
      params: region ? { region } : undefined,
      headers: { skipAuth: 'true' },
    });
    return response.data.data;
  } catch (err) {
    // 404 = no active event; treat as a clean "nothing to show"
    const status = (err as { statusCode?: number })?.statusCode;
    if (status === 404) return null;
    throw err;
  }
};
