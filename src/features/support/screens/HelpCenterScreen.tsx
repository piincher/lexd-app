/* Hallmark · macrostructure: Conversational FAQ · genre: modern-minimal · tone: utilitarian
 * theme: brand-aligned app theme · the FAQ accordion is the page spine; search + categories
 * are the controls. One cohesive scroll surface: a pinned search-first hero over a FlashList
 * that hosts the browse hub as its header. A live query collapses the hub to results.
 * pre-emit critique: P5 H5 E4 S5 R5 V5
 */
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Screen } from "@src/shared/ui/Screen";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import { RADIUS } from "@src/shared/ui/designLanguage";
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
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const searchActive = h.searchQuery.length > 0;

  if (h.isError) {
    return (
      <Screen header={{ title: "Centre d'aide", showBack: true }}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      </Screen>
    );
  }

  // The browse hub scrolls with the FAQ list (as its header) so the answers below get real
  // room. A live search query collapses the hub down to categories + results.
  const listHeader = (
    <View>
      {!searchActive && (
        <>
          <HelpQuickActions
            onTrackOrder={h.handleTrackOrder}
            onViewTickets={h.handleViewTickets}
            onWhatsApp={h.handleWhatsApp}
            onCreateTicket={() => h.setShowCreateTicket(true)}
          />
          <HelpPopularFAQs faqs={h.popularFAQs} isLoading={h.popularLoading} onSelectFaq={h.handleSelectFaq} />
          <HelpMyTicketsPreview
            tickets={h.tickets}
            isLoading={h.ticketsLoading}
            onViewAll={h.handleViewTickets}
            onViewTicket={h.handleViewTicket}
          />
          <HelpBookmarkedSection
            bookmarks={h.bookmarks}
            onSelectBookmark={h.handleSelectBookmark}
            onRemoveBookmark={h.handleRemoveBookmark}
          />
        </>
      )}

      <HelpCategoryGrid
        categories={h.categoryCounts}
        activeCategory={h.activeCategory}
        onSelectCategory={h.setActiveCategory}
      />

      <Text style={styles.listLabel}>
        {searchActive ? `Résultats pour « ${h.searchQuery} »` : "Toutes les questions"}
      </Text>
    </View>
  );

  return (
    <Screen header={{ title: "Centre d'aide", showBack: true }} scrollable={false}>
      <LinearGradient
        colors={Theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Comment pouvons-nous{"\n"}vous aider ?</Text>
        <Text style={styles.heroSubtitle}>Trouvez une réponse ou contactez notre équipe.</Text>
      </LinearGradient>

      <View style={styles.searchFloat}>
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
      </View>

      <View style={styles.listWrap}>
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
          searchActive={searchActive}
          ListHeaderComponent={listHeader}
        />
      </View>

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

const createStyles = (colors: any) =>
  StyleSheet.create({
    centered: { flex: 1, alignItems: "center", justifyContent: "center" },
    hero: {
      paddingHorizontal: Theme.spacing.xl,
      paddingTop: Theme.spacing.lg,
      paddingBottom: Theme.spacing["3xl"],
      borderBottomLeftRadius: RADIUS.sheet,
      borderBottomRightRadius: RADIUS.sheet,
    },
    heroTitle: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      lineHeight: 30,
      color: colors.text.inverse,
      letterSpacing: -0.3,
    },
    heroSubtitle: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: "rgba(255,255,255,0.85)",
      marginTop: 6,
    },
    // Float the search bar up over the hero's rounded edge.
    searchFloat: {
      marginTop: -Theme.spacing["2xl"],
      zIndex: 10,
    },
    listLabel: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
      paddingHorizontal: Theme.spacing.lg,
      paddingTop: Theme.spacing.md,
      paddingBottom: Theme.spacing.sm,
    },
    listWrap: { flex: 1 },
  });

export default HelpCenterScreen;
