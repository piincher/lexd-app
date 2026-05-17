/**
 * BadgesSection Component - Theme-aware badge display for Profile screen
 */

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { navigationProps } from "@src/navigations/type";
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useProfileBadges } from "../../hooks/useProfileBadges";
import type { UserBadge } from "../../api/badgeApi";
import { BadgeItem } from "./BadgeItem";
import { BadgesSectionSkeleton } from "./BadgesSectionSkeleton";
import { styles } from "./BadgesSection.styles";

export const BadgesSection: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { data, isLoading, error, refetch } = useProfileBadges();
  const { colors, isDark } = useAppTheme();

  const cardBg = colors.background.card;

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <BadgesSectionSkeleton />
      </View>
    );
  }

  if (error) {
    return (
      <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="medal" size={20} color={colors.accent.gold} />
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Mes Badges</Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.warning} />
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Impossible de charger les badges</Text>
          <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
            <Text style={[styles.retryText, { color: colors.accent.gold }]}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  }

  if (!data?.badges?.length) {
    return (
      <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "spring", damping: 15, stiffness: 120 }} style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="medal" size={20} color={colors.accent.gold} />
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Mes Badges</Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="medal-outline" size={40} color={colors.text.disabled} />
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Aucun badge pour le moment</Text>
          <Text style={[styles.emptySubtext, { color: colors.text.disabled }]}>Complétez des commandes pour gagner des badges</Text>
        </View>
      </MotiView>
    );
  }

  const { badges, summary } = data;

  return (
    <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "spring", damping: 15, stiffness: 120 }} style={[styles.card, { backgroundColor: cardBg }]}>
      <TouchableOpacity style={styles.headerRow} onPress={() => navigation.navigate("Badges")} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="medal" size={20} color={colors.accent.gold} />
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Mes Badges</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.countBadge, { backgroundColor: `${colors.accent.gold}20` }]}>
            <Text style={[styles.countText, { color: colors.accent.gold }]}>{summary.earnedCount}/{summary.totalBadges}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.disabled} />
        </View>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesRow}>
        {badges.map((badge: UserBadge) => <BadgeItem key={badge.badgeId} badge={badge} isDark={isDark} colors={colors} />)} 
      </ScrollView>

      <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate("Badges")} activeOpacity={0.7}>
        <Text style={[styles.viewAllText, { color: colors.accent.gold }]}>Voir tous les badges</Text>
        <MaterialCommunityIcons name="arrow-right" size={14} color={colors.accent.gold} />
      </TouchableOpacity>
    </MotiView>
  );
};
