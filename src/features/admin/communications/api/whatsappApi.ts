import { apiClientV2 } from "@src/shared/api/client";

export type WhatsAppMediaType = "image" | "document" | "video";

export interface SendWhatsAppPayload {
  phone: string;
  message: string;
}

export interface SendWhatsAppMediaPayload extends SendWhatsAppPayload {
  mediaUrl: string;
  mediaType: WhatsAppMediaType;
}

export interface WhatsAppConfig {
  enabled: boolean;
  baseURL: string;
  note?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

export const getWhatsAppConfig = async (): Promise<WhatsAppConfig> => {
  const response = await apiClientV2.get<ApiResponse<WhatsAppConfig>>("/whatsapp/config");
  return response.data.data;
};

export const sendWhatsAppMessage = async (
  payload: SendWhatsAppPayload
): Promise<{ messageId?: string }> => {
  const response = await apiClientV2.post<ApiResponse<{ messageId?: string }>>(
    "/whatsapp/send",
    payload
  );
  return response.data.data;
};

export const sendWhatsAppMediaMessage = async (
  payload: SendWhatsAppMediaPayload
): Promise<{ messageId?: string }> => {
  const response = await apiClientV2.post<ApiResponse<{ messageId?: string }>>(
    "/whatsapp/send-media",
    payload
  );
  return response.data.data;
};
