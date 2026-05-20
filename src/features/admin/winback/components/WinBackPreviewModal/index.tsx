import React from "react";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackPreviewModal.styles";
import { useAtRiskPreview } from "../../hooks/useWinBackQueries";
import type { WinBackConfig } from "../../api/winBackApi";

type WinBackPreviewModalProps = {
  visible: boolean;
  config: WinBackConfig | null;
  onClose: () => void;
};

export function WinBackPreviewModal({ visible, config, onClose }: WinBackPreviewModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  const { data, isLoading } = useAtRiskPreview(config?.triggerType ?? "", visible && !!config);

  return (
    <Modal visible={visible} animationType="slide" transparent presentationStyle="overFullScreen" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {config ? `Aperçu — ${config.triggerType}` : "Aperçu"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary.main} />
              <Text style={styles.loadingText}>Chargement des utilisateurs à risque...</Text>
            </View>
          )}

          {!isLoading && data && (
            <>
              <View style={styles.summaryBar}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>{data.totalAtRisk}</Text>
                  <Text style={styles.summaryLabel}>À risque</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>{data.configLimit}</Text>
                  <Text style={styles.summaryLabel}>Max/jour</Text>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                {data.users.map((user) => (
                  <View key={user._id} style={styles.userRow}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary.main + "15" }]}>
                      <Text style={[styles.avatarText, { color: colors.primary.main }]}>
                        {user.firstName?.[0] || "?"}
                      </Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>
                        {user.firstName} {user.lastName}
                      </Text>
                      <Text style={styles.userPhone}>{user.phoneNumber}</Text>
                      {Object.entries(user.extraData).length > 0 && (
                        <Text style={styles.userExtra}>
                          {Object.entries(user.extraData)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
