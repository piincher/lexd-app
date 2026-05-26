import React from "react";
import { View, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "@src/providers/ThemeProvider";
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
  ListHeaderComponent?: React.ComponentProps<typeof FlashList>["ListHeaderComponent"];
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
  ListHeaderComponent,
}: HelpFAQListProps) {
  const { colors } = useAppTheme();

  // Keep the browse hub (ListHeaderComponent) mounted while loading/empty by routing those
  // states through ListEmptyComponent rather than replacing the whole list.
  const listEmpty = isLoading ? (
    <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 48 }}>
      <ActivityIndicator size="large" color={colors.primary.main} />
    </View>
  ) : (
    <HelpEmptyState searchActive={searchActive} />
  );

  return (
    <FlashList
      data={isLoading ? [] : faqs}
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
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={listEmpty}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}
