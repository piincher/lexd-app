import React from "react";
import { View, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { HelpFAQCard } from "../HelpFAQCard";
import { HelpEmptyState } from "../HelpEmptyState";
import type { FAQItem } from "../../types";

type HelpFAQListProps = {
  faqs: FAQItem[];
  isLoading: boolean;
  expandedFaqId: string | null;
  bookmarkedIds: string[];
  onToggleFaq: (faqId: string) => void;
  onBookmark: (faq: FAQItem) => void;
  onCopy: (text: string) => void;
  onFeedback: (faqId: string, isHelpful: boolean) => void;
  feedbackPending: boolean;
  searchActive: boolean;
};

export function HelpFAQList({
  faqs,
  isLoading,
  expandedFaqId,
  bookmarkedIds,
  onToggleFaq,
  onBookmark,
  onCopy,
  onFeedback,
  feedbackPending,
  searchActive,
}: HelpFAQListProps) {
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 40 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (faqs.length === 0) {
    return <HelpEmptyState searchActive={searchActive} />;
  }

  return (
    <FlashList
      data={faqs}
      keyExtractor={(item) => item._id || item.id || String(item.question)}
      renderItem={({ item }) => (
        <HelpFAQCard
          faq={item}
          isExpanded={expandedFaqId === item._id}
          isBookmarked={bookmarkedIds.includes(item._id || item.id || '')}
          onToggle={() => onToggleFaq(item._id || item.id || '')}
          onBookmark={() => onBookmark(item)}
          onCopy={() => onCopy(`${item.question}\n\n${item.answer}`)}
          onFeedback={(isHelpful) => onFeedback(item._id || item.id || '', isHelpful)}
          feedbackPending={feedbackPending}
        />
      )}
      contentContainerStyle={{ paddingVertical: 8 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
