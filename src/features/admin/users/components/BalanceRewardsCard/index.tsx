import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { userData } from "@src/shared/types/user";

interface BalanceRewardsCardProps {
  user: userData | undefined;
}

export const BalanceRewardsCard: React.FC<BalanceRewardsCardProps> = ({ user }) => {
  const { colors } = useAppTheme();

  if (!user || (user.balance === undefined && user.rewardPoints === undefined)) return null;

  return (
    <Animated.View entering={FadeInUp.delay(375)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Portefeuille & Récompenses</Text>
      <View style={styles.row}>
        <View style={[styles.item, { backgroundColor: colors.primary.main + "12" }]}>
          <Ionicons name="wallet-outline" size={24} color={colors.primary.main} />
          <Text style={[styles.value, { color: colors.primary.main }]}>{(user.balance ?? 0).toLocaleString("fr-FR")} FCFA</Text>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Solde</Text>
        </View>
        <View style={[styles.item, { backgroundColor: colors.status.warning + "12" }]}>
          <Ionicons name="trophy-outline" size={24} color={colors.status.warning} />
          <Text style={[styles.value, { color: colors.status.warning }]}>{user.rewardPoints ?? 0}</Text>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Points</Text>
        </View>
      </View>
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
    marginBottom: 16,
  },
  row: {
    flexDirection: "row" as const,
    gap: 12,
  },
  item: {
    flex: 1,
    alignItems: "center" as const,
    padding: 16,
    borderRadius: 16,
    gap: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: "800" as const,
  },
  label: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
};

export default BalanceRewardsCard;
