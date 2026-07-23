import type { BroadcastStatus, BroadcastPauseReason } from "../api/whatsappApi";

export const BROADCAST_STATUS_LABEL: Record<BroadcastStatus, string> = {
  queued: "En file",
  sending: "En cours",
  paused: "En pause",
  completed: "Terminé",
  cancelled: "Annulé",
};

export const PAUSE_REASON_LABEL: Record<Exclude<BroadcastPauseReason, null>, string> = {
  quiet_hours: "Heures calmes — reprise automatique au matin",
  hourly_cap: "Limite horaire atteinte — reprise automatique",
  circuit_open: "Service WhatsApp momentanément indisponible — reprise automatique",
  failure_backoff: "Trop d'échecs consécutifs — vérifiez la session WhatsApp",
};

export const broadcastStatusColor = (status: BroadcastStatus, colors: any): string => {
  switch (status) {
    case "completed":
      return colors.status.success;
    case "sending":
      return colors.primary.main;
    case "paused":
      return colors.status.warning;
    case "cancelled":
      return colors.status.error;
    case "queued":
    default:
      return colors.text.secondary;
  }
};

export const broadcastStatusIcon = (status: BroadcastStatus): string => {
  switch (status) {
    case "completed":
      return "check-circle";
    case "sending":
      return "progress-clock";
    case "paused":
      return "pause-circle";
    case "cancelled":
      return "close-circle";
    case "queued":
    default:
      return "tray-full";
  }
};
