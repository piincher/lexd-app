/**
 * LoadingListScreen - Admin Loading List with sequence visualization
 * Shows loading order with client color coding and status toggle
 * NEW: Single client filter for walk-in customers
 */
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoadingListScreen } from './LoadingList/hooks';
import {
  LoadingState,
  ErrorState,
  Header,
  ActionBar,
} from './LoadingList/components';
import { useLoadingListClients } from '../hooks/useLoadingListClients';
import { LoadingListContent } from '../components/LoadingListContent';
import { createStyles } from './LoadingList/LoadingListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const LoadingListScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    container,
    navigation,
    isContainerLoading,
    isGeneratingPDF,
    loadingListData,
    filteredLoadingListData,
    selectedClientId,
    setSelectedClientId,
    weightDistribution,
    progressPercentage,
    handleToggleLoaded,
    handleMarkAllLoaded,
    handleResetLoading,
    handlePrint,
    containerId,
  } = useLoadingListScreen();

  const { allClients } = useLoadingListClients(loadingListData, null);

  if (isContainerLoading) {
    return <LoadingState />;
  }

  if (!container || !loadingListData || !filteredLoadingListData) {
    return <ErrorState onBack={() => navigation.goBack()} />;
  }

  const { items, summary, isSingleClientView } = filteredLoadingListData;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        containerNumber={container.virtualContainerNumber}
        itemCount={summary.totalItems}
        articleCount={summary.totalPackages}
        onBack={() => navigation.goBack()}
        onNavigateToPackingList={() => navigation.navigate('PackingList', { containerId })}
      />

      <LoadingListContent
        allClients={allClients}
        items={items}
        summary={summary}
        isSingleClientView={isSingleClientView}
        selectedClientId={selectedClientId}
        setSelectedClientId={setSelectedClientId}
        weightDistribution={weightDistribution}
        progressPercentage={progressPercentage}
        handleToggleLoaded={handleToggleLoaded}
      />

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
