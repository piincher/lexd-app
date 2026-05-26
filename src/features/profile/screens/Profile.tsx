/**
 * Profile Screen — Thin orchestrator composing profile sections
 */

import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";

import { withProtectedRoute } from "@src/hoc/withProtectedRoute";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ProfileHeader } from "../components/ProfileHeader";
import { QuickStatsGrid } from "../components/QuickStatsGrid";
import { AchievementsSection } from "../components/AchievementsSection";
import { ProfileSettingsSection } from "../components/ProfileSettingsSection";
import { ProfileFooter } from "../components/ProfileFooter";
import { ProfileChartsSection } from "../components/ProfileChartsSection";
import { LogoutButton } from "../components/LogoutButton";
import { getStyles } from "./Profile.styles";
import { useProfileScreen } from "./hooks/useProfileScreen";

const Profile = () => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  const profile = useProfileScreen();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={profile.refreshing}
            onRefresh={profile.onRefresh}
            tintColor={colors.primary.main}
            colors={[colors.primary.main]}
          />
        }
      >
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          <ProfileHeader
            firstName={profile.user?.firstName}
            lastName={profile.user?.lastName}
            phoneNumber={profile.user?.phoneNumber}
            avatarUri={profile.user?.avatar?.url}
            balanceFormatted={profile.balanceFormatted}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400).springify()}>
          <QuickStatsGrid onNavigate={profile.handleNavigate} />
        </Animated.View>

        <ProfileChartsSection />

        <Animated.View entering={FadeInDown.delay(200).duration(400).springify()}>
          <AchievementsSection
            certificateProgress={profile.certificateProgress}
            isCertLoading={profile.isCertLoading}
            certError={profile.certError}
            onRetry={profile.refetchCert}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400).springify()}>
          <ProfileSettingsSection onNavigate={profile.handleNavigate} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(400).springify()}>
          <LogoutButton onPress={profile.handleLogout} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(400).springify()}>
          <ProfileFooter />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withProtectedRoute(Profile);
