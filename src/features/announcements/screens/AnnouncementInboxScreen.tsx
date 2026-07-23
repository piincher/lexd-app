import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Screen } from "@src/shared/ui/Screen";
import { Loading } from "@src/shared/ui/Loading";
import { EmptyState } from "@src/shared/ui/EmptyState";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { AnnouncementModal } from "../components/AnnouncementModal";
import { AnnouncementInboxItem } from "../components/AnnouncementInboxItem";
import { useAnnouncementInbox } from "../hooks/useAnnouncementInbox";
import { useAnnouncementDetail } from "../hooks/useAnnouncementDetail";

export const AnnouncementInboxScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    items, isLoading, isError, isRefetching, refetch,
    fetchNextPage, hasMore, isFetchingNextPage, markRead,
  } = useAnnouncementInbox();
  const detail = useAnnouncementDetail((announcement) => markRead(announcement._id));

  if (isLoading) return <Loading message="Chargement des annonces…" fullScreen />;

  return (
    <Screen header={{ title: "Annonces" }} scrollable={false}>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AnnouncementInboxItem announcement={item} onPress={detail.open} />}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary.main} />
        }
        onEndReached={() => {
          if (hasMore && !isFetchingNextPage) void fetchNextPage();
        }}
        onEndReachedThreshold={0.4}
        contentContainerStyle={items.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          isError ? (
            <EmptyState
              title="Erreur de chargement"
              message="Impossible de charger les annonces."
              actionLabel="Réessayer"
              onAction={() => {
                void refetch();
              }}
            />
          ) : (
            <EmptyState
              icon="bell-off-outline"
              title="Aucune annonce"
              message="Les nouvelles annonces apparaîtront ici."
            />
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={colors.primary.main} />
            </View>
          ) : null
        }
      />

      <AnnouncementModal
        announcement={detail.selected}
        visible={!!detail.selected}
        onClose={detail.close}
        onAcknowledge={detail.close}
        onAction={detail.action}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  emptyContainer: { flexGrow: 1, justifyContent: "center" },
  footer: { paddingVertical: 18 },
});

export default AnnouncementInboxScreen;
