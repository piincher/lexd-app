import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { FAQ_CATEGORY_COLORS } from "../../types";
import type { FAQItem } from "../../types";

import { getStyles } from "./HelpFAQCard.styles";

type HelpFAQCardProps = {
  faq: FAQItem;
  isExpanded: boolean;
  isBookmarked: boolean;
  onToggle: () => void;
  onBookmark: () => void;
  onCopy: () => void;
  onFeedback: (isHelpful: boolean) => void;
  feedbackPending: boolean;
};

export function HelpFAQCard({
  faq,
  isExpanded,
  isBookmarked,
  onToggle,
  onBookmark,
  onCopy,
  onFeedback,
  feedbackPending,
}: HelpFAQCardProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const catColor = FAQ_CATEGORY_COLORS[faq.category as keyof typeof FAQ_CATEGORY_COLORS] || colors.primary.main;

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <View style={[styles.badge, { backgroundColor: catColor + "12" }]}>
            <Text style={[styles.badgeText, { color: catColor }]}>{faq.category}</Text>
          </View>
          <Text style={styles.question}>{faq.question}</Text>
        </View>
        <MaterialCommunityIcons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={22}
          color={colors.text.secondary}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.body}>
          <Text style={styles.answer}>{faq.answer}</Text>

          <View style={styles.actions}>
            <View style={styles.feedbackRow}>
              <Text style={styles.feedbackLabel}>Cette réponse vous a-t-elle aidé ?</Text>
              <View style={styles.feedbackButtons}>
                <TouchableOpacity
                  style={styles.feedbackBtn}
                  onPress={() => onFeedback(true)}
                  disabled={feedbackPending}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="thumb-up-outline" size={18} color={colors.status.success} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.feedbackBtn}
                  onPress={() => onFeedback(false)}
                  disabled={feedbackPending}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="thumb-down-outline" size={18} color={colors.status.error} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.iconActions}>
              <TouchableOpacity style={styles.iconBtn} onPress={onBookmark} activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name={isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={20}
                  color={isBookmarked ? colors.primary.main : colors.text.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={onCopy} activeOpacity={0.7}>
                <MaterialCommunityIcons name="content-copy" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
