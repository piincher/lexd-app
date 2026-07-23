import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { green, semantic } from "@src/shared/constants/brand";


import { getStyles } from "./HelpQuickActions.styles";

const ACTIONS = [
  { key: "track", label: "Suivre", icon: "map-marker-path", color: semantic.info, screen: "CheckRoute" },
  // NOTE: "tickets" keeps its categorical purple — the brand token set has no
  // purple step; remapping it would collide with another category hue.
  { key: "tickets", label: "Tickets", icon: "ticket-outline", color: "#8B5CF6", screen: "TicketList" },
  // WhatsApp third-party brand green — intentional, not a theme token.
  { key: "whatsapp", label: "WhatsApp", icon: "whatsapp", color: "#25D366", screen: null },
  { key: "ticket", label: "Créer ticket", icon: "plus-circle-outline", color: green[500], screen: null },
] as const;

type HelpQuickActionsProps = {
  onTrackOrder: () => void;
  onViewTickets: () => void;
  onWhatsApp: () => void;
  onCreateTicket: () => void;
};

export function HelpQuickActions({ onTrackOrder, onViewTickets, onWhatsApp, onCreateTicket }: HelpQuickActionsProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  const handlers: Record<string, () => void> = {
    track: onTrackOrder,
    tickets: onViewTickets,
    whatsapp: onWhatsApp,
    ticket: onCreateTicket,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions rapides</Text>
      <View style={styles.grid}>
        {ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.key}
            style={styles.card}
            onPress={handlers[action.key]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrapper, { backgroundColor: action.color + "12" }]}>
              <MaterialCommunityIcons
                name={action.icon as React.ComponentProps<typeof MaterialCommunityIcons>["name"]}
                size={24}
                color={action.color}
              />
            </View>
            <Text style={styles.label}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
