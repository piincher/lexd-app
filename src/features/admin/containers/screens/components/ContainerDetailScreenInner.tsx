import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContainerDetailScreen } from '../hooks/useContainerDetailScreen';
import { createStyles } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerDetailContent } from '../../components/ContainerDetailContent';
import { ContainerDetailFooter } from '../../components/ContainerDetailFooter';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import type { Container } from '../../types';

export const ContainerDetailScreenInner: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const screen = useContainerDetailScreen();

  // Keep a stable reference to the last valid container to avoid flashing
  // "Container not found" during background refetches or transient errors.
  const lastContainerRef = useRef<Container | undefined>(undefined);
  if (screen.container) {
    lastContainerRef.current = screen.container;
  }

  // Use the latest container if available; otherwise fall back to the last known one.
  const container = screen.container ?? lastContainerRef.current;

  // Show loading spinner on the very first load.
  if (screen.isLoading) {
    return <LoadingState />;
  }

  // If we're actively refetching but have a stale container, keep showing the
  // content rather than jumping to an error screen.
  if (!container && screen.isRefetching) {
    return <LoadingState />;
  }

  // Only show the hard error state when we truly have no data at all.
  if (!container) {
    return <ErrorState onBack={() => screen.navigation.goBack()} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ContainerDetailContent container={container} screen={screen} />
      <ContainerDetailFooter container={container} screen={screen} />
    </SafeAreaView>
  );
};
