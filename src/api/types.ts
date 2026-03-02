/**
 * API Types - Enterprise-grade type definitions for API layer
 * Following Clean Architecture principles
 */

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// ============================================
// BASE API RESPONSE TYPES
// ============================================

/**
 * Standard API response wrapper from backend
 * All API responses follow this structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: ApiError | null;
}

/**
 * API Error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// ============================================
// PAGINATION TYPES
// ============================================

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// ============================================
// API CLIENT TYPES
// ============================================

/**
 * HTTP Methods supported
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API Request configuration extending Axios config
 */
export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandling?: boolean;
  retryCount?: number;
}

/**
 * API Error with additional context
 */
export interface ApiException extends AxiosError {
  code?: string;
  userMessage?: string;
}

// ============================================
// SERVICE LAYER ABSTRACTIONS
// ============================================

/**
 * Generic CRUD Service Interface
 * Implement this for any entity service
 */
export interface ICrudService<T, CreateDTO, UpdateDTO> {
  getAll(filters?: Record<string, unknown>): Promise<ApiResponse<T[]>>;
  getById(id: string): Promise<ApiResponse<T>>;
  create(data: CreateDTO): Promise<ApiResponse<T>>;
  update(id: string, data: UpdateDTO): Promise<ApiResponse<T>>;
  delete(id: string): Promise<ApiResponse<void>>;
}

/**
 * Paginated Service Interface
 */
export interface IPaginatedService<T> {
  getPaginated(
    page: number,
    limit: number,
    filters?: Record<string, unknown>
  ): Promise<ApiResponse<PaginatedResponse<T>>>;
}

// ============================================
// QUERY/FILTER TYPES
// ============================================

/**
 * Standard filter options
 */
export interface BaseFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
}

/**
 * API Query Parameters
 */
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}
