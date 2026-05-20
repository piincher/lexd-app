import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import type { TicketPreview } from "../../api/ticketApi";

import { getStyles } from "./HelpMyTicketsPreview.styles";

const STATUS_COLORS: Record<string, string> = {
  OPEN: "#EF4444",
  IN_PROGRESS: "#3B82F6",
  WAITING_CUSTOMER: "#F59E0B",
  RESOLVED: "#22C55E",
  CLOSED: "#6B7280",
};

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Ouvert",
  IN_PROGRESS: "En cours",
  WAITING_CUSTOMER: "En attente",
  RESOLVED: "Résolu",
  CLOSED: "Fermé",
};

type HelpMyTicketsPreviewProps = {
  tickets: TicketPreview[];
  isLoading: boolean;
  onViewAll: () => void;
  onViewTicket: (ticketId: string) => void;
};

export function HelpMyTicketsPreview({ tickets, isLoading, onViewAll, onViewTicket }: HelpMyTicketsPreviewProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (isLoading) return null;
  if (tickets.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes tickets</Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>Voir tout</Text>
        </TouchableOpacity>
      </View>
      {tickets.map((ticket) => {
        const statusColor = STATUS_COLORS[ticket.status] || colors.text.disabled;
        const statusLabel = STATUS_LABELS[ticket.status] || ticket.status;
        return (
          <TouchableOpacity
            key={ticket._id}
            style={styles.card}
            onPress={() => onViewTicket(ticket._id)}
            activeOpacity={0.7}
          >
            <View style={styles.row}>
              <MaterialCommunityIcons name="ticket-outline" size={20} color={colors.primary.main} />
              <View style={styles.content}>
                <Text style={styles.subject} numberOfLines={1}>{ticket.subject}</Text>
                <Text style={styles.number}>{ticket.ticketNumber}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: statusColor + "12" }]}>
                <Text style={[styles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
