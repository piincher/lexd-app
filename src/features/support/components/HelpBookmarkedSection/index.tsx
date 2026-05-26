import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { FAQ_CATEGORY_COLORS } from "../../types";
import type { FAQBookmark } from "../../types";

import { getStyles } from "./HelpBookmarkedSection.styles";

type HelpBookmarkedSectionProps = {
  bookmarks: FAQBookmark[];
  onSelectBookmark: (bookmark: FAQBookmark) => void;
  onRemoveBookmark: (faqId: string) => void;
};

export function HelpBookmarkedSection({ bookmarks, onSelectBookmark, onRemoveBookmark }: HelpBookmarkedSectionProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  if (bookmarks.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Articles enregistrés</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {bookmarks.map((bookmark) => {
          const catColor = FAQ_CATEGORY_COLORS[bookmark.category as keyof typeof FAQ_CATEGORY_COLORS] || colors.primary.main;
          return (
            <TouchableOpacity
              key={bookmark.faqId}
              style={styles.card}
              onPress={() => onSelectBookmark(bookmark)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: catColor + "12" }]}>
                  <Text style={[styles.badgeText, { color: catColor }]}>{bookmark.category}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => onRemoveBookmark(bookmark.faqId)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="bookmark-remove" size={18} color={colors.status.error} />
                </TouchableOpacity>
              </View>
              <Text style={styles.question} numberOfLines={2}>{bookmark.question}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
