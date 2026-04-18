/**
 * FAQScreen - Main FAQ screen component
 * Following SRP: Screen is a thin wrapper (< 100 lines)
 * Composition only - delegates to components and hooks
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Screen } from '@src/shared/ui/Screen';
import { useFAQ } from '../hooks/useFAQ';
import { FAQSearchBar } from '../components/FAQSearchBar';
import { FAQCategoryFilter } from '../components/FAQCategoryFilter';
import { FAQItem } from '../components/FAQItem';
import { FAQEmptyState } from '../components/FAQEmptyState';
import { FAQContactButton } from '../components/FAQContactButton';
import { FAQSkeleton } from './FAQScreenSkeleton';

export const FAQScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    filteredData,
    isLoading,
    filter,
    setSearchQuery,
    setCategory,
    categories,
  } = useFAQ();

  if (isLoading) {
    return (
      <Screen header={{ title: 'FAQ', showBack: true }} scrollable={false}>
        <FAQSkeleton />
      </Screen>
    );
  }

  return (
    <Screen
      header={{ title: 'Centre d\'aide', showBack: true }}
      footer={<FAQContactButton />}
      scrollable={false}
    >
      <FlashList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <FAQItem item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.searchContainer}>
              <FAQSearchBar
                value={filter.searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Rechercher une question..."
              />
            </View>
            <FAQCategoryFilter
              categories={categories}
              selectedCategory={filter.category}
              onSelectCategory={setCategory}
            />
          </View>
        }
        ListEmptyComponent={
          <FAQEmptyState
            searchQuery={filter.searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
});

export default FAQScreen;
