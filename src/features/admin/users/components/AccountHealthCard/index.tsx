import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { userData } from "@src/shared/types/user";

interface AccountHealthCardProps {
  user: userData | undefined;
}

export const AccountHealthCard: React.FC<AccountHealthCardProps> = ({ user }) => {
  const { colors } = useAppTheme();

  if (!user) return null;

  const isBlocked = user.blocked?.isBlocked ?? false;
  const isInactive = user.isActive === false;
  const isDeleted = !!user.deletedAt;

  if (!isBlocked && !isInactive && !isDeleted) return null;

  return (
    <Animated.View entering={FadeInUp.delay(350)} style={[styles.card, { backgroundColor: colors.status.error + "12", borderColor: colors.status.error + "30" }]}>
      <View style={styles.header}>
        <Ionicons name="warning-outline" size={20} color={colors.status.error} />
        <Text style={[styles.title, { color: colors.status.error }]}>Alertes Compte</Text>
      </View>

      {isBlocked && (
        <View style={styles.alertRow}>
          <Ionicons name="ban-outline" size={16} color={colors.status.error} />
          <View style={styles.alertContent}>
            <Text style={[styles.alertLabel, { color: colors.text.primary }]}>Compte bloqué</Text>
            {user.blocked?.blockedReason && (
              <Text style={[styles.alertDetail, { color: colors.text.secondary }]}>Raison: {user.blocked.blockedReason}</Text>
            )}
            {user.blocked?.blockedAt && (
              <Text style={[styles.alertDetail, { color: colors.text.secondary }]}>Depuis: {new Date(user.blocked.blockedAt).toLocaleDateString("fr-FR")}</Text>
            )}
            {user.blocked?.unblockInstructions && (
              <Text style={[styles.alertDetail, { color: colors.text.secondary }]}>Instructions: {user.blocked.unblockInstructions}</Text>
            )}
          </View>
        </View>
      )}

      {isInactive && (
        <View style={styles.alertRow}>
          <Ionicons name="pause-circle-outline" size={16} color={colors.status.warning} />
          <Text style={[styles.alertText, { color: colors.text.primary }]}>Compte inactif</Text>
        </View>
      )}

      {isDeleted && (
        <View style={styles.alertRow}>
          <Ionicons name="trash-outline" size={16} color={colors.status.error} />
          <Text style={[styles.alertText, { color: colors.text.primary }]}>Supprimé le {new Date(user.deletedAt!).toLocaleDateString("fr-FR")}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = {
  card: {
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    gap: 10,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700" as const,
  },
  alertRow: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
    gap: 10,
    paddingTop: 4,
  },
  alertContent: {
    flex: 1,
    gap: 2,
  },
  alertLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
  },
  alertDetail: {
    fontSize: 12,
    fontWeight: "500" as const,
  },
  alertText: {
    fontSize: 14,
    fontWeight: "600" as const,
    flex: 1,
  },
};

export default AccountHealthCard;
