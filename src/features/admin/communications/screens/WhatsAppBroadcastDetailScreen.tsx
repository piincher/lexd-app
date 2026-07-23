import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, IconButton, ProgressBar, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import type { RootStackScreenProps } from "@src/app/navigation/type";
import { useWhatsAppBroadcast } from "../hooks/useWhatsAppBroadcasts";
import type { WhatsAppBroadcastRecipient } from "../api/whatsappApi";
import {
  BROADCAST_STATUS_LABEL,
  PAUSE_REASON_LABEL,
  broadcastStatusColor,
  broadcastStatusIcon,
} from "../utils/broadcastStatusMeta";

const Stat = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <View style={{ alignItems: "center", flex: 1 }}>
    <Text style={{ fontSize: 22, fontWeight: "800", color }}>{value}</Text>
    <Text style={{ fontSize: 11, fontWeight: "700", letterSpacing: 0.4, color, opacity: 0.8 }}>
      {label}
    </Text>
  </View>
);

const WhatsAppBroadcastDetailScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"WhatsAppBroadcastDetail">) => {
  const { broadcastId } = route.params;
  const { colors } = useAppTheme();
  const {
    broadcast,
    isLoading,
    isError,
    retry,
    isRetrying,
    cancel,
    isCancelling,
    canRetry,
    canCancel,
  } = useWhatsAppBroadcast(broadcastId);

  const failed: WhatsAppBroadcastRecipient[] =
    broadcast?.recipients?.filter((r) => r.status === "failed") ?? [];

  const statusColor = broadcast ? broadcastStatusColor(broadcast.status, colors) : colors.text.secondary;

  const Header = () => {
    if (!broadcast) return null;
    return (
      <View>
        {/* Status + progress card */}
        <View
          style={{
            backgroundColor: colors.background.card,
            borderRadius: Theme.radius.xl,
            borderWidth: 1,
            borderColor: colors.border,
            padding: Theme.spacing.lg,
            marginBottom: Theme.spacing.md,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons
              name={broadcastStatusIcon(broadcast.status) as any}
              size={20}
              color={statusColor}
            />
            <Text style={{ color: statusColor, fontWeight: "800", fontSize: 15, flex: 1 }}>
              {BROADCAST_STATUS_LABEL[broadcast.status]}
            </Text>
            <Text style={{ color: colors.text.secondary, fontSize: 13, fontVariant: ["tabular-nums"] }}>
              {Math.round(broadcast.progress * 100)}%
            </Text>
          </View>

          <ProgressBar
            progress={broadcast.progress}
            color={statusColor}
            style={{
              height: 8,
              borderRadius: 4,
              marginTop: 12,
              backgroundColor: colors.background.paper,
            }}
          />

          <View style={{ flexDirection: "row", marginTop: Theme.spacing.lg }}>
            <Stat label="ENVOYÉS" value={broadcast.counts.sent} color={colors.status.success} />
            <Stat label="ÉCHECS" value={broadcast.counts.failed} color={colors.status.error} />
            <Stat label="EN ATTENTE" value={broadcast.counts.pending} color={colors.text.secondary} />
            <Stat label="TOTAL" value={broadcast.counts.total} color={colors.text.primary} />
          </View>
        </View>

        {/* Paused banner */}
        {broadcast.status === "paused" && broadcast.pauseReason && (
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: colors.status.warning + "1A",
              borderRadius: Theme.radius.lg,
              padding: Theme.spacing.md,
              marginBottom: Theme.spacing.md,
            }}
          >
            <MaterialCommunityIcons name="pause-circle" size={18} color={colors.status.warning} />
            <Text style={{ color: colors.text.primary, flex: 1, fontSize: 13 }}>
              {PAUSE_REASON_LABEL[broadcast.pauseReason]}
            </Text>
          </View>
        )}

        {/* Message preview */}
        {!!broadcast.message?.trim() && (
          <View
            style={{
              backgroundColor: colors.background.card,
              borderRadius: Theme.radius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              padding: Theme.spacing.md,
              marginBottom: Theme.spacing.md,
            }}
          >
            <Text style={{ color: colors.text.secondary, fontSize: 11, fontWeight: "700", marginBottom: 4 }}>
              MESSAGE
            </Text>
            <Text style={{ color: colors.text.primary }} numberOfLines={4}>
              {broadcast.message}
            </Text>
          </View>
        )}

        {/* Actions */}
        <View style={{ gap: 8, marginBottom: Theme.spacing.md }}>
          {canRetry && (
            <Button
              mode="contained"
              icon="reload"
              loading={isRetrying}
              disabled={isRetrying}
              onPress={() => retry()}
              buttonColor={colors.primary.main}
            >
              Renvoyer les échecs ({broadcast.counts.failed})
            </Button>
          )}
          {canCancel && (
            <Button
              mode="outlined"
              icon="close"
              loading={isCancelling}
              disabled={isCancelling}
              textColor={colors.status.error}
              onPress={() => cancel()}
            >
              Annuler l'envoi
            </Button>
          )}
        </View>

        {failed.length > 0 && (
          <Text style={{ color: colors.text.secondary, fontSize: 12, fontWeight: "700", marginBottom: 8 }}>
            ÉCHECS ({failed.length})
          </Text>
        )}
      </View>
    );
  };

  const renderFailed = ({ item }: { item: WhatsAppBroadcastRecipient }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <MaterialCommunityIcons name="alert-circle-outline" size={18} color={colors.status.error} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
          {item.name || item.phone}
        </Text>
        {item.error ? (
          <Text style={{ color: colors.text.secondary, fontSize: 12 }} numberOfLines={2}>
            {item.error}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }} edges={["top"]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: Theme.spacing.lg,
          paddingVertical: Theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.background.card,
        }}
      >
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, fontWeight: "700", color: colors.text.secondary }}>
            COMMUNICATIONS
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text.primary }}>
            Suivi de l'envoi
          </Text>
        </View>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      ) : isError || !broadcast ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
          <Text style={{ color: colors.text.secondary, marginTop: 12 }}>
            Envoi introuvable
          </Text>
        </View>
      ) : (
        <FlatList
          data={failed}
          keyExtractor={(r, i) => `${r.phone}-${i}`}
          renderItem={renderFailed}
          ListHeaderComponent={Header}
          contentContainerStyle={{ padding: Theme.spacing.lg }}
        />
      )}
    </SafeAreaView>
  );
};

export default WhatsAppBroadcastDetailScreen;
