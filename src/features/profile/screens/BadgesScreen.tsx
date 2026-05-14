/**
 * BadgesScreen
 * Full screen showing all badges in a categorized grid.
 * Categories: Volume, Fidélité, Accomplissement
 */

import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { useBadgesScreen } from "../hooks/useBadgesScreen";
import { styles } from "./BadgesScreen.styles";
import {
  BadgesScreenHeader,
  BadgesScreenContent,
} from "../components";
import { BadgesScreenSkeleton } from "./BadgesScreenSkeleton";

const BadgesScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    data,
    groupedBadges,
    isLoading,
    isRefetching,
    handlers,
  } = useBadgesScreen();

  return (
    <LinearGradient colors={Theme.gradients.dark} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <BadgesScreenHeader
          title="Mes Badges"
          onBack={handlers.goBack}
          rightElement={
            <NotificationBell
              onPress={handlers.navigateToNotifications}
              size={24}
              color={colors.text.inverse}
            />
          }
        />

        {isLoading ? (
          <BadgesScreenSkeleton />
        ) : (
          <BadgesScreenContent
            summary={data?.summary}
            volumeBadges={groupedBadges.volume}
            loyaltyBadges={groupedBadges.loyalty}
            achievementBadges={groupedBadges.achievement}
            isRefetching={isRefetching}
            onRefresh={handlers.handleRefresh}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BadgesScreen;
