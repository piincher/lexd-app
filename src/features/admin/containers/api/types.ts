/**
 * Admin Container API Types
 * Re-exports API client types and local container types
 */

export { ApiClientError } from '@src/api/client';
export type { ApiResponse, PaginatedResponse } from '@src/api/types';

// Re-export all local container types for convenience
export * from '../types';
