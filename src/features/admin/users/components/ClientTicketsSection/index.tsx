import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { useClientTickets } from "../../hooks/useClientTickets";
import {
  ADMIN_TICKET_STATUS_LABELS,
  ADMIN_TICKET_TYPE_LABELS,
  getAdminTicketStatusColors,
} from "../../../support/types";

interface ClientTicketsSectionProps {
  userId: string;
}

export const ClientTicketsSection: React.FC<ClientTicketsSectionProps> = ({ userId }) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const { data, isLoading } = useClientTickets(userId);
  const tickets = data?.tickets ?? [];
  const statusColors = getAdminTicketStatusColors(colors);

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Tickets Support</Text>
        <Text style={{ color: colors.text.secondary }}>Chargement...</Text>
      </View>
    );
  }

  if (tickets.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.delay(550)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Tickets Support ({tickets.length})</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AdminTicketList", { userId })}>
          <Text style={[styles.seeAll, { color: colors.primary.main }]}>Voir tout</Text>
        </TouchableOpacity>
      </View>

      {tickets.slice(0, 3).map((ticket) => (
        <TouchableOpacity
          key={ticket._id}
          onPress={() => navigation.navigate("AdminTicketDetail", { ticketId: ticket._id })}
          style={[styles.ticketRow, { borderBottomColor: colors.neutral[200] }]}
        >
          <View style={styles.ticketLeft}>
            <Text style={[styles.ticketSubject, { color: colors.text.primary }]} numberOfLines={1}>
              {ticket.subject}
            </Text>
            <Text style={[styles.ticketMeta, { color: colors.text.secondary }]}>
              {ticket.ticketNumber} · {ADMIN_TICKET_TYPE_LABELS[ticket.type]}
            </Text>
          </View>
          <View style={styles.ticketRight}>
            <View style={[styles.badge, { backgroundColor: statusColors[ticket.status] + "20" }]}>
              <Text style={[styles.badgeText, { color: statusColors[ticket.status] }]}>
                {ADMIN_TICKET_STATUS_LABELS[ticket.status]}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.text.disabled} />
          </View>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = {
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "600" as const,
  },
  ticketRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  ticketLeft: {
    flex: 1,
    gap: 2,
  },
  ticketSubject: {
    fontSize: 14,
    fontWeight: "600" as const,
  },
  ticketMeta: {
    fontSize: 12,
    fontWeight: "500" as const,
  },
  ticketRight: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
  },
};

export default ClientTicketsSection;
