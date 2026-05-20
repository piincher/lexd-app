import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@src/navigations/type";
import { useAdminAnnouncements, useArchiveAnnouncement, useAnnouncementStats } from "../../hooks";
import type { Announcement } from "../../types/announcement.types";

export const useAnnouncementListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [placementFilter, setPlacementFilter] = useState("all");
  const [statsAnnouncementId, setStatsAnnouncementId] = useState<string | null>(null);

  const { data: statsData, isLoading: statsLoading } = useAnnouncementStats();
  const { data, isLoading, refetch } = useAdminAnnouncements({
    page,
    limit: 20,
    status: statusFilter === "all" ? undefined : (statusFilter as Announcement["status"]),
    type: typeFilter === "all" ? undefined : (typeFilter as Announcement["type"]),
    placement: placementFilter === "all" ? undefined : (placementFilter as Announcement["placement"]),
    search: search || undefined,
  });
  const archive = useArchiveAnnouncement();

  const announcements = data?.items || [];
  const pagination = data?.pagination || { page: 1, limit: 20, total: 0, pages: 1 };

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);
  const handleCreate = useCallback(() => navigation.navigate("CreateAnnouncement"), [navigation]);
  const handleEdit = useCallback((id: string) => navigation.navigate("CreateAnnouncement", { announcementId: id }), [navigation]);
  const handleArchive = useCallback((id: string) => archive.mutate(id), [archive]);

  const handleSearchChange = useCallback((value: string) => { setSearch(value); setPage(1); }, []);
  const handleStatusFilterChange = useCallback((key: string) => { setStatusFilter(key); setPage(1); }, []);
  const handleTypeFilterChange = useCallback((key: string) => { setTypeFilter(key); setPage(1); }, []);
  const handlePlacementFilterChange = useCallback((key: string) => { setPlacementFilter(key); setPage(1); }, []);

  const handleNextPage = useCallback(() => {
    if (page < pagination.pages) setPage((p) => p + 1);
  }, [page, pagination.pages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) setPage((p) => p - 1);
  }, [page]);

  return {
    stats: statsData,
    statsLoading,
    announcements,
    isLoading,
    page,
    totalPages: pagination.pages,
    search,
    statusFilter,
    typeFilter,
    placementFilter,
    statsAnnouncementId,
    setStatsAnnouncementId,
    handlers: {
      handleBack,
      handleCreate,
      handleEdit,
      handleArchive,
      handleSearchChange,
      handleStatusFilterChange,
      handleTypeFilterChange,
      handlePlacementFilterChange,
      handleNextPage,
      handlePrevPage,
      refetch,
    },
  };
};
