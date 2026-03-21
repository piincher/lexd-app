/**
 * MilestoneBadges Component
 * Displays shipping milestone badges and progress on the Profile screen
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useMilestoneProgress } from "../../hooks/useMilestones";
import type { Milestone } from "../../api/milestoneApi";

const BADGE_SIZE = 50;

const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  "package-variant": "package-variant",
  compass: "compass",
  airplane: "airplane",
  store: "store",
  star: "star",
  diamond: "diamond-stone",
  trophy: "trophy",
};

/**
 * Single badge circle
 */
const BadgeCircle: React.FC<{ milestone: Milestone; isCurrent: boolean }> = ({
  milestone,
  isCurrent,
}) => {
  const iconName = iconMap[milestone.icon] || "help-circle";

  return (
    <View style={styles.badgeWrapper}>
      <View
        style={[
          styles.badgeCircle,
          {
            backgroundColor: milestone.unlocked
              ? `${milestone.color}20`
              : "rgba(255,255,255,0.05)",
            borderColor: milestone.unlocked
              ? milestone.color
              : "rgba(255,255,255,0.15)",
          },
          isCurrent && {
            borderWidth: 2.5,
            shadowColor: milestone.color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 6,
          },
        ]}
      >
        {milestone.unlocked ? (
          <MaterialCommunityIcons
            name={iconName}
            size={22}
            color={milestone.color}
          />
        ) : (
          <MaterialCommunityIcons
            name="lock"
            size={18}
            color="rgba(255,255,255,0.25)"
          />
        )}
      </View>
      <Text
        style={[
          styles.badgeLabel,
          {
            color: milestone.unlocked
              ? "rgba(255,255,255,0.8)"
              : "rgba(255,255,255,0.3)",
          },
        ]}
        numberOfLines={1}
      >
        {milestone.name}
      </Text>
    </View>
  );
};

export const MilestoneBadges: React.FC = () => {
  const { data, isLoading } = useMilestoneProgress();

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const { currentCBM, currentMilestone, nextMilestone, progress, allMilestones } = data;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 120 }}
      style={styles.card}
    >
      {/* Current badge - prominent display */}
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
          <Text style={styles.currentBadgeName}>{currentMilestone.name}</Text>
          <Text style={styles.currentBadgeDescription}>
            {currentMilestone.description}
          </Text>
        </View>
      </View>

      {/* Progress bar toward next milestone */}
      {nextMilestone ? (
        <View style={styles.progressSection}>
          <View style={styles.progressBarTrack}>
            <MotiView
              from={{ width: "0%" }}
              animate={{ width: `${progress}%` as any }}
              transition={{ type: "spring", damping: 20, stiffness: 80 }}
              style={[
                styles.progressBarFill,
                { backgroundColor: nextMilestone.color },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentCBM.toFixed(1)} / {nextMilestone.requiredCBM} CBM — Prochain : {nextMilestone.name}
          </Text>
        </View>
      ) : (
        <Text style={styles.maxLevelText}>
          Niveau maximum atteint !
        </Text>
      )}

      {/* All badges in a horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.badgesRow}
      >
        {allMilestones.map((milestone) => (
          <BadgeCircle
            key={milestone.id}
            milestone={milestone}
            isCurrent={milestone.id === currentMilestone.id}
          />
        ))}
      </ScrollView>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
  },
  loadingText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  // Current badge prominent display
  currentBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  currentBadgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  currentBadgeInfo: {
    flex: 1,
  },
  currentBadgeName: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  currentBadgeDescription: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
  // Progress section
  progressSection: {
    marginBottom: 14,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  maxLevelText: {
    color: "#d4a843",
    fontFamily: Fonts.bold,
    fontSize: 13,
    textAlign: "center",
    marginBottom: 14,
  },
  // Badge row
  badgesRow: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 4,
  },
  badgeWrapper: {
    alignItems: "center",
    width: BADGE_SIZE + 10,
  },
  badgeCircle: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 9,
    marginTop: 4,
    textAlign: "center",
  },
});
