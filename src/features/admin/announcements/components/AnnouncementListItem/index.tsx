import React from "react";
import { Alert, Text, View } from "react-native";
import { Button } from "@src/shared/ui/Button";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { Announcement } from "../../types/announcement.types";
import { createStyles } from "./styles";

interface AnnouncementListItemProps {
  item: Announcement;
  onArchive: (id: string) => void;
  isArchiving?: boolean;
}

export const AnnouncementListItem: React.FC<AnnouncementListItemProps> = ({
  item,
  onArchive,
  isArchiving = false,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const confirmArchive = () => {
    Alert.alert("Archiver l'annonce", "Elle ne sera plus affichée aux clients.", [
      { text: "Annuler", style: "cancel" },
      { text: "Archiver", style: "destructive", onPress: () => onArchive(item._id) },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={[styles.status, item.status === "PUBLISHED" && styles.published]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.message} numberOfLines={3}>{item.message}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{item.type}</Text>
        <Text style={styles.meta}>{item.placement}</Text>
        <Text style={styles.meta}>{item.audience}</Text>
      </View>
      {item.status !== "ARCHIVED" && (
        <Button
          title="Archiver"
          variant="outline"
          size="small"
          onPress={confirmArchive}
          loading={isArchiving}
        />
      )}
    </View>
  );
};
