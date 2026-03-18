import { apiClientV2 } from "@src/api/client";

export interface SearchUsersParams {
  query: string;
  limit?: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

export interface SearchUsersResponse {
  success: boolean;
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

/**
 * Search users/clients by phone or name
 * GET /search/clients?q={query}&limit={limit}
 */
export const searchUsers = async (
  params: SearchUsersParams
): Promise<SearchUsersResponse> => {
  const { query, limit = 10 } = params;
  
  const searchParams = new URLSearchParams();
  searchParams.append("q", query);
  searchParams.append("limit", limit.toString());

  const url = `/search/clients?${searchParams.toString()}`;
  console.log(`[searchUsers] Calling: ${url}`);

  try {
    const response = await apiClientV2.get<SearchUsersResponse>(url);
    console.log(`[searchUsers] Response: ${response.data.data.length} users found`);
    return response.data;
  } catch (error) {
    console.error(`[searchUsers] Error:`, error);
    throw error;
  }
};
