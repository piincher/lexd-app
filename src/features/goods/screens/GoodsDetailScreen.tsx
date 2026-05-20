import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHideTabBarOnScroll } from '@src/shared/lib';
import { useGoodsDetailScreen } from './hooks/useGoodsDetailScreen';
import { useGoodsDetailScreenStyles } from './GoodsDetailScreen.styles';
import {
  GoodsDetailLoading,
  GoodsDetailError,
  GoodsDetailHeader,
  GoodsDetailContent,
} from '../components';

const GoodsDetailScreen: React.FC = () => {
  const { goods, isLoading, isError, error, isAdmin, handlers } = useGoodsDetailScreen();
  const styles = useGoodsDetailScreenStyles();
  const { onScroll } = useHideTabBarOnScroll();

  if (isLoading) {
    return <GoodsDetailLoading onBack={handlers.handleBack} />;
  }

  if (isError || !goods) {
    return (
      <GoodsDetailError
        error={error}
        onRetry={handlers.handleRetry}
        onBack={handlers.handleBack}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoodsDetailHeader
        goods={goods}
        isAdmin={isAdmin}
        onBack={handlers.handleBack}
        onEdit={handlers.handleEdit}
      />
      <GoodsDetailContent
        goods={goods}
        onScroll={onScroll}
        onViewPayments={handlers.handleViewPayments}
      />
    </SafeAreaView>
  );
};

export default GoodsDetailScreen;
