/**
 * MilestoneBadges Component
 * Displays shipping milestone badges and progress on the Profile screen
 */

import React from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers";
import { useMilestoneProgress } from "../../hooks/useMilestones";
import { BadgeCircle } from "./BadgeCircle";
import { styles, iconMap } from "./MilestoneBadges.styles";

export const MilestoneBadges: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const { data, isLoading, error, refetch } = useMilestoneProgress();
  const cardBg = isDark ? "rgba(255,255,255,0.1)" : colors.background.paper;
  const trackBg = isDark ? "rgba(255,255,255,0.15)" : colors.background.elevated;

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.accent.gold} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>Chargement...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 120 }}
        style={[styles.card, { backgroundColor: cardBg }]}
      >
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={32} color={colors.text.disabled} />
          <Text style={[styles.errorText, { color: colors.text.secondary }]}>
            Impossible de charger les badges
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={[styles.retryText, { color: colors.accent.gold }]}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  }

  if (!data) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 120 }}
        style={[styles.card, { backgroundColor: cardBg }]}
      >
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="trophy-outline" size={32} color={colors.text.disabled} />
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Aucun badge disponible pour le moment
          </Text>
        </View>
      </MotiView>
    );
  }

  const { currentCBM, currentMilestone, nextMilestone, progress, allMilestones } = data;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 120 }}
      style={[styles.card, { backgroundColor: cardBg }]}
    >
      <View style={styles.currentBadgeRow}>
        <View
          style={[
            styles.currentBadgeCircle,
            {
              backgroundColor: `${currentMilestone.color}20`,
              borderColor: currentMilestone.color,
              shadowColor: currentMilestone.color,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={iconMap[currentMilestone.icon] || "help-circle"}
            size={30}
            color={currentMilestone.color}
          />
        </View>
        <View style={styles.currentBadgeInfo}>
          <Text style={[styles.currentBadgeName, { color: colors.text.primary }]}>
            {currentMilestone.name}
          </Text>
          <Text style={[styles.currentBadgeDescription, { color: colors.text.secondary }]}>
            {currentMilestone.description}
          </Text>
        </View>
      </View>

      {nextMilestone ? (
        <View style={styles.progressSection}>
          <View style={[styles.progressBarTrack, { backgroundColor: trackBg }]}>
            <MotiView
              from={{ width: "0%" }}
              animate={{ width: `${progress}%` as any }}
              transition={{ type: "spring", damping: 20, stiffness: 80 }}
              style={[styles.progressBarFill, { backgroundColor: nextMilestone.color }]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.text.secondary }]}>
            {currentCBM.toFixed(1)} / {nextMilestone.requiredCBM} CBM — Prochain : {nextMilestone.name}
          </Text>
        </View>
      ) : (
        <Text style={[styles.maxLevelText, { color: colors.accent.gold }]}>
          Niveau maximum atteint !
        </Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesRow}>
        {allMilestones.map((milestone) => (
          <BadgeCircle
            key={milestone.id}
            milestone={milestone}
            isCurrent={milestone.id === currentMilestone.id}
            isDark={isDark}
            colors={colors}
          />
        ))}
      </ScrollView>
    </MotiView>
  );
};
