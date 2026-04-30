import React from "react";
import { StyleSheet, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useAppTheme } from "@src/providers/ThemeProvider";
import { useGetActivity } from "../../hooks/useDashboard";
import { NotificationBell } from '@src/shared/ui/NotificationBell';

import {
  ActivityListHeader,
  ActivityListItem,
  ActivityListLoading,
  ActivityListError,
  ActivityListEmpty,
} from "../../components";

const ActivityListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const { data, isLoading, isError, error, refetch } = useGetActivity({ limit: 50 });

  const activities = data?.activities || [];

  const notificationBell = (
    <NotificationBell
      onPress={() => navigation.navigate("Notifications" as never)}
      size={24}
      color={colors.text.primary}
    />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
        <ActivityListHeader title="Activités" onBack={() => navigation.goBack()} rightAction={notificationBell} />
        <ActivityListLoading />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
        <ActivityListHeader title="Activités" onBack={() => navigation.goBack()} rightAction={notificationBell} />
        <ActivityListError message={error?.message || "Impossible de charger les activités"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <ActivityListHeader title="Historique des activités" onBack={() => navigation.goBack()} rightAction={notificationBell} />
      <FlashList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <ActivityListItem item={item} index={index} />}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        ListEmptyComponent={<ActivityListEmpty />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});

export default ActivityListScreen;
