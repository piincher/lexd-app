/**
 * useBadgesScreen
 * Hook for BadgesScreen - handles data fetching, refresh, and derived state
 */

import { useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import type { navigationProps } from "@src/navigations/type";
import { useMyBadges, useCheckBadges } from "./useBadges";
import type { UserBadge, MyBadgesResponse } from "../api/badgeApi";

type GroupedBadges = {
  volume: UserBadge[];
  loyalty: UserBadge[];
  achievement: UserBadge[];
};

export type UseBadgesScreenReturn = {
  data: MyBadgesResponse | undefined;
  groupedBadges: GroupedBadges;
  isLoading: boolean;
  isRefetching: boolean;
  handlers: {
    handleRefresh: () => Promise<void>;
    goBack: () => void;
    navigateToNotifications: () => void;
  };
};

export const useBadgesScreen = (): UseBadgesScreenReturn => {
  const navigation = useNavigation<navigationProps>();
  const { data, isLoading, refetch, isRefetching } = useMyBadges();
  const checkBadges = useCheckBadges();

  const handleRefresh = useCallback(async () => {
    await checkBadges.mutateAsync();
    refetch();
  }, [checkBadges, refetch]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateToNotifications = useCallback(() => {
    navigation.navigate("Notifications" as never);
  }, [navigation]);

  const groupedBadges = useMemo<GroupedBadges>(
    () => ({
      volume: data?.badges.filter((b: UserBadge) => b.category === "VOLUME") || [],
      loyalty: data?.badges.filter((b: UserBadge) => b.category === "LOYALTY") || [],
      achievement: data?.badges.filter((b: UserBadge) => b.category === "ACHIEVEMENT") || [],
    }),
    [data]
  );

  return {
    data,
    groupedBadges,
    isLoading,
    isRefetching,
    handlers: {
      handleRefresh,
      goBack,
      navigateToNotifications,
    },
  };
};
