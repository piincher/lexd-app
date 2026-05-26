import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { FAQ_CATEGORY_COLORS } from "../../types";
import type { FAQItem } from "../../types";

import { getStyles } from "./HelpPopularFAQs.styles";

type HelpPopularFAQsProps = {
  faqs: FAQItem[];
  isLoading: boolean;
  onSelectFaq: (faq: FAQItem) => void;
};

export function HelpPopularFAQs({ faqs, isLoading, onSelectFaq }: HelpPopularFAQsProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  if (isLoading || faqs.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questions populaires</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {faqs.map((faq) => {
          const catColor = FAQ_CATEGORY_COLORS[faq.category as keyof typeof FAQ_CATEGORY_COLORS] || colors.primary.main;
          return (
            <TouchableOpacity
              key={faq._id}
              style={styles.card}
              onPress={() => onSelectFaq(faq)}
              activeOpacity={0.7}
            >
              <View style={[styles.badge, { backgroundColor: catColor + "12" }]}>
                <Text style={[styles.badgeText, { color: catColor }]}>
                  {faq.category}
                </Text>
              </View>
              <Text style={styles.question} numberOfLines={3}>
                {faq.question}
              </Text>
              <View style={styles.footer}>
                <MaterialCommunityIcons name="eye-outline" size={12} color={colors.text.disabled} />
                <Text style={styles.meta}>{faq.viewCount ?? 0}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
