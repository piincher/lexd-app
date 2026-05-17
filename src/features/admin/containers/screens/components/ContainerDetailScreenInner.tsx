import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContainerDetailScreen } from '../hooks/useContainerDetailScreen';
import { createStyles } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerDetailContent } from '../../components/ContainerDetailContent';
import { ContainerDetailFooter } from '../../components/ContainerDetailFooter';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export const ContainerDetailScreenInner: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
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
