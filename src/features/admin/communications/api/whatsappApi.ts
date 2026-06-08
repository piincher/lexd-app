import { apiClientV2 } from "@src/shared/api/client";

export type WhatsAppMediaType = "image" | "document" | "video";

/** Media kind selectable from the gallery for the manual broadcast. */
export type WhatsAppBroadcastMediaType = "image" | "video";

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

// ────────────────────────────────────────────────────────────────────────────
// Broadcast: gallery media upload + personalized bulk send
// ────────────────────────────────────────────────────────────────────────────

/** A local media asset picked from the gallery, before upload. */
export interface WhatsAppLocalMedia {
  uri: string;
  type: WhatsAppBroadcastMediaType;
  fileName: string;
  mimeType: string;
  size?: number;
  duration?: number | null;
  width?: number;
  height?: number;
}

/** A media asset that has been uploaded to Spaces and is ready to send. */
export interface UploadedWhatsAppMedia {
  url: string;
  key: string;
  mediaType: WhatsAppBroadcastMediaType;
  mimeType: string;
  size: number;
  fileName: string;
}

export interface WhatsAppBulkRecipient {
  phone: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface SendWhatsAppBulkPayload {
  recipients: WhatsAppBulkRecipient[];
  message: string;
  media?: { url: string; type: WhatsAppBroadcastMediaType }[];
}

export interface WhatsAppBulkResultItem {
  phone: string;
  name?: string;
  success: boolean;
  skipped: boolean;
  messageId?: string;
  error?: string;
}

export interface WhatsAppBulkSummary {
  total: number;
  sent: number;
  failed: number;
  skipped: number;
  invalidCount: number;
  requested: number;
  results: WhatsAppBulkResultItem[];
}

// Media uploads can be up to 16 MB on slow links — override the default client
// timeout so a large clip isn't aborted mid-flight.
const MEDIA_UPLOAD_TIMEOUT_MS = 120_000;
// A throttled bulk send to hundreds of recipients runs well past the default
// 15s timeout; give it room to return the full per-recipient summary.
const BULK_SEND_TIMEOUT_MS = 5 * 60_000;

/**
 * Upload a single gallery asset (image or video) to DO Spaces via the backend.
 * Returns a signed URL that Wasender fetches at send time.
 */
export const uploadWhatsAppMedia = async (
  media: WhatsAppLocalMedia,
  onProgress?: (percent: number) => void
): Promise<UploadedWhatsAppMedia> => {
  const formData = new FormData();
  formData.append("file", {
    uri: media.uri,
    name: media.fileName,
    type: media.mimeType,
  } as unknown as Blob);

  const response = await apiClientV2.post<ApiResponse<UploadedWhatsAppMedia>>(
    "/whatsapp/upload-media",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: MEDIA_UPLOAD_TIMEOUT_MS,
      onUploadProgress: onProgress
        ? (event) => {
            const percent = event.total
              ? Math.round((event.loaded * 100) / event.total)
              : 0;
            onProgress(percent);
          }
        : undefined,
    }
  );
  return response.data.data;
};

/**
 * Send a personalized message (optionally with media) to many recipients.
 * The backend returns a per-recipient summary even on partial failure.
 */
export const sendWhatsAppBulkMessage = async (
  payload: SendWhatsAppBulkPayload
): Promise<WhatsAppBulkSummary> => {
  const response = await apiClientV2.post<ApiResponse<WhatsAppBulkSummary>>(
    "/whatsapp/send-bulk",
    payload,
    { timeout: BULK_SEND_TIMEOUT_MS }
  );
  return response.data.data;
};
