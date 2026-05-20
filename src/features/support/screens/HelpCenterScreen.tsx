import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Screen } from "@src/shared/ui/Screen";
import { useHelpCenterScreen } from "./hooks/useHelpCenterScreen";
import { HelpQuickActions } from "../components/HelpQuickActions";
import { HelpPopularFAQs } from "../components/HelpPopularFAQs";
import { HelpMyTicketsPreview } from "../components/HelpMyTicketsPreview";
import { HelpSearchBar } from "../components/HelpSearchBar";
import { HelpCategoryGrid } from "../components/HelpCategoryGrid";
import { HelpBookmarkedSection } from "../components/HelpBookmarkedSection";
import { HelpFAQList } from "../components/HelpFAQList";
import { HelpFAQDetailModal } from "../components/HelpFAQDetailModal";
import { HelpCreateTicketModal } from "../components/HelpCreateTicketModal";

export const HelpCenterScreen: React.FC = () => {
  const h = useHelpCenterScreen();

  if (h.isError) {
    return (
      <Screen header={{ title: "Centre d'aide", showBack: true }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={{ title: "Centre d'aide", showBack: true }} scrollable={false}>
      <HelpSearchBar
        value={h.searchQuery}
        onChangeText={h.setSearchQuery}
        onSubmit={() => h.handleSearch(h.searchQuery)}
        suggestions={h.suggestions}
        history={h.searchHistory}
        showSuggestions
        onSelectSuggestion={h.handleSelectSuggestion}
        onSelectHistory={h.handleSelectHistoryItem}
        onClearHistory={h.clearSearchHistory}
      />

      <HelpQuickActions
        onTrackOrder={h.handleTrackOrder}
        onViewTickets={h.handleViewTickets}
        onWhatsApp={h.handleWhatsApp}
        onCreateTicket={() => h.setShowCreateTicket(true)}
      />

      <HelpPopularFAQs faqs={h.popularFAQs} isLoading={h.popularLoading} onSelectFaq={h.handleSelectFaq} />

      <HelpMyTicketsPreview tickets={h.tickets} isLoading={h.ticketsLoading} onViewAll={h.handleViewTickets} onViewTicket={h.handleViewTicket} />

      <HelpBookmarkedSection bookmarks={h.bookmarks} onSelectBookmark={h.handleSelectBookmark} onRemoveBookmark={h.handleRemoveBookmark} />

      <HelpCategoryGrid categories={h.categoryCounts} activeCategory={h.activeCategory} onSelectCategory={h.setActiveCategory} />

      <HelpFAQList
        faqs={h.faqs}
        isLoading={h.isLoading}
        expandedFaqId={h.expandedFaqId}
        bookmarkedIds={h.bookmarks.map((b) => b.faqId)}
        onToggleFaq={h.handleToggleFaq}
        onBookmark={h.handleBookmark}
        onCopy={h.copyToClipboard}
        onFeedback={h.handleFeedback}
        feedbackPending={h.feedbackPending}
        searchActive={h.searchQuery.length > 0}
      />

      <HelpFAQDetailModal
        visible={!!h.selectedFaq}
        faq={h.selectedFaq}
        onClose={() => h.setSelectedFaq(null)}
        onBookmark={() => h.selectedFaq && h.handleBookmark(h.selectedFaq)}
        isBookmarked={h.selectedFaq ? h.isBookmarked(h.selectedFaq._id || h.selectedFaq.id || '') : false}

        onFeedback={(isHelpful) => h.selectedFaq && h.handleFeedback(h.selectedFaq._id || h.selectedFaq.id || '', isHelpful)}
        feedbackPending={h.feedbackPending}
      />

      <HelpCreateTicketModal
        visible={h.showCreateTicket}
        onClose={h.handleCloseCreateTicket}
        onSubmit={h.handleCreateTicket}
        isPending={h.createTicketPending}
        isSuccess={h.createTicketSuccess}
      />
    </Screen>
  );
};

export default HelpCenterScreen;
