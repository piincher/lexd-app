import { useQuery } from "@tanstack/react-query";
import {
  getWinBackConfigs,
  getWinBackStats,
  getWinBackTrends,
  getWinBackLogs,
  getAtRiskPreview,
  searchUsersForWinBack,
} from "../api/winBackApi";

const CONFIG_KEY = "winback-configs";
const STATS_KEY = "winback-stats";
const TRENDS_KEY = "winback-trends";
const LOGS_KEY = "winback-logs";
const PREVIEW_KEY = "winback-preview";
const USER_SEARCH_KEY = "winback-user-search";

export const useWinBackConfigs = () => {
  return useQuery({
    queryKey: [CONFIG_KEY],
    queryFn: getWinBackConfigs,
  });
};

export const useWinBackStats = (days = 30) => {
  return useQuery({
    queryKey: [STATS_KEY, days],
    queryFn: () => getWinBackStats(days),
  });
};

export const useWinBackTrends = (days = 30) => {
  return useQuery({
    queryKey: [TRENDS_KEY, days],
    queryFn: () => getWinBackTrends(days),
  });
};

export const useWinBackLogs = (params: {
  page?: number;
  limit?: number;
  triggerType?: string;
  responseType?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}) => {
  return useQuery({
    queryKey: [LOGS_KEY, params],
    queryFn: () => getWinBackLogs(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useAtRiskPreview = (triggerType: string, enabled = false) => {
  return useQuery({
    queryKey: [PREVIEW_KEY, triggerType],
    queryFn: () => getAtRiskPreview(triggerType),
    enabled: enabled && !!triggerType,
  });
};

export const useUserSearch = (query: string) => {
  return useQuery({
    queryKey: [USER_SEARCH_KEY, query],
    queryFn: () => searchUsersForWinBack(query),
    enabled: query.trim().length >= 2,
  });
};
