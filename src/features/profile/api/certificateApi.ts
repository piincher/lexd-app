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
};
