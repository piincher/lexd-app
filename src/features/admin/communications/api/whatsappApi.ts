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

// ────────────────────────────────────────────────────────────────────────────
// Background broadcasts (large sends run as a durable, paced job)
// ────────────────────────────────────────────────────────────────────────────

export type BroadcastStatus = "queued" | "sending" | "paused" | "completed" | "cancelled";
export type BroadcastRecipientStatus = "pending" | "sent" | "failed";
export type BroadcastPauseReason =
  | "quiet_hours"
  | "hourly_cap"
  | "circuit_open"
  | "failure_backoff"
  | null;

export interface BroadcastCounts {
  total: number;
  sent: number;
  failed: number;
  pending: number;
}

/** 202 response when a bulk send is accepted for background processing. */
export interface WhatsAppBroadcastAccepted {
  async: true;
  broadcastId: string;
  status: BroadcastStatus;
  total: number;
  invalidCount: number;
  requested: number;
}

export interface WhatsAppBroadcastSummary {
  id: string;
  status: BroadcastStatus;
  message: string;
  mediaCount: number;
  counts: BroadcastCounts;
  progress: number; // 0..1
  pauseReason: BroadcastPauseReason;
  pausedUntil: string | null;
  lastError: string | null;
  createdBy?: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WhatsAppBroadcastRecipient {
  phone: string;
  name?: string;
  status: BroadcastRecipientStatus;
  error?: string;
  attempts: number;
  sentAt?: string;
}

export interface WhatsAppBroadcastDetail extends WhatsAppBroadcastSummary {
  recipients: WhatsAppBroadcastRecipient[];
}

export interface WhatsAppBroadcastListPage {
  broadcasts: WhatsAppBroadcastSummary[];
  pagination: { page: number; limit: number; total: number; pages: number };
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
 * Enqueue a personalized bulk send. The backend always accepts it as a durable
 * background broadcast (202) and returns a broadcastId to poll for progress —
 * the messages drip out at a ban-safe pace on the server.
 */
export const sendWhatsAppBulkMessage = async (
  payload: SendWhatsAppBulkPayload
): Promise<WhatsAppBroadcastAccepted> => {
  const response = await apiClientV2.post<ApiResponse<WhatsAppBroadcastAccepted>>(
    "/whatsapp/send-bulk",
    payload,
    { timeout: BULK_SEND_TIMEOUT_MS }
  );
  return response.data.data;
};

/** Paginated history of background broadcasts. */
export const listWhatsAppBroadcasts = async (
  page = 1,
  limit = 20
): Promise<WhatsAppBroadcastListPage> => {
  const response = await apiClientV2.get<ApiResponse<WhatsAppBroadcastListPage>>(
    "/whatsapp/broadcasts",
    { params: { page, limit } }
  );
  return response.data.data;
};

/** One broadcast with per-recipient progress (poll this for the progress screen). */
export const getWhatsAppBroadcast = async (
  id: string
): Promise<WhatsAppBroadcastDetail> => {
  const response = await apiClientV2.get<ApiResponse<WhatsAppBroadcastDetail>>(
    `/whatsapp/broadcasts/${id}`
  );
  return response.data.data;
};

/** Re-queue every failed recipient and resume the broadcast. */
export const retryWhatsAppBroadcast = async (
  id: string
): Promise<WhatsAppBroadcastSummary & { requeued: number }> => {
  const response = await apiClientV2.post<ApiResponse<WhatsAppBroadcastSummary & { requeued: number }>>(
    `/whatsapp/broadcasts/${id}/retry`
  );
  return response.data.data;
};

/** Cancel a broadcast. Already-sent recipients are unaffected. */
export const cancelWhatsAppBroadcast = async (
  id: string
): Promise<WhatsAppBroadcastSummary> => {
  const response = await apiClientV2.post<ApiResponse<WhatsAppBroadcastSummary>>(
    `/whatsapp/broadcasts/${id}/cancel`
  );
  return response.data.data;
};
