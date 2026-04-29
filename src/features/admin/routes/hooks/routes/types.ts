/**
 * Shared types for route hooks
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
