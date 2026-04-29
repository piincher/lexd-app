import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Input } from "@src/shared/ui/Input";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { Announcement } from "../../types/announcement.types";
import { styles } from "./AnnouncementForm.styles";

interface Props {
  type: Announcement["type"];
  placement: Announcement["placement"];
  audience: Announcement["audience"];
  priority: string;
  onTypeChange: (value: Announcement["type"]) => void;
  onPlacementChange: (value: Announcement["placement"]) => void;
  onAudienceChange: (value: Announcement["audience"]) => void;
  onPriorityChange: (value: string) => void;
}

export const AnnouncementSelectFields: React.FC<Props> = ({
  type,
  placement,
  audience,
  priority,
  onTypeChange,
  onPlacementChange,
  onAudienceChange,
  onPriorityChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <>
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Type</Text>
          <Picker selectedValue={type} onValueChange={onTypeChange} style={styles.picker}>
            <Picker.Item label="Info" value="INFO" />
            <Picker.Item label="Urgent" value="URGENT" />
            <Picker.Item label="Warning" value="WARNING" />
            <Picker.Item label="Maintenance" value="MAINTENANCE" />
            <Picker.Item label="Promotion" value="PROMOTION" />
            <Picker.Item label="Success" value="SUCCESS" />
          </Picker>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Placement</Text>
          <Picker selectedValue={placement} onValueChange={onPlacementChange} style={styles.picker}>
            <Picker.Item label="Top banner" value="TOP_BANNER" />
            <Picker.Item label="Modal" value="MODAL" />
            <Picker.Item label="Home card" value="HOME_CARD" />
            <Picker.Item label="Inbox" value="INBOX" />
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Audience</Text>
          <Picker selectedValue={audience} onValueChange={onAudienceChange} style={styles.picker}>
            <Picker.Item label="Tous" value="ALL" />
            <Picker.Item label="Clients" value="CLIENTS" />
            <Picker.Item label="Admins" value="ADMINS" />
            <Picker.Item label="Segment" value="SEGMENT" />
          </Picker>
        </View>
        <Input label="Priorité" value={priority} onChangeText={onPriorityChange} keyboardType="number-pad" />
      </View>
    </>
  );
};
