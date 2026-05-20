/**
 * Profile Screen — Thin orchestrator composing profile sections
 * Architecture compliant: < 100 lines, composition only
 */

import React, { useCallback, useState } from "react";
import { ScrollView, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";

import { withProtectedRoute } from "@src/hoc/withProtectedRoute";
import type { RootStackParamList } from "@src/navigations/type";
import { navigationRef } from "@src/navigations/navigationRef";
import { useAuth } from "@src/store/Auth";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { isAdminRole } from "@src/shared/lib/roles";
import { useGetCurrentUser, useBalance } from "../hooks/useProfile";
import { useCertificateProgress } from "../hooks/useCertificate";

import { ProfileHeader } from "../components/ProfileHeader";
import { QuickStatsGrid } from "../components/QuickStatsGrid";
import { AchievementsSection } from "../components/AchievementsSection";
import { ProfileSettingsSection } from "../components/ProfileSettingsSection";
import { ProfileFooter } from "../components/ProfileFooter";
import { ProfileChartsSection } from "../components/ProfileChartsSection";
import { LogoutButton } from "../components/LogoutButton";
import { getStyles } from "./Profile.styles";

const ADMIN_PROFILE_ROUTE_MAP: Record<string, keyof RootStackParamList> = {
  PastOrders: "AdminPastOrders",
  MyGoods: "AdminGoodsList",
  MyContainers: "ContainerList",
  TicketList: "AdminTicketList",
};

const Profile = () => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  const logout = useAuth((state) => state.logOut);
  const role = useAuth((state) => state.user?.role);
  const { data, refetch: refetchUser } = useGetCurrentUser();
  const { data: balanceData, refetch: refetchBalance } = useBalance();
  const { data: certificateProgress, isLoading: isCertLoading, error: certError, refetch: refetchCert } = useCertificateProgress();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchUser(), refetchBalance(), refetchCert()]);
    setRefreshing(false);
  }, [refetchUser, refetchBalance, refetchCert]);

  const handleLogout = () => {
    Alert.alert("Se déconnecter", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Se déconnecter", style: "destructive", onPress: logout },
    ]);
  };

  const handleNavigate = useCallback((screen: string) => {
    const target = isAdminRole(role) ? ADMIN_PROFILE_ROUTE_MAP[screen] ?? screen : screen;
    if (navigationRef.isReady()) {
      navigationRef.navigate(target as never);
    }
  }, [role]);

  const balanceFormatted = balanceData?.balance?.toLocaleString("fr-FR") ?? "0";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary.main} colors={[colors.primary.main]} />
        }
      >
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          <ProfileHeader firstName={data?.firstName} lastName={data?.lastName} phoneNumber={data?.phoneNumber} avatarUri={data?.avatar?.url} balanceFormatted={balanceFormatted} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400).springify()}>
          <QuickStatsGrid onNavigate={handleNavigate} />
        </Animated.View>

        <ProfileChartsSection />

        <Animated.View entering={FadeInDown.delay(200).duration(400).springify()}>
          <AchievementsSection certificateProgress={certificateProgress} isCertLoading={isCertLoading} certError={certError} onRetry={refetchCert} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400).springify()}>
          <ProfileSettingsSection onNavigate={handleNavigate} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(400).springify()}>
          <LogoutButton onPress={handleLogout} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(400).springify()}>
          <ProfileFooter />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withProtectedRoute(Profile);
