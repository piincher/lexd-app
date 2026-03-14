/**
 * LoadingListScreen - Admin Loading List with sequence visualization
 * Shows loading order with client color coding and status toggle
 */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useLoadingListScreen } from './LoadingList/hooks';
import {
  LoadingState,
  ErrorState,
  Header,
  ProgressCard,
  CapacityCard,
  ClientLegend,
  SectionHeader,
  EmptyState,
  LoadingSequenceList,
  ActionBar,
} from './LoadingList/components';
import { MAX_CBM } from './LoadingList/hooks';
import { styles } from './LoadingList/LoadingListScreen.styles';

export const LoadingListScreen: React.FC = () => {
  const {
    container,
    navigation,
    isContainerLoading,
    isGeneratingPDF,
    loadingListData,
    weightDistribution,
    progressPercentage,
    handleToggleLoaded,
    handleMarkAllLoaded,
    handleResetLoading,
    handlePrint,
    containerId,
  } = useLoadingListScreen();

  if (isContainerLoading) {
    return <LoadingState />;
  }

  if (!container || !loadingListData) {
    return <ErrorState onBack={() => navigation.goBack()} />;
  }

  const { items, summary } = loadingListData;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        containerNumber={container.virtualContainerNumber}
        itemCount={items.length}
        onBack={() => navigation.goBack()}
        onNavigateToPackingList={() => navigation.navigate('PackingList', { containerId })}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.delay(100)}>
          <ProgressCard summary={summary} progressPercentage={progressPercentage} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150)}>
          <CapacityCard totalCBM={summary.totalCBM} maxCBM={MAX_CBM} />
        </Animated.View>

        <ClientLegend weightDistribution={weightDistribution} />

        <SectionHeader />

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <LoadingSequenceList items={items} onToggleLoaded={handleToggleLoaded} />
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <ActionBar
        isGeneratingPDF={isGeneratingPDF}
        allLoaded={summary.loadedItems === summary.totalItems}
        hasItems={items.length > 0}
        onReset={handleResetLoading}
        onMarkAll={handleMarkAllLoaded}
        onPrint={handlePrint}
      />
    </SafeAreaView>
  );
};

export default LoadingListScreen;
