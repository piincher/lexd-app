import { apiV2 } from "@src/api/client";

const axios = apiV2;

const BASE_URL = "/customer/certificate";

export interface CertificateProgress {
  currentCBM: number;
  targetCBM: number;
  percentage: number;
  isEligible: boolean;
  isCertified: boolean;
  certificate: {
    _id: string;
    certificateId: string;
    verificationCode: string;
    issuedAt: string;
    certificateUrl: string;
  } | null;
}

export interface CertificateDownload {
  downloadUrl: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export const certificateApi = {
  getProgress: (): Promise<ApiResponse<CertificateProgress>> =>
    axios.get(`${BASE_URL}/progress`),

  getDownloadUrl: (): Promise<ApiResponse<CertificateDownload>> =>
    axios.get(`${BASE_URL}/download`),

  getSecureDownloadUrl: (certificateId: string): Promise<{ data: { url: string } }> =>
    axios.get(`${BASE_URL}/${certificateId}/download`),
};

export const getCertificateDownloadUrl = async (certificateId: string): Promise<string> => {
  const response = await certificateApi.getSecureDownloadUrl(certificateId);
  return response.data.url;
};

// ============================================
// PUBLIC VERIFICATION (No auth required)
// ============================================

export interface VerifiedCertificate {
  certificateId: string;
  holderName: string;
  issuedAt: string;
  status: 'ACTIVE' | 'REVOKED';
  type: 'AUTO' | 'MANUAL';
}

export const verifyCertificatePublic = async (
  verificationCode: string
): Promise<ApiResponse<VerifiedCertificate>> => {
  const response = await axios.get(`${BASE_URL}/verify/${verificationCode}`, {
    headers: { skipAuth: 'true' },
  });
  return response.data;
};
