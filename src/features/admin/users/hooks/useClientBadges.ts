import { useMemo } from "react";
import { userData } from "@src/shared/types/user";

export interface ClientBadge {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

/**
 * Compute badges for a client based on their data and orders.
 */
export const useClientBadges = (
  client: userData,
  orderCount?: number,
  lastOrderDate?: string | null
): ClientBadge[] => {
  return useMemo(() => {
    const badges: ClientBadge[] = [];

    if (client.blocked?.isBlocked) {
      badges.push({ label: "Bloqué", color: "#DC2626", bgColor: "#FEF2F2", icon: "ban" });
      return badges;
    }

    const daysSinceJoin = client._id
      ? (Date.now() - new Date(parseInt(client._id.substring(0, 8), 16) * 1000).getTime()) / (1000 * 60 * 60 * 24)
      : 999;

    if (daysSinceJoin < 7) {
      badges.push({ label: "Nouveau", color: "#3B82F6", bgColor: "#EFF6FF", icon: "sparkles" });
    }

    if (orderCount && orderCount >= 10) {
      badges.push({ label: "VIP", color: "#F5A524", bgColor: "#FEF8EC", icon: "diamond" });
    }

    if (lastOrderDate) {
      const daysSinceOrder = (Date.now() - new Date(lastOrderDate).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceOrder > 90) {
        badges.push({ label: "Inactif", color: "#9CA3AF", bgColor: "#F3F4F6", icon: "time" });
      }
    } else if (orderCount === 0) {
      badges.push({ label: "Aucune cmd", color: "#9CA3AF", bgColor: "#F3F4F6", icon: "cart" });
    }

    return badges;
  }, [client, orderCount, lastOrderDate]);
};
