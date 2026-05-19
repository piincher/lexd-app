import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { useClientContainers } from "../../hooks/useClientContainers";

interface ClientContainersSectionProps {
  userId: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: "#D1FAE5", text: "#059669" },
  IN_TRANSIT: { bg: "#DBEAFE", text: "#2563EB" },
  ARRIVED: { bg: "#FEF3C7", text: "#D97706" },
  DELIVERED: { bg: "#E5E7EB", text: "#6B7280" },
};

export const ClientContainersSection: React.FC<ClientContainersSectionProps> = ({ userId }) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const { data, isLoading } = useClientContainers(userId);
  const containers = data?.containers ?? [];

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Conteneurs</Text>
        <Text style={{ color: colors.text.secondary }}>Chargement...</Text>
      </View>
    );
  }

  if (containers.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.delay(625)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Conteneurs ({containers.length})</Text>

      {containers.map((container) => {
        const statusStyle = STATUS_COLORS[container.status] ?? { bg: colors.neutral[100], text: colors.text.secondary };
        return (
          <TouchableOpacity
            key={container._id}
            onPress={() => navigation.navigate("ContainerDetail", { containerId: container._id })}
            style={[styles.row, { borderBottomColor: colors.neutral[200] }]}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="cube-outline" size={20} color={colors.primary.main} />
              <View style={styles.rowContent}>
                <Text style={[styles.rowTitle, { color: colors.text.primary }]}>
                  {container.virtualContainerNumber || container._id.slice(-6)}
                </Text>
                <Text style={[styles.rowMeta, { color: colors.text.secondary }]}>
                  {container.shippingMode} · {container.origin} → {container.destination}
                </Text>
              </View>
            </View>
            <View style={styles.rowRight}>
              <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.badgeText, { color: statusStyle.text }]}>{container.status}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.disabled} />
            </View>
          </TouchableOpacity>
        );
      })}
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
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  rowLeft: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 10,
    flex: 1,
  },
  rowContent: {
    gap: 2,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
  },
  rowMeta: {
    fontSize: 12,
    fontWeight: "500" as const,
  },
  rowRight: {
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

export default ClientContainersSection;
