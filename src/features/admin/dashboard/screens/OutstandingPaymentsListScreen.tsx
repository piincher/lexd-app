import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from 'react-native';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useOutstandingPaymentsListScreen } from './hooks';
import { createStyles } from './OutstandingPaymentsListScreen.styles';
import {
  OutstandingPaymentsListHeader,
  OutstandingPaymentsSearch,
  OutstandingPaymentsFilter,
  OutstandingPaymentsItem,
  OutstandingPaymentsEmpty,
  OutstandingPaymentsPagination,
  OutstandingPaymentsLoadingOverlay,
} from '../components';

export const OutstandingPaymentsListScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    items,
    pagination,
    isLoading,
    isRefetching,
    status,
    localSearch,
    handlers,
  } = useOutstandingPaymentsListScreen();

  return (
    <SafeAreaView style={styles.container}>
      <OutstandingPaymentsListHeader
        onBack={handlers.handleBack}
        rightElement={
          <NotificationBell
            onPress={handlers.handleNotificationPress}
            size={24}
            color={colors.text.primary}
          />
        }
      />
      <OutstandingPaymentsSearch
        localSearch={localSearch}
        onChangeText={handlers.handleSearchChange}
        onSubmit={handlers.handleSearchSubmit}
        onClear={handlers.handleClearSearch}
      />
      <OutstandingPaymentsFilter status={status} onChange={handlers.handleStatusChange} />
      <FlashList
        data={items}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handlers.handleRefresh} />
        }
        renderItem={({ item }) => (
          <OutstandingPaymentsItem item={item} onPress={handlers.handleItemPress} />
        )}
        ListEmptyComponent={<OutstandingPaymentsEmpty />}
        ListFooterComponent={
          pagination && pagination.pages > 1 ? (
            <OutstandingPaymentsPagination
              pagination={pagination}
              onPrev={handlers.handlePrevPage}
              onNext={handlers.handleNextPage}
            />
          ) : null
        }
      />
      {isLoading && !isRefetching && (
        <OutstandingPaymentsLoadingOverlay isDark={isDark} />
      )}
    </SafeAreaView>
  );
};

export default OutstandingPaymentsListScreen;
