import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@src/navigations/type";
import { useAdminAnnouncements, useArchiveAnnouncement } from "../../hooks";
import type { Announcement } from "../../types/announcement.types";
import { AnnouncementListItem } from "../../components";

const FILTERS: { label: string; value?: Announcement["status"] }[] = [
  { label: "Toutes" },
  { label: "Publiées", value: "PUBLISHED" },
  { label: "Brouillons", value: "DRAFT" },
  { label: "Archivées", value: "ARCHIVED" },
];

export const useAnnouncementListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [status, setStatus] = useState<Announcement["status"] | undefined>();
  const { data, isLoading, refetch } = useAdminAnnouncements({ status });
  const archive = useArchiveAnnouncement();
  const announcements = data?.items || [];

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreate = useCallback(() => {
    navigation.navigate("CreateAnnouncement");
  }, [navigation]);

  const handleEdit = useCallback((id: string) => {
    navigation.navigate("CreateAnnouncement", { announcementId: id });
  }, [navigation]);

  const handleArchive = useCallback((id: string) => {
    archive.mutate(id);
  }, [archive]);

  const handleFilterChange = useCallback((value?: Announcement["status"]) => {
    setStatus(value);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Announcement }) => (
      <AnnouncementListItem
        item={item}
        onEdit={handleEdit}
        onArchive={handleArchive}
        isArchiving={archive.isPending}
      />
    ),
    [handleEdit, handleArchive, archive.isPending]
  );

  return {
    status,
    isLoading,
    announcements,
    filters: FILTERS,
    handlers: {
      handleBack,
      handleCreate,
      handleEdit,
      handleArchive,
      handleFilterChange,
      renderItem,
      refetch,
    },
  };
};
