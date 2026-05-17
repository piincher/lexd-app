// Goods Feature - MyGoodsScreen
// Main screen that composes components and handles navigation
// No business logic - only composition and navigation

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMyGoodsScreen } from './hooks';
import createStyles from './MyGoodsScreen.styles';
import { MyGoodsHeader, MyGoodsError } from '../components';
import { GoodsFilter } from '../components/GoodsFilter';
import { GoodsList } from '../components/GoodsList';
import { GoodsListSkeleton } from '../components/GoodsListSkeleton';
import { withProtectedRoute } from '@src/hoc/withProtectedRoute';

const MyGoodsScreen = ({ navigation }: RootStackScreenProps<'MyGoods'>) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    activeFilter,
    goods,
    isLoading,
    isError,
    error,
    isFetching,
    handlers,
  } = useMyGoodsScreen(navigation);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <MyGoodsHeader onScanPress={handlers.handleScanPress} />
        <GoodsListSkeleton />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <MyGoodsHeader onScanPress={handlers.handleScanPress} />
        <MyGoodsError error={error} onRetry={handlers.handleRefresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MyGoodsHeader onScanPress={handlers.handleScanPress} />
      <GoodsFilter activeFilter={activeFilter} onFilterChange={handlers.handleFilterChange} />
      <GoodsList
        goods={goods}
        refreshing={isFetching}
        onRefresh={handlers.handleRefresh}
        onGoodsPress={handlers.handleGoodsPress}
      />
    </SafeAreaView>
  );
};

export default withProtectedRoute(MyGoodsScreen);
