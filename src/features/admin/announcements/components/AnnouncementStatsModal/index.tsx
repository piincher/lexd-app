import React from "react";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AnnouncementStatsModal.styles";
import { useAnnouncementReceiptStats } from "../../hooks/useAnnouncements";

type AnnouncementStatsModalProps = {
  visible: boolean;
  announcementId: string | null;
  onClose: () => void;
};

function StatBox({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={[styles.statBox, { borderColor: color + "30" }]}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
      <Text style={[styles.statValue, { color }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function AnnouncementStatsModal({ visible, announcementId, onClose }: AnnouncementStatsModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  const { data: stats, isLoading } = useAnnouncementReceiptStats(announcementId ?? "", visible && !!announcementId);

  return (
    <Modal visible={visible} animationType="slide" transparent presentationStyle="overFullScreen" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {stats?.title || "Statistiques"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary.main} />
              <Text style={styles.loadingText}>Chargement des statistiques...</Text>
            </View>
          )}

          {!isLoading && stats && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
              <View style={styles.statsGrid}>
                <StatBox label="Livré" value={String(stats.totalDelivered)} icon="send" color={colors.primary.main} />
                <StatBox label="Lu" value={String(stats.read)} icon="eye-check" color={colors.status.success} />
                <StatBox label="Ignoré" value={String(stats.dismissed)} icon="close-circle" color={colors.status.error} />
                <StatBox label="Accusé" value={String(stats.acknowledged)} icon="check-circle" color={colors.status.info} />
              </View>

              {/* Rates */}
              <View style={styles.ratesContainer}>
                <Text style={styles.ratesTitle}>Taux d&apos;engagement</Text>
                <View style={styles.rateRow}>
                  <Text style={styles.rateLabel}>Taux de lecture</Text>
                  <View style={styles.rateBarTrack}>
                    <View style={[styles.rateBarFill, { width: `${Math.min(stats.readRate, 100)}%`, backgroundColor: colors.status.success }]} />
                  </View>
                  <Text style={styles.rateValue}>{stats.readRate}%</Text>
                </View>
                <View style={styles.rateRow}>
                  <Text style={styles.rateLabel}>Taux d&apos;ignorance</Text>
                  <View style={styles.rateBarTrack}>
                    <View style={[styles.rateBarFill, { width: `${Math.min(stats.dismissRate, 100)}%`, backgroundColor: colors.status.error }]} />
                  </View>
                  <Text style={styles.rateValue}>{stats.dismissRate}%</Text>
                </View>
                <View style={styles.rateRow}>
                  <Text style={styles.rateLabel}>Taux d&apos;accusé</Text>
                  <View style={styles.rateBarTrack}>
                    <View style={[styles.rateBarFill, { width: `${Math.min(stats.ackRate, 100)}%`, backgroundColor: colors.status.info }]} />
                  </View>
                  <Text style={styles.rateValue}>{stats.ackRate}%</Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}
