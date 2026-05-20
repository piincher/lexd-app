import { apiClientV2 } from "@src/shared/api/client";

export interface AppVersionSettings {
  _id?: string;
  minVersionAndroid: string;
  minVersionIos: string;
  latestVersionAndroid: string;
  latestVersionIos: string;
  forceUpdateAndroid: boolean;
  forceUpdateIos: boolean;
  updateMessage: string;
  storeUrlAndroid: string;
  storeUrlIos: string;
  rolloutPercentage: number;
  forceUpdateAt?: string | null;
  versionGateWhitelist?: string[];
}

export interface VersionBreakdownItem {
  platform: string;
  version: string;
  count: number;
}

export interface VersionGateStats {
  v1Calls: number;
  totalOldVersionDetections: number;
  since: string;
  oldVersionsDetected: {
    android: Record<string, number>;
    ios: Record<string, number>;
  };
  breakdown: VersionBreakdownItem[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

const BASE_URL = "/admin/app-versions";

export const getAppVersionSettings = async (): Promise<AppVersionSettings> => {
  const response = await apiClientV2.get<ApiResponse<AppVersionSettings>>(BASE_URL);
  return response.data.data;
};

export const updateAppVersionSettings = async (
  settings: Partial<AppVersionSettings>
): Promise<AppVersionSettings> => {
  const response = await apiClientV2.put<ApiResponse<AppVersionSettings>>(
    BASE_URL,
    settings
  );
  return response.data.data;
};

export const getVersionGateStats = async (): Promise<VersionGateStats> => {
  const response = await apiClientV2.get<ApiResponse<VersionGateStats>>(
    `${BASE_URL}/stats`
  );
  return response.data.data;
};

export const resetVersionGateStats = async (): Promise<void> => {
  await apiClientV2.post(`${BASE_URL}/stats/reset`);
};
