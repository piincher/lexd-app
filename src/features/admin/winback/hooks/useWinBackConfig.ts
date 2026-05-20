import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWinBackConfigs, updateWinBackConfig, type WinBackConfig } from "../api/winBackApi";

const CONFIG_KEY = "winback-configs";

export const useWinBackConfigs = () => {
  return useQuery({
    queryKey: [CONFIG_KEY],
    queryFn: getWinBackConfigs,
  });
};

export const useUpdateWinBackConfig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ triggerType, updates }: { triggerType: string; updates: Partial<WinBackConfig> }) =>
      updateWinBackConfig(triggerType, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONFIG_KEY] });
    },
  });
};
