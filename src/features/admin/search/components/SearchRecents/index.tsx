import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "../GlobalSearchBar.styles";

interface SearchRecentsProps {
  recents: string[];
  hasRecents: boolean;
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
}

export const SearchRecents: React.FC<SearchRecentsProps> = ({
  recents, hasRecents, onSelect, onRemove, onClear,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (!hasRecents) return null;

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.recentItem} onPress={() => onSelect(item)}>
      <Ionicons name="time-outline" size={18} color={colors.neutral[400]} style={styles.recentIcon} />
      <Text style={styles.recentText} numberOfLines={1}>{item}</Text>
      <TouchableOpacity onPress={() => onRemove(item)} style={styles.removeRecentButton}>
        <Ionicons name="close" size={16} color={colors.neutral[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recherches récentes</Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clearAllText}>Effacer</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={recents.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={(item, index) => `recent-${index}`}
        scrollEnabled={false}
      />
    </>
  );
};
