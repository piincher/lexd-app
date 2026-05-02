import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface VersionCardProps {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor: string;
  data: any;
  isSelected: boolean;
  onPress: () => void;
  styles: any;
}

const renderValue = (value: any) => {
  if (value === null || value === undefined) return "Non défini";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
};

export const VersionCard: React.FC<VersionCardProps> = ({
  title, icon, iconColor, data, isSelected, onPress, styles,
}) => (
  <TouchableOpacity
    style={[styles.versionCard, isSelected && styles.selectedCard]}
    onPress={onPress}
  >
    <View style={styles.versionHeader}>
      <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
      <Text style={styles.versionTitle}>{title}</Text>
      {isSelected && (
        <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
      )}
    </View>
    <View style={styles.versionContent}>
      <Text style={styles.versionText}>{renderValue(data)}</Text>
    </View>
  </TouchableOpacity>
);
