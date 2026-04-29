import React, { useMemo } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouteFormInit } from '../hooks/useRouteFormInit';
import { Header } from './RouteForm/components';
import { RouteFormContent } from '../components/RouteFormContent';
import { RouteFormLoadingState } from '../components/RouteFormLoadingState';
import { createStyles } from './RouteForm/RouteForm.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const RouteFormScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { isEditMode, isLoadingRoute, navigation } = useRouteFormInit();

  if (isEditMode && isLoadingRoute) {
    return <RouteFormLoadingState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Header isEditMode={isEditMode} navigation={navigation} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <RouteFormContent />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RouteFormScreen;
