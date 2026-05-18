/**
 * User API - Feature-based API layer for admin user management
 * Migrated from legacy src/api/auth.tsx
 */
import axiosInstance from "@src/api/client";
import { userData } from "@src/shared/types/user";

const rootUrl = "/user";

export interface UserListFilters {
  role?: string;
  isActive?: boolean;
  search?: string;
  showDeleted?: boolean;
  page?: number;
  limit?: number;
}

export interface UserListResponse {
  success: boolean;
  data: userData[];
  meta: {
    total: number;
    totalActive: number;
    totalBlocked: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserRegistrationRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referralCode?: string;
}

// Fetch all users with filters and pagination
export const fetchAllUsers = async (filters: UserListFilters = {}): Promise<UserListResponse> => {
  const params = new URLSearchParams();
  if (filters.role) params.append("role", filters.role);
  if (filters.isActive !== undefined) params.append("isActive", String(filters.isActive));
  if (filters.search) params.append("search", filters.search);
  if (filters.showDeleted) params.append("showDeleted", "true");
  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));

  const response = await axiosInstance.get<UserListResponse>(`${rootUrl}/allUsers?${params.toString()}`);
  return response.data;
};

// Block or unblock a user
export const blockUnblockUser = async (id: string): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>(`${rootUrl}/blockUser/${id}`, { id });
  return response.data;
};

// Soft delete a user
export const deleteUser = async (id: string): Promise<{ success: boolean; message: string; data?: { userId: string; deletedAt: Date } }> => {
  const response = await axiosInstance.delete(`${rootUrl}/${id}`);
  return response.data;
};

// Get single user by ID
export const getUser = async (id: string): Promise<userData> => {
  const response = await axiosInstance.get<userData>(`${rootUrl}/allUsers/${id}`);
  return response.data;
};

// Admin create user
export const createUser = async (user: UserRegistrationRequest): Promise<{ success: boolean; user: any }> => {
  const response = await axiosInstance.post(`${rootUrl}/admin/create`, { ...user, role: "user" });
  return response.data;
};
