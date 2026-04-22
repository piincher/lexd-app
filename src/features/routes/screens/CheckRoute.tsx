/**
 * CheckRoute Screen
 * Public shipment tracking by tracking code.
 */

import React, { useCallback, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Appbar, Chip, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { ShimmerBlock } from '@src/shared/ui';

import { useCheckRoute } from '../hooks/useCheckRoute';
import { useRecentSearches } from '../hooks/useRecentSearches';
import { TrackingForm } from '../components/TrackingForm';
import { TrackingTimeline } from '../components/TrackingTimeline';

const parseErrorMessage = (error: unknown): string => {
  if (!error) return '';
  if (typeof error === 'object' && error !== null) {
    const maybe = error as { response?: { data?: { message?: string } }; message?: string };
    if (maybe.response?.data?.message) return maybe.response.data.message;
    if (maybe.message) return maybe.message;
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
};

const formatUpdatedAt = (iso?: string): string | null => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CheckRouteScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation<any>();
  const [code, setCode] = useState('');
  const { mutate, data, isPending, isError, error, reset } = useCheckRoute();
  const { recent, push: pushRecent, clear: clearRecent } = useRecentSearches();

  const handleSubmit = useCallback(
    (override?: string) => {
      const payload = (override ?? code).trim().toUpperCase();
      if (!payload) return;
      reset();
      mutate(
        { code: payload },
        {
          onSuccess: (result) => {
            if (result?.route && result.route.length > 0) {
              pushRecent(payload);
            }
          },
        }
      );
    },
    [code, mutate, pushRecent, reset]
  );

  const handleRecentPress = (value: string) => {
    setCode(value);
    handleSubmit(value);
  };

  const route = data?.route ?? [];
  const hasResult = route.length > 0;
  const currentStep = route.length;
  const errorMessage = isError ? parseErrorMessage(error) : null;

  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.default,
        },
        header: {
          backgroundColor: colors.background.default,
          elevation: 0,
        },
        headerTitle: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        scroll: {
          flex: 1,
        },
        scrollContent: {
          padding: 16,
          paddingBottom: 48,
        },
        hero: {
          marginBottom: 20,
        },
        heroTitle: {
          fontSize: 22,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 6,
        },
        heroSubtitle: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          lineHeight: 20,
        },
        card: {
          borderRadius: 16,
          borderWidth: 1,
          borderColor: cardBorder,
          backgroundColor: cardBg,
          padding: 16,
        },
        cardSpacer: {
          height: 16,
        },
        sectionHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        },
        sectionTitle: {
          fontSize: 13,
          fontFamily: Fonts.meduim,
          color: colors.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        recentRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        clearBtn: {
          fontSize: 12,
          fontFamily: Fonts.meduim,
          color: colors.primary.main,
        },
        resultHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        },
        resultCode: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: 1,
        },
        resultMeta: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
        emptyState: {
          alignItems: 'center',
          paddingVertical: 32,
        },
        emptyIcon: {
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        },
        emptyTitle: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 4,
          textAlign: 'center',
        },
        emptyText: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          paddingHorizontal: 16,
        },
        errorCard: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 14,
          borderRadius: 12,
          backgroundColor: `${colors.status.error}15`,
          gap: 10,
        },
        errorTitle: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.status.error,
        },
        errorText: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
        loadingBlock: {
          gap: 10,
        },
      }),
    [colors, cardBg, cardBorder, isDark]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={styles.header} statusBarHeight={0}>
        {navigation.canGoBack() ? (
          <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text.primary} />
        ) : null}
        <Appbar.Content
          title="Suivi de colis"
          titleStyle={styles.headerTitle}
          accessibilityLabel="Suivi de colis"
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Où est votre colis ?</Text>
            <Text style={styles.heroSubtitle}>
              Entrez votre numéro de suivi pour voir l'avancement de votre envoi en temps réel.
            </Text>
          </View>

          <View style={styles.card}>
            <TrackingForm
              value={code}
              onChange={setCode}
              onSubmit={() => handleSubmit()}
              isSubmitting={isPending}
            />

            {recent.length > 0 && !hasResult && !isPending && !errorMessage ? (
              <View style={{ marginTop: 16 }}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recherches récentes</Text>
                  <Pressable onPress={clearRecent} hitSlop={8} accessibilityRole="button">
                    <Text style={styles.clearBtn}>Effacer</Text>
                  </Pressable>
                </View>
                <View style={styles.recentRow}>
                  {recent.map((value) => (
                    <Chip
                      key={value}
                      icon="history"
                      onPress={() => handleRecentPress(value)}
                      compact
                      accessibilityLabel={`Rechercher ${value}`}
                    >
                      {value}
                    </Chip>
                  ))}
                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.cardSpacer} />

          {isPending ? (
            <Animated.View entering={FadeIn.duration(200)} style={styles.card}>
              <View style={styles.loadingBlock}>
                <ShimmerBlock width="60%" height={18} borderRadius={6} />
                <ShimmerBlock width="40%" height={12} borderRadius={4} />
                <View style={{ height: 12 }} />
                <ShimmerBlock width="100%" height={48} borderRadius={8} />
                <ShimmerBlock width="100%" height={48} borderRadius={8} />
                <ShimmerBlock width="100%" height={48} borderRadius={8} />
              </View>
            </Animated.View>
          ) : errorMessage ? (
            <Animated.View entering={FadeInUp.duration(200)} style={styles.errorCard}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={22}
                color={colors.status.error}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.errorTitle}>Code introuvable</Text>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            </Animated.View>
          ) : hasResult ? (
            <Animated.View entering={FadeInUp.duration(240)} style={styles.card}>
              <View style={styles.resultHeader}>
                <MaterialCommunityIcons
                  name="package-variant-closed-check"
                  size={22}
                  color={colors.primary.main}
                  style={{ marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultCode}>{code.trim().toUpperCase()}</Text>
                  {formatUpdatedAt(data?.updatedAt) ? (
                    <Text style={styles.resultMeta}>
                      Dernière mise à jour : {formatUpdatedAt(data?.updatedAt)}
                    </Text>
                  ) : null}
                </View>
              </View>
              <TrackingTimeline steps={route} currentStep={currentStep} />
            </Animated.View>
          ) : (
            <View style={[styles.card, styles.emptyState]}>
              <View style={styles.emptyIcon}>
                <MaterialCommunityIcons
                  name="cube-scan"
                  size={36}
                  color={colors.primary.main}
                />
              </View>
              <Text style={styles.emptyTitle}>Aucun colis sélectionné</Text>
              <Text style={styles.emptyText}>
                Saisissez votre numéro de suivi ci-dessus pour commencer.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckRouteScreen;
