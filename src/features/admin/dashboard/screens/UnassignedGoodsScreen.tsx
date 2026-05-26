import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationBell } from "@src/shared/ui/NotificationBell";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useUnassignedGoodsScreen } from "./hooks/useUnassignedGoodsScreen";
import { UnassignedGoodsHeader } from "../components/UnassignedGoodsHeader";
import { UnassignedGoodsList } from "../components/UnassignedGoodsList";
import { UnassignedGoodsTriageBento } from "../components/UnassignedGoodsTriageBento";
import { createStyles } from "./UnassignedGoodsScreen.styles";

export const UnassignedGoodsScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const { sortedGoods, isLoading, handleRefresh, stats, handlers } = useUnassignedGoodsScreen();

  // The bento triage panel rides as the FlashList header so it scrolls with the queue —
  // one cohesive surface instead of a fixed banner above a smaller list. Empty state still
  // renders inside the list, with the bento visible above it (which is what we want: even
  // an empty queue gets the "0 en attente / oldest —" readout for confirmation).
  const triageHeader = (
    <UnassignedGoodsTriageBento
      total={stats.total}
      oldestDays={stats.oldestDays}
      airCount={stats.airCount}
      seaCount={stats.seaCount}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <UnassignedGoodsHeader
        onBack={handlers.handleBack}
        total={stats.total}
        rightElement={
          <NotificationBell
            onPress={handlers.handleNotificationPress}
            size={24}
            color={colors.text.primary}
          />
        }
      />
      <UnassignedGoodsList
        data={sortedGoods}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        onItemPress={handlers.handleItemPress}
        ListHeaderComponent={triageHeader}
      />
    </SafeAreaView>
  );
};

export default UnassignedGoodsScreen;
