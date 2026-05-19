import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { CampaignRecord } from "../../api/campaignApi";
import {
  formatDate,
  getStatusStyle,
  getStatusLabel,
  getSegmentLabel,
} from "../../lib/campaignHelpers";
import { createStyles } from './CampaignCard.styles';

interface CampaignCardProps {
  campaign: CampaignRecord;
  onCancel: (id: string) => void;
  onSendNow: (id: string) => void;
  isSending: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onCancel,
  onSendNow,
  isSending,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const statusStyle = getStatusStyle(campaign.status, colors, isDark);
  const canAct = campaign.status === "draft" || campaign.status === "scheduled";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {campaign.title}
        </Text>
        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>
            {getStatusLabel(campaign.status)}
          </Text>
        </View>
      </View>

      <Text style={styles.cardBody} numberOfLines={2}>
        {campaign.body}
      </Text>

      <View style={styles.cardMeta}>
        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={13} color={colors.text.secondary} />
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>
            {getSegmentLabel(campaign.targetSegment)}
          </Text>
        </View>
        {campaign.targetSegment === "container_customers" && campaign.containerId && (
          <View style={styles.metaRow}>
            <Ionicons name="cube-outline" size={13} color={colors.text.secondary} />
            <Text style={[styles.metaText, { color: colors.text.secondary }]}>
              Conteneur: {campaign.containerId.slice(-6)}
            </Text>
          </View>
        )}
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={13} color={colors.text.secondary} />
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>
            {formatDate(campaign.scheduledAt)}
          </Text>
        </View>
      </View>

      {campaign.status === "sent" && (
        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            <Text style={{ color: colors.status.success }}>
              {campaign.sentCount} envoyés
            </Text>
            {campaign.failedCount > 0 && (
              <Text style={{ color: colors.status.error }}>
                {" · "}
                {campaign.failedCount} échoués
              </Text>
            )}
          </Text>
        </View>
      )}

      {canAct && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => onSendNow(campaign._id)}
            disabled={isSending}
          >
            {isSending ? (
              <ActivityIndicator size="small" color={colors.text.inverse} />
            ) : (
              <>
                <Ionicons name="send-outline" size={14} color={colors.text.inverse} />
                <Text style={styles.sendBtnText}>Envoyer maintenant</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => onCancel(campaign._id)}
          >
            <Text style={styles.cancelBtnText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
