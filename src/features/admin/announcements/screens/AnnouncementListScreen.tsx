import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useAdminAnnouncements, useArchiveAnnouncement } from "../hooks";
import { AnnouncementListItem } from "../components";
import type { Announcement } from "../types/announcement.types";
import { createStyles } from "./AnnouncementListScreen.styles";

const FILTERS: { label: string; value?: Announcement["status"] }[] = [
  { label: "Toutes" },
  { label: "Publiées", value: "PUBLISHED" },
  { label: "Brouillons", value: "DRAFT" },
  { label: "Archivées", value: "ARCHIVED" },
];

const AnnouncementListScreen: React.FC<RootStackScreenProps<"AnnouncementList">> = ({
  navigation,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [status, setStatus] = useState<Announcement["status"] | undefined>();
  const { data, isLoading, refetch } = useAdminAnnouncements({ status });
  const archive = useArchiveAnnouncement();
  const announcements = data?.items || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Annonces</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateAnnouncement")}
          style={styles.addButton}
        >
          <Ionicons name="add" size={22} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.label}
            onPress={() => setStatus(filter.value)}
            style={[styles.filterChip, status === filter.value && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, status === filter.value && styles.filterTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={colors.primary.main} />
      ) : (
        <FlashList
          data={announcements}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          onRefresh={refetch}
          refreshing={isLoading}
          ListEmptyComponent={<Text style={styles.empty}>Aucune annonce pour le moment.</Text>}
          renderItem={({ item }) => (
            <AnnouncementListItem
              item={item}
              onEdit={(id) => navigation.navigate("CreateAnnouncement", { announcementId: id })}
              onArchive={(id) => archive.mutate(id)}
              isArchiving={archive.isPending}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default AnnouncementListScreen;
