import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { FAQ_CATEGORY_COLORS } from "../../types";
import type { FAQItem } from "../../types";

import { getStyles } from "./HelpFAQDetailModal.styles";

type HelpFAQDetailModalProps = {
  visible: boolean;
  faq: FAQItem | null;
  onClose: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
  onFeedback: (isHelpful: boolean) => void;
  feedbackPending: boolean;
};

export function HelpFAQDetailModal({ visible, faq, onClose, onBookmark, isBookmarked, onFeedback, feedbackPending }: HelpFAQDetailModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  if (!faq) return null;

  const catColor = FAQ_CATEGORY_COLORS[faq.category as keyof typeof FAQ_CATEGORY_COLORS] || colors.primary.main;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={22} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onBookmark} activeOpacity={0.7}>
              <MaterialCommunityIcons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={22}
                color={isBookmarked ? colors.primary.main : colors.text.secondary}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={[styles.badge, { backgroundColor: catColor + "12" }]}>
              <Text style={[styles.badgeText, { color: catColor }]}>{faq.category}</Text>
            </View>

            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>

            {faq.tags && faq.tags.length > 0 && (
              <View style={styles.tags}>
                {faq.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.feedbackLabel}>Cette réponse vous a-t-elle aidé ?</Text>
            <View style={styles.feedbackButtons}>
              <TouchableOpacity
                style={[styles.feedbackBtn, { borderColor: colors.status.success + "30" }]}
                onPress={() => onFeedback(true)}
                disabled={feedbackPending}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="thumb-up-outline" size={18} color={colors.status.success} />
                <Text style={[styles.feedbackBtnText, { color: colors.status.success }]}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.feedbackBtn, { borderColor: colors.status.error + "30" }]}
                onPress={() => onFeedback(false)}
                disabled={feedbackPending}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="thumb-down-outline" size={18} color={colors.status.error} />
                <Text style={[styles.feedbackBtnText, { color: colors.status.error }]}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
