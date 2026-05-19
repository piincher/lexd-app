import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useUnassignedGoodsScreen } from "./hooks/useUnassignedGoodsScreen";
import { UnassignedGoodsHeader } from "../components/UnassignedGoodsHeader";
import { UnassignedGoodsList } from "../components/UnassignedGoodsList";
import { createStyles } from "./UnassignedGoodsScreen.styles";

export const UnassignedGoodsScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { sortedGoods, isLoading, handleRefresh, handlers } = useUnassignedGoodsScreen();

  return (
    <SafeAreaView style={styles.container}>
      <UnassignedGoodsHeader
        onBack={handlers.handleBack}
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
      />
    </SafeAreaView>
  );
};

export default UnassignedGoodsScreen;
