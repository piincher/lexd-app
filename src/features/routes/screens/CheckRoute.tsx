import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { TrackingForm } from '../components/TrackingForm';
import { CheckRouteHeader } from '../components/CheckRouteHeader';
import { CheckRouteHero } from '../components/CheckRouteHero';
import { CheckRouteRecentSearches } from '../components/CheckRouteRecentSearches';
import { CheckRouteLoading } from '../components/CheckRouteLoading';
import { CheckRouteError } from '../components/CheckRouteError';
import { CheckRouteResult } from '../components/CheckRouteResult';
import { CheckRouteEmpty } from '../components/CheckRouteEmpty';
import { CheckRouteCard } from '../components/CheckRouteCard';
import { useCheckRouteScreen } from '../hooks/useCheckRouteScreen';

const CheckRouteScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const {
    code, setCode, handleSubmit, handleRecentPress,
    recent, clearRecent, route, hasResult, currentStep,
    data, isPending, errorMessage,
  } = useCheckRouteScreen();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
      <CheckRouteHeader canGoBack={navigation.canGoBack()} onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <CheckRouteHero />
          <CheckRouteCard>
            <TrackingForm value={code} onChange={setCode} onSubmit={() => handleSubmit()} isSubmitting={isPending} />
            {recent.length > 0 && !hasResult && !isPending && !errorMessage ? (
              <CheckRouteRecentSearches recent={recent} onSelect={handleRecentPress} onClear={clearRecent} />
            ) : null}
          </CheckRouteCard>
          <View style={styles.cardSpacer} />
          {isPending ? <CheckRouteLoading /> : errorMessage ? <CheckRouteError message={errorMessage} /> : hasResult ? (
            <CheckRouteResult code={code} updatedAt={data?.updatedAt} route={route} currentStep={currentStep} />
          ) : <CheckRouteEmpty />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 48 },
  cardSpacer: { height: 16 },
});

export default CheckRouteScreen;
