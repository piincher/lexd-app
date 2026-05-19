import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useClientCertificates } from "../../hooks/useClientCertificates";

interface ClientCertificatesSectionProps {
  userId: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: "#D1FAE5", text: "#059669" },
  REVOKED: { bg: "#FEE2E2", text: "#DC2626" },
  EXPIRED: { bg: "#F3F4F6", text: "#6B7280" },
};

export const ClientCertificatesSection: React.FC<ClientCertificatesSectionProps> = ({ userId }) => {
  const { colors } = useAppTheme();
  const { data, isLoading } = useClientCertificates(userId);
  const certificates = data?.certificates ?? [];

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Certificats</Text>
        <Text style={{ color: colors.text.secondary }}>Chargement...</Text>
      </View>
    );
  }

  if (certificates.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.delay(600)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Certificats ({certificates.length})</Text>

      {certificates.map((cert) => {
        const statusStyle = STATUS_COLORS[cert.status] ?? STATUS_COLORS.EXPIRED;
        return (
          <View key={cert._id} style={[styles.row, { borderBottomColor: colors.neutral[200] }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary.main} />
              <View style={styles.rowContent}>
                <Text style={[styles.rowTitle, { color: colors.text.primary }]}>{cert.type}</Text>
                <Text style={[styles.rowMeta, { color: colors.text.secondary }]}>
                  Délivré le {new Date(cert.issuedAt).toLocaleDateString("fr-FR")}
                </Text>
              </View>
            </View>
            <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
              <Text style={[styles.badgeText, { color: statusStyle.text }]}>{cert.status}</Text>
            </View>
          </View>
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

export default ClientCertificatesSection;
