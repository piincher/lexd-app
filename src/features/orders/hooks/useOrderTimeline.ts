import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@src/api/client";

export type TimelinePeriod = "daily" | "weekly" | "monthly";

export interface TimelineDataPoint {
  label: string;
  total: number;
  manual: number;
  auto: number;
}

export interface OrderTimelineResponse {
  timeline: TimelineDataPoint[];
}

const getOrderTimeline = async (
  period: TimelinePeriod,
  limit: number
): Promise<OrderTimelineResponse> => {
  const params = new URLSearchParams();
  params.append("period", period);
  params.append("limit", limit.toString());

  const response = await apiClient.get<OrderTimelineResponse>(
    `/order/timeline?${params.toString()}`
  );
  return response.data;
};

export const useOrderTimeline = (
  period: TimelinePeriod = "daily",
  limit: number = 30
) => {
  return useQuery<OrderTimelineResponse, Error>({
    queryKey: ["orderTimeline", period, limit],
    queryFn: () => getOrderTimeline(period, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
