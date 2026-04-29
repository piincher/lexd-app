import React from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { Announcement } from "../../../types/announcement.types";
import { styles } from "../AnnouncementForm.styles";

interface Props {
  status: Announcement["status"];
  onStatusChange: (value: Announcement["status"]) => void;
}

export const AnnouncementStatusToggle: React.FC<Props> = ({
  status,
  onStatusChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.toggleRow}>
      <Text style={[styles.toggleText, { color: colors.text.primary }]}>
        Publier maintenant
      </Text>
      <Switch
        value={status === "PUBLISHED"}
        onValueChange={(value) => onStatusChange(value ? "PUBLISHED" : "DRAFT")}
      />
    </View>
  );
};
