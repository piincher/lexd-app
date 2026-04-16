import { apiV2 } from "@src/api/client";

const axios = apiV2;

const BASE_URL = "/customer/certificate";

export interface CertificateUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  totalDeliveredCBM: number;
  hasCertificate: boolean;
  certificateType: "AUTO" | "MANUAL" | null;
}

export interface SearchUsersResponse {
  users: CertificateUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IssueCertificateInput {
  userId: string;
  customNote?: string;
}

export interface CertificateRecord {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  certificateId: string;
  verificationCode: string;
  type: "AUTO" | "MANUAL";
  customNote: string | null;
  issuedBy: {
    _id: string;
    firstName: string;
    lastName: string;
  } | null;
  totalCBMAtIssuance: number;
  thresholdCBM: number;
  certificateUrl: string | null;
  status: "ACTIVE" | "REVOKED";
  issuedAt: string;
}

export interface ListCertificatesResponse {
  certificates: CertificateRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export const certificateAdminApi = {
  searchUsers: (q: string, page = 1, limit = 20): Promise<ApiResponse<SearchUsersResponse>> =>
    axios.get(`${BASE_URL}/admin/search-users`, { params: { q, page, limit } }),

  issueCertificate: (data: IssueCertificateInput): Promise<ApiResponse<CertificateRecord>> =>
    axios.post(`${BASE_URL}/admin/issue`, data),

  listCertificates: (params?: { status?: string; type?: string; page?: number; limit?: number }): Promise<ApiResponse<ListCertificatesResponse>> =>
    axios.get(`${BASE_URL}/admin/list`, { params }),

  sendToClient: (certificateId: string): Promise<ApiResponse<CertificateRecord>> =>
    axios.post(`${BASE_URL}/admin/send-to-client`, { certificateId }),

  getDownloadUrl: (certificateId: string): Promise<ApiResponse<{ url: string }>> =>
    axios.get(`${BASE_URL}/${certificateId}/download`),

  revokeCertificate: (certificateId: string): Promise<ApiResponse<CertificateRecord>> =>
    axios.post(`${BASE_URL}/admin/revoke`, { certificateId }),
};

export const getCertificateDownloadUrl = async (certificateId: string): Promise<string> => {
  const response = await certificateAdminApi.getDownloadUrl(certificateId);
  return response.data.data.url;
};
