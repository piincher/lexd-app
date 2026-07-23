import { useCallback } from "react";
import { useInfiniteQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { announcementApi, type AnnouncementInboxPage } from "../api/announcementApi";
import { announcementQueryKeys } from "./useActiveAnnouncements";
import type { Announcement } from "../types";

export const announcementInboxKey = ["announcements", "inbox"] as const;

const hasNextPage = (page: AnnouncementInboxPage): boolean => {
  const { pagination } = page;
  if (typeof pagination.hasNextPage === "boolean") return pagination.hasNextPage;
  const totalPages = pagination.totalPages ?? pagination.pages ?? 1;
  return pagination.page < totalPages;
};

/**
 * Paginated announcements inbox (a findable history of every active announcement
 * for the user). Read state is tracked per item and updated optimistically so
 * opening an item doesn't trigger a refetch.
 */
export const useAnnouncementInbox = () => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: announcementInboxKey,
    queryFn: ({ pageParam }) => announcementApi.getInbox(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      hasNextPage(lastPage) ? lastPage.pagination.page + 1 : undefined,
  });

  const items: Announcement[] = query.data?.pages.flatMap((page) => page.items) ?? [];
  const unreadCount = items.filter((item) => !item.viewerState?.readAt).length;

  const markRead = useCallback(
    (id: string) => {
      const alreadyRead = items.find((item) => item._id === id)?.viewerState?.readAt;
      if (alreadyRead) return;
      const readAt = new Date().toISOString();
      // Optimistic: stamp readAt in the inbox cache so the row updates instantly.
      queryClient.setQueryData<InfiniteData<AnnouncementInboxPage>>(announcementInboxKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((item) =>
              item._id === id ? { ...item, viewerState: { ...item.viewerState, readAt } } : item,
            ),
          })),
        };
      });
      // Also stamp the active cache so the unread badge (derived from it) drops.
      queryClient.setQueryData<Announcement[]>(announcementQueryKeys.active, (old) =>
        old?.map((item) =>
          item._id === id ? { ...item, viewerState: { ...item.viewerState, readAt } } : item,
        ),
      );
      void announcementApi.markRead(id).catch(() => {});
    },
    [items, queryClient],
  );

  return {
    items,
    unreadCount,
    markRead,
    isLoading: query.isLoading,
    isError: query.isError,
    isRefetching: query.isRefetching,
    refetch: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasMore: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
