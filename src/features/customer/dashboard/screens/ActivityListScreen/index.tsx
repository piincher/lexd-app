import React from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import { FlashList } from '@shopify/flash-list';
import { Appbar, Text, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp } from "react-native-reanimated";

import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetActivity } from "../../hooks/useDashboard";
import { ActivityItem } from "../../types";

const ActivityListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const { data, isLoading, isError, error, refetch } = useGetActivity({ limit: 50 });

  const activities = data?.activities || [];

  const renderItem = ({ item, index }: { item: ActivityItem; index: number }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).duration(400)}
      style={[styles.activityItem, { backgroundColor: colors.background.card }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.primary.light + "20" }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text.primary }]}>{item.title}</Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          {item.description}
        </Text>
        <Text style={[styles.timestamp, { color: colors.text.disabled }]}>
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>
    </Animated.View>
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Activités" />
        </Appbar.Header>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Chargement...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Activités" />
        </Appbar.Header>
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: colors.text.secondary }]}>
            {error?.message || "Impossible de charger les activités"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Historique des activités" />
      </Appbar.Header>

      <FlashList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onPress={refetch} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text.disabled }]}>
              Aucune activité récente
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
  listContent: {
    padding: 16,
  },
  activityItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
});

export default ActivityListScreen;
