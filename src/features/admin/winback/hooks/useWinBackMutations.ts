import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWinBackConfig, manualTriggerWinBack, forceRunWinBack, type WinBackConfig } from "../api/winBackApi";

const CONFIG_KEY = "winback-configs";
const STATS_KEY = "winback-stats";
const LOGS_KEY = "winback-logs";

export const useUpdateWinBackConfig = () => {
  const queryClient = useQueryClient();
  return useMutation<WinBackConfig, Error, { triggerType: string; updates: Partial<WinBackConfig> }>({
    mutationFn: ({ triggerType, updates }) => updateWinBackConfig(triggerType, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONFIG_KEY] });
    },
  });
};

export const useManualTriggerWinBack = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { userId: string; triggerType: string }>({
    mutationFn: ({ userId, triggerType }) => manualTriggerWinBack(userId, triggerType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATS_KEY] });
      queryClient.invalidateQueries({ queryKey: [LOGS_KEY] });
    },
  });
};

export const useForceRunWinBack = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, void>({
    mutationFn: forceRunWinBack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATS_KEY] });
      queryClient.invalidateQueries({ queryKey: [LOGS_KEY] });
    },
  });
};
