import React from "react";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { DashboardSkeleton } from "../DashboardSkeleton";

interface DashboardLayoutProps {
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  isLoading,
  refreshing,
  onRefresh,
  children,
}) => {
  const { colors } = useAppTheme();

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background.default }]}
      >
        <DashboardSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.main}
            colors={[colors.primary.main]}
          />
        }
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default DashboardLayout;
