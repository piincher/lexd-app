import { apiV2 } from "./client";
import type { ApiResponse } from "./types";

export interface VerifiedCertificate {
  certificateId: string;
  holderName: string;
  issuedAt: string;
  status: "ACTIVE" | "REVOKED";
  type: "AUTO" | "MANUAL";
}

export const verifyCertificatePublic = async (
  verificationCode: string
): Promise<ApiResponse<VerifiedCertificate>> => {
  const response = await apiV2.get(`/public/verify/${verificationCode}`, {
    headers: { skipAuth: "true" },
  });
  return response.data;
};
