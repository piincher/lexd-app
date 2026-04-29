/**
 * BadgesScreenContent
 * Scrollable content with summary, categories, and refresh control
 */

import React from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import type { UserBadge, BadgeSummary } from "../api/badgeApi";
import { BadgesScreenSummary } from "./BadgesScreenSummary";
import { BadgeCategorySection } from "./BadgeCategorySection";

interface BadgesScreenContentProps {
  summary?: BadgeSummary;
  volumeBadges: UserBadge[];
  loyaltyBadges: UserBadge[];
  achievementBadges: UserBadge[];
  isRefetching: boolean;
  onRefresh: () => Promise<void>;
}

export const BadgesScreenContent: React.FC<BadgesScreenContentProps> = ({
  summary,
  volumeBadges,
  loyaltyBadges,
  achievementBadges,
  isRefetching,
  onRefresh,
}) => (
  <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl
        refreshing={isRefetching}
        onRefresh={onRefresh}
        tintColor="#d4a843"
        colors={["#d4a843"]}
      />
    }
  >
    {summary && <BadgesScreenSummary summary={summary} />}

    <BadgeCategorySection category="VOLUME" badges={volumeBadges} startIndex={0} />
    <BadgeCategorySection category="LOYALTY" badges={loyaltyBadges} startIndex={volumeBadges.length} />
    <BadgeCategorySection category="ACHIEVEMENT" badges={achievementBadges} startIndex={volumeBadges.length + loyaltyBadges.length} />

    <View style={styles.bottomSpacer} />
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },
  bottomSpacer: { height: 40 },
});
