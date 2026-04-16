import { apiV2 } from "@src/api/client";
import {
  verifyCertificatePublic as verifySharedCertificatePublic,
  type VerifiedCertificate,
} from "@src/shared/api/certificates";

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

  getSecureDownloadUrl: (certificateId: string): Promise<ApiResponse<{ url: string }>> =>
    axios.get(`${BASE_URL}/${certificateId}/download`),
};

export const getCertificateDownloadUrl = async (certificateId: string): Promise<string> => {
  const response = await certificateApi.getSecureDownloadUrl(certificateId);
  return response.data.data.url;
};

// ============================================
// PUBLIC VERIFICATION (No auth required)
// Backward-compatible export path for existing imports.
// ============================================

export const verifyCertificatePublic = async (
  verificationCode: string
): Promise<ApiResponse<VerifiedCertificate>> => {
  return verifySharedCertificatePublic(verificationCode) as Promise<
    ApiResponse<VerifiedCertificate>
  >;
};
