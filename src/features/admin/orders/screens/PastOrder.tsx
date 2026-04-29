import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { productType } from '@src/api/order';
import { usePastOrdersAdmin } from './hooks/usePastOrdersAdmin';
import { PastOrderHeader } from './components/PastOrderHeader';
import { PastOrderToggle } from './components/PastOrderToggle';
import { PastOrderCard } from './components/PastOrderCard';
import { PastOrderEmpty } from './components/PastOrderEmpty';
import { PastOrderFooter } from './components/PastOrderFooter';
import { PastOrderError } from './components/PastOrderError';
import { createStyles } from './PastOrder.styles';

const PastOrderScreen: FC = () => {
  const {
    shippingType,
    searchQuery,
    setSearchQuery,
    isError,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    handleShippingTypeChange,
    loadMore,
    filteredData,
  } = usePastOrdersAdmin();

  const styles = createStyles();

  if (isError) {
    return <PastOrderError onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <PastOrderHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <PastOrderToggle shippingType={shippingType} onChange={handleShippingTypeChange} />
      <FlashList<productType>
        data={filteredData}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => <PastOrderCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<PastOrderEmpty searchQuery={searchQuery} />}
        ListFooterComponent={
          <PastOrderFooter
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            onLoadMore={loadMore}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        {...({ initialNumToRender: 10, maxToRenderPerBatch: 5, windowSize: 10 } as any)}
      />
    </SafeAreaView>
  );
};

export default PastOrderScreen;
