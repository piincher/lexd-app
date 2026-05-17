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

export const getStatusStyle = (status: CampaignStatus, colors: any, isDark: boolean) => {
  switch (status) {
    case "scheduled":
      return { bg: isDark ? colors.feedback.infoDark : colors.feedback.infoBg, text: isDark ? colors.feedback.infoBg : colors.status.info };
    case "sending":
      return { bg: isDark ? colors.feedback.warningDark : colors.feedback.warningBg, text: isDark ? colors.feedback.warningBg : colors.status.warning };
    case "sent":
      return { bg: isDark ? colors.feedback.successDark : colors.feedback.successBg, text: isDark ? colors.feedback.successBg : colors.status.success };
    case "cancelled":
      return { bg: isDark ? colors.feedback.errorDark : colors.feedback.errorBg, text: isDark ? colors.feedback.errorBg : colors.status.error };
    default:
      return { bg: isDark ? colors.neutral[700] : colors.neutral[100], text: isDark ? colors.neutral[300] : colors.neutral[500] };
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
