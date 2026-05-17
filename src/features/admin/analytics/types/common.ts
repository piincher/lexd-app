/**
 * Common Analytics Types
 */

export interface PeriodFilter {
  from?: string;
  to?: string;
  period?: '7d' | '30d' | '90d' | '1y';
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
