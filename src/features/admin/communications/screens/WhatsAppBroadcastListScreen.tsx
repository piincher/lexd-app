import React from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, IconButton, ProgressBar, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import type { RootStackScreenProps } from "@src/app/navigation/type";
import { useWhatsAppBroadcasts } from "../hooks/useWhatsAppBroadcasts";
import type { WhatsAppBroadcastSummary } from "../api/whatsappApi";
import {
  BROADCAST_STATUS_LABEL,
  broadcastStatusColor,
  broadcastStatusIcon,
} from "../utils/broadcastStatusMeta";

const formatWhen = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const WhatsAppBroadcastListScreen = ({
  navigation,
}: RootStackScreenProps<"WhatsAppBroadcastList">) => {
  const { colors } = useAppTheme();
  const { broadcasts, isLoading, isRefetching, refetch } = useWhatsAppBroadcasts();

  const renderItem = ({ item }: { item: WhatsAppBroadcastSummary }) => {
    const statusColor = broadcastStatusColor(item.status, colors);
    const done = item.counts.sent + item.counts.failed;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("WhatsAppBroadcastDetail", { broadcastId: item.id })
        }
        style={{
          backgroundColor: colors.background.card,
          borderRadius: Theme.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: Theme.spacing.md,
          marginBottom: Theme.spacing.md,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MaterialCommunityIcons
            name={broadcastStatusIcon(item.status) as any}
            size={18}
            color={statusColor}
          />
          <Text style={{ color: statusColor, fontWeight: "700", fontSize: 12, flex: 1 }}>
            {BROADCAST_STATUS_LABEL[item.status]}
          </Text>
          <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
            {formatWhen(item.createdAt)}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={{ color: colors.text.primary, marginTop: 6, marginBottom: 10 }}
        >
          {item.message?.trim() ||
            (item.mediaCount > 0 ? `📎 ${item.mediaCount} média(s)` : "(sans texte)")}
        </Text>

        <ProgressBar
          progress={item.progress}
          color={statusColor}
          style={{ height: 6, borderRadius: 3, backgroundColor: colors.background.paper }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
            {done}/{item.counts.total} traité(s)
          </Text>
          <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
            <Text style={{ color: colors.status.success }}>{item.counts.sent} ✓</Text>
            {item.counts.failed > 0 ? (
              <Text style={{ color: colors.status.error }}>{`  ${item.counts.failed} ✕`}</Text>
            ) : null}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
            Historique des envois
          </Text>
        </View>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={broadcasts}
          keyExtractor={(b) => b.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: Theme.spacing.lg, flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={colors.primary.main}
            />
          }
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
              <MaterialCommunityIcons
                name="send-outline"
                size={48}
                color={colors.text.disabled}
              />
              <Text style={{ color: colors.text.secondary, marginTop: 12 }}>
                Aucun envoi pour le moment
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default WhatsAppBroadcastListScreen;
