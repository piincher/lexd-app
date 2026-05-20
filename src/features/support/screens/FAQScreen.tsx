/**
 * FAQScreen - Main FAQ screen component
 * Following SRP: Screen is a thin wrapper (< 100 lines)
 * Composition only - delegates to components and hooks
 */

import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Screen } from '@src/shared/ui/Screen';
import { useFAQScreen } from './hooks/useFAQScreen';
import { FAQSearchBar } from '../components/FAQSearchBar';
import { FAQCategoryFilter } from '../components/FAQCategoryFilter';
import { FAQItem } from '../components/FAQItem';
import { FAQEmptyState } from '../components/FAQEmptyState';
import { FAQContactButton } from '../components/FAQContactButton';
import { FAQSkeleton } from './FAQScreenSkeleton';
import { styles } from './FAQScreen.styles';

export const FAQScreen: React.FC = () => {
  const {
    filteredData,
    isLoading,
    filter,
    categories,
    handlers,
  } = useFAQScreen();

  if (isLoading) {
    return (
      <Screen header={{ title: 'FAQ', showBack: true, showNotificationBell: true }} scrollable={false}>
        <FAQSkeleton />
      </Screen>
    );
  }

  return (
    <Screen
      header={{ title: 'Centre d\'aide', showBack: true, showNotificationBell: true }}
      footer={<FAQContactButton onPress={() => {}} />}
      scrollable={false}
    >
      <FlashList
        data={filteredData}
        keyExtractor={(item) => item.id || item._id || String(item.question)}
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
                onChangeText={handlers.setSearchQuery}
                placeholder="Rechercher une question..."
              />
            </View>
            <FAQCategoryFilter
              categories={categories}
              selectedCategory={filter.category}
              onSelectCategory={handlers.setCategory}
            />
          </View>
        }
        ListEmptyComponent={
          <FAQEmptyState
            searchQuery={filter.searchQuery}
            onClearSearch={handlers.handleClearSearch}
          />
        }
      />
    </Screen>
  );
};

export default FAQScreen;
