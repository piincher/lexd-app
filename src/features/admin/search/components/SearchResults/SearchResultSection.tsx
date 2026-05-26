import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { SearchResultItem } from "../../types/searchResults";

interface SearchResultSectionProps {
  title: string;
  icon: string;
  items: SearchResultItem[];
  renderItem: ({ item }: { item: SearchResultItem }) => React.ReactElement;
  total: number;
}

export const SearchResultSection: React.FC<SearchResultSectionProps> = ({
  title,
  icon,
  items,
  renderItem,
  total,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name={icon as any}
            size={18}
            color={colors.primary[500]}
          />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Text style={styles.sectionCount}>
          {items.length} sur {total}
        </Text>
      </View>
      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.neutral[800],
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.neutral[500],
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginLeft: 72,
  },
});
