import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClientV2 } from "@src/api/client";

const STATS_KEY = "winback-stats";
const LOGS_KEY = "winback-logs";

export const useTriggerWinBack = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { userId: string; triggerType: string }>({
    mutationFn: async ({ userId, triggerType }) => {
      const res = await apiClientV2.post("/admin/winback/trigger", { userId, triggerType });
      return res.data?.data ?? res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATS_KEY] });
      queryClient.invalidateQueries({ queryKey: [LOGS_KEY] });
    },
  });
};
