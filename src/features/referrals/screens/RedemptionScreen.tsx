import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { usePaginatedMyRedemptions } from '../hooks/useRewardRedemptions';
import type { RewardRedemption } from '../types';
import { RedemptionStatusBadge } from '../components/RedemptionStatusBadge';
import { RedemptionDetailCard } from '../components/RedemptionDetailCard';
import { RedemptionEmptyState } from '../components/RedemptionEmptyState';
import { RedemptionPagination } from '../components/RedemptionPagination';
import { RedemptionRequestModal } from '../components/RedemptionRequestModal';
import { createStyles } from './RedemptionScreen.styles';

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const RedemptionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isRedeemOpen, setRedeemOpen] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState<RewardRedemption | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
    page,
    nextPage,
    prevPage,
    createRedemption,
    cancelRedemption,
    isCreatingRedemption,
    isCancellingRedemption,
  } = usePaginatedMyRedemptions();

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleSubmitRedemption = useCallback(
    (points: number, note?: string) => {
      createRedemption({ points, note }, { onSuccess: () => setRedeemOpen(false) });
    },
    [createRedemption]
  );

  const handleCancel = useCallback(
    (id: string) => {
      cancelRedemption(id);
    },
    [cancelRedemption]
  );

  const redemptions = data?.items || [];
  const pagination = data?.pagination;

  const pendingCount = useMemo(
    () => redemptions.filter((r) => r.status === 'PENDING').length,
    [redemptions]
  );

  const totalRequested = useMemo(
    () => redemptions.reduce((sum, r) => sum + r.requestedPoints, 0),
    [redemptions]
  );

  return (
    <Screen
      header={{ title: 'Mes demandes de points', showBack: true, onBackPress: handleBack }}
      contentStyle={styles.content}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Stats summary */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.primary.main + '12' }]}>
            <MaterialCommunityIcons name="ticket-percent-outline" size={20} color={colors.primary.main} />
            <Text style={styles.statValue}>{redemptions.length}</Text>
            <Text style={styles.statLabel}>Demandes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.status.warning + '12' }]}>
            <MaterialCommunityIcons name="clock-outline" size={20} color={colors.status.warning} />
            <Text style={styles.statValue}>{pendingCount}</Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.status.success + '12' }]}>
            <MaterialCommunityIcons name="cash" size={20} color={colors.status.success} />
            <Text style={styles.statValue}>{formatFCFA(totalRequested * 50)}</Text>
            <Text style={styles.statLabel}>Total demandé</Text>
          </View>
        </View>

        {/* New request button */}
        <TouchableOpacity style={styles.newRequestButton} onPress={() => setRedeemOpen(true)}>
          <MaterialCommunityIcons name="plus-circle-outline" size={20} color={colors.text.inverse} />
          <Text style={styles.newRequestText}>Nouvelle demande</Text>
        </TouchableOpacity>

        {/* List */}
        {isLoading && (
          <View style={styles.state}>
            <ActivityIndicator color={colors.primary.main} />
          </View>
        )}

        {isError && (
          <View style={styles.state}>
            <Text style={styles.stateText}>Impossible de charger vos demandes.</Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text style={styles.retryText}>Réessayer</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !isError && redemptions.length === 0 && (
          <RedemptionEmptyState
            title="Aucune demande de points"
            subtitle="Faites votre première demande pour utiliser vos points de récompense."
          />
        )}

        {!isLoading &&
          !isError &&
          redemptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listCard}
              onPress={() => setSelectedRedemption(selectedRedemption?.id === item.id ? null : item)}
              activeOpacity={0.8}
            >
              <View style={styles.listHeader}>
                <View>
                  <Text style={styles.listPoints}>{item.requestedPoints} points</Text>
                  <Text style={styles.listValue}>{formatFCFA(item.requestedValueFCFA)}</Text>
                </View>
                <RedemptionStatusBadge status={item.status} size="sm" />
              </View>
              <Text style={styles.listDate}>
                {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>

              {selectedRedemption?.id === item.id && (
                <View style={styles.detailWrapper}>
                  <RedemptionDetailCard redemption={item} />
                  {item.status === 'PENDING' && (
                    <TouchableOpacity
                      style={[styles.cancelButton, isCancellingRedemption && styles.cancelButtonDisabled]}
                      onPress={() => handleCancel(item.id)}
                      disabled={isCancellingRedemption}
                    >
                      <MaterialCommunityIcons name="close-circle-outline" size={16} color={colors.status.error} />
                      <Text style={[styles.cancelText, { color: colors.status.error }]}>
                        {isCancellingRedemption ? 'Annulation...' : 'Annuler la demande'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}

        {pagination && pagination.pages > 1 && (
          <RedemptionPagination
            page={page}
            pages={pagination.pages}
            total={pagination.total}
            onPrev={prevPage}
            onNext={nextPage}
          />
        )}
      </ScrollView>

      <RedemptionRequestModal
        visible={isRedeemOpen}
        onClose={() => setRedeemOpen(false)}
        onSubmit={handleSubmitRedemption}
        isSubmitting={isCreatingRedemption}
      />
    </Screen>
  );
};

export default RedemptionScreen;
