import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useOutstandingPaymentsList } from '../hooks';
import { styles } from './OutstandingPaymentsListScreen.styles';
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
  const navigation = useNavigation<any>();
  const { isDark } = useAppTheme();
  const {
    items,
    pagination,
    isLoading,
    isRefetching,
    status,
    localSearch,
    handleRefresh,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch,
    handleStatusChange,
    handleNextPage,
    handlePrevPage,
    handleItemPress,
  } = useOutstandingPaymentsList();

  return (
    <SafeAreaView style={styles.container}>
      <OutstandingPaymentsListHeader
        onBack={() => navigation.goBack()}
        rightElement={
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={24}
            color={Theme.colors.text.primary}
          />
        }
      />
      <OutstandingPaymentsSearch
        localSearch={localSearch}
        onChangeText={handleSearchChange}
        onSubmit={handleSearchSubmit}
        onClear={handleClearSearch}
      />
      <OutstandingPaymentsFilter status={status} onChange={handleStatusChange} />
      <FlashList
        data={items}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <OutstandingPaymentsItem item={item} onPress={handleItemPress} />
        )}
        ListEmptyComponent={<OutstandingPaymentsEmpty />}
        ListFooterComponent={
          pagination && pagination.pages > 1 ? (
            <OutstandingPaymentsPagination
              pagination={pagination}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
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
