/**
 * Consignee Entity Model
 * Core domain types for the Consignee entity
 */

// ============================================
// CORE CONSIGNEE ENTITY
// ============================================

export interface Consignee {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  warehouseAddress: string;
  isActive: boolean;
  userId?: string;
  assignedContainersCount?: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// DTOs
// ============================================

export interface CreateConsigneeInput {
  name: string;
  phone: string;
  email?: string;
  warehouseAddress: string;
}

export interface UpdateConsigneeInput {
  name?: string;
  phone?: string;
  email?: string;
  warehouseAddress?: string;
  isActive?: boolean;
}

// ============================================
// FILTERS & RESPONSES
// ============================================

export interface GetConsigneesParams {
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ConsigneeListResponse {
  consignees: Consignee[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ============================================
// CONSIGNEE INFO (used in containers / airway bills)
// ============================================

export interface ConsigneeInfo {
  _id: string;
  name: string;
  phone: string;
  warehouseAddress: string;
  email?: string;
  businessHours?: string;
}
