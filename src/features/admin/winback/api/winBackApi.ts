import { apiV2 } from "@src/api/client";

const BASE_URL = "/admin/winback";

export type TriggerType = "NO_SHIPMENT_30D" | "NO_APP_OPEN_14D" | "GOODS_UNPAID" | "INVOICE_ABANDONED";
export type Channel = "push" | "whatsapp" | "in_app";
export type ResponseType = "APP_OPEN" | "PAYMENT" | "ORDER_CREATED" | "PROMO_USED" | "NONE";

export interface WinBackConfig {
  _id: string;
  triggerType: TriggerType;
  enabled: boolean;
  priority: number;
  cooldownDays: number;
  globalCooldownDays: number;
  messageTemplatePush: { title: string; body: string };
  messageTemplateWhatsApp: string;
  messageTemplateInApp: { title: string; body: string; actionLabel: string; actionScreen: string };
  includePromoCode: boolean;
  promoCodeType: "PERCENTAGE" | "FIXED_AMOUNT";
  promoCodeValue: number;
  promoCodeExpiryDays: number;
  channels: Channel[];
  quietHoursRespected: boolean;
  maxPerDay: number;
  conditions: {
    minDaysSinceLastShipment: number;
    minDaysSinceLastAppOpen: number;
    minDaysSinceLastInvoice: number;
    minDaysSinceLastPayment: number;
  };
}

export interface WinBackLog {
  _id: string;
  userId: { _id: string; firstName: string; lastName: string; phoneNumber: string } | null;
  triggerType: string;
  sentAt: string;
  channelsSent: string[];
  respondedAt: string | null;
  responseType: ResponseType;
  responseValue: number;
  messageSnapshot: { title: string; body: string; whatsappText?: string };
  promoCodeId: { code: string } | null;
  dedupeKey: string;
}

export interface WinBackStats {
  triggerType: string;
  totalSent: number;
  responded: number;
  responseRate: number;
  totalResponseValue: number;
  avgResponseValue: number;
}

export interface WinBackStatsResponse {
  period: { startDate: string; endDate: string };
  overall: {
    totalSent: number;
    totalResponded: number;
    totalPending: number;
    responseRate: number;
    totalRevenue: number;
  };
  byTrigger: WinBackStats[];
  channels: Record<string, number>;
}

export interface WinBackTrend {
  _id: string;
  sent: number;
  responded: number;
  revenue: number;
}

export interface AtRiskUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  extraData: Record<string, string>;
}

export interface AtRiskPreview {
  triggerType: string;
  totalAtRisk: number;
  configLimit: number;
  users: AtRiskUser[];
}

export interface SearchUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  isActive: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ── API ──────────────────────────────────────────────────────────────────

export const getWinBackConfigs = async (): Promise<WinBackConfig[]> => {
  const res = await apiV2.get(`${BASE_URL}/config`);
  return res.data.data;
};

export const updateWinBackConfig = async (
  triggerType: string,
  updates: Partial<WinBackConfig>
): Promise<WinBackConfig> => {
  const res = await apiV2.put(`${BASE_URL}/config/${triggerType}`, updates);
  return res.data.data;
};

export const getWinBackLogs = async (params?: {
  page?: number;
  limit?: number;
  triggerType?: string;
  responseType?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<PaginatedResponse<WinBackLog>> => {
  const res = await apiV2.get(`${BASE_URL}/logs`, { params });
  return res.data;
};

export const getWinBackStats = async (days = 30): Promise<WinBackStatsResponse> => {
  const res = await apiV2.get(`${BASE_URL}/stats`, { params: { days } });
  return res.data.data;
};

export const getWinBackTrends = async (days = 30): Promise<WinBackTrend[]> => {
  const res = await apiV2.get(`${BASE_URL}/trends`, { params: { days } });
  return res.data.data;
};

export const getAtRiskPreview = async (triggerType: string, limit = 50): Promise<AtRiskPreview> => {
  const res = await apiV2.get(`${BASE_URL}/preview/${triggerType}`, { params: { limit } });
  return res.data.data;
};

export const searchUsersForWinBack = async (query: string, limit = 10): Promise<SearchUser[]> => {
  const res = await apiV2.get(`${BASE_URL}/users/search`, { params: { q: query, limit } });
  return res.data.data;
};

export const manualTriggerWinBack = async (userId: string, triggerType: string): Promise<unknown> => {
  const res = await apiV2.post(`${BASE_URL}/trigger`, { userId, triggerType });
  return res.data.data;
};

export const forceRunWinBack = async (): Promise<unknown> => {
  const res = await apiV2.post(`${BASE_URL}/run`);
  return res.data.data;
};
