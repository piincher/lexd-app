import type { CampaignStatus } from "../api/campaignApi";

export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
};

export const getStatusStyle = (status: CampaignStatus, isDark: boolean) => {
  switch (status) {
    case "scheduled":
      return { bg: isDark ? "#1E3A8A" : "#DBEAFE", text: isDark ? "#93C5FD" : "#1D4ED8" };
    case "sending":
      return { bg: isDark ? "#78350F" : "#FEF3C7", text: isDark ? "#FCD34D" : "#D97706" };
    case "sent":
      return { bg: isDark ? "#14532D" : "#DCFCE7", text: isDark ? "#86EFAC" : "#15803D" };
    case "cancelled":
      return { bg: isDark ? "#7F1D1D" : "#FEE2E2", text: isDark ? "#FCA5A5" : "#DC2626" };
    default:
      return { bg: isDark ? "#374151" : "#F3F4F6", text: isDark ? "#D1D5DB" : "#6B7280" };
  }
};

export const getStatusLabel = (status: CampaignStatus): string => {
  switch (status) {
    case "draft":
      return "Brouillon";
    case "scheduled":
      return "Planifié";
    case "sending":
      return "En cours";
    case "sent":
      return "Envoyé";
    case "cancelled":
      return "Annulé";
    default:
      return status;
  }
};

export const getSegmentLabel = (segment: string): string => {
  switch (segment) {
    case "all":
      return "Tous les clients";
    case "active_customers":
      return "Clients actifs";
    case "inactive_customers":
      return "Clients inactifs";
    case "container_customers":
      return "Clients d'un conteneur";
    default:
      return segment;
  }
};

export type FilterKey = "all" | CampaignStatus;

export const FILTERS: { label: string; key: FilterKey; value?: CampaignStatus }[] = [
  { label: "Tous", key: "all" },
  { label: "Brouillon", key: "draft", value: "draft" },
  { label: "Planifié", key: "scheduled", value: "scheduled" },
  { label: "Envoyé", key: "sent", value: "sent" },
  { label: "Annulé", key: "cancelled", value: "cancelled" },
];
