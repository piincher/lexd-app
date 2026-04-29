/**
 * ContainerDetailScreen - Container details with goods management
 * Refactored: Composition pattern with extracted components
 */

import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContainerDetailScreen } from './hooks/useContainerDetailScreen';
import { createStyles } from './ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerDetailContent } from '../components/ContainerDetailContent';
import { ContainerDetailFooter } from '../components/ContainerDetailFooter';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

/**
 * Container Delivery Flow (Option A):
 *
 * 1. Admin clicks "Marquer comme Livré" on Container
 * 2. Backend handles cascade:
 *    - Container status → DELIVERED
 *    - All goods in container → DELIVERED
 *    - Associated orders auto-update if all goods delivered
 * 3. Customer sees "Livré" status
 *
 * Note: Order-level "Mark as Delivered" button has been removed
 * since delivery is now managed at the container level.
 */

export const ContainerDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const screen = useContainerDetailScreen();

  if (screen.isLoading) return <LoadingState />;
  if (!screen.container) return <ErrorState onBack={() => screen.navigation.goBack()} />;

  const { container } = screen;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ContainerDetailContent container={container} screen={screen} />
      <ContainerDetailFooter container={container} screen={screen} />
    </SafeAreaView>
  );
};

export default ContainerDetailScreen;
