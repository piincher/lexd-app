import React, { useCallback } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMyRewardSummaryV2 } from '../hooks/useRewards';
import { useMyProductRedemptions } from '../hooks/useProductRedemptions';
import { useRewardDetailForm } from '../hooks/useRewardDetailForm';
import { joinRewardWaitlist } from '../api/rewardApi';
import { RewardDetailConfirmModal } from '../components/RewardDetailConfirmModal';
import type { RewardItem } from '../types';
import { createStyles } from './RewardDetailScreen.styles';

export const RewardDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const item = (route.params as { item: RewardItem })?.item;
  const summary = useMyRewardSummaryV2();
  const { createRedemption, isCreatingRedemption } = useMyProductRedemptions();
  const points = summary.data?.rewardPoints || 0;
  const form = useRewardDetailForm(item, points);
  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const outOfStock = !!item && item.stock <= 0;
  const notifyMutation = useMutation({
    mutationFn: () => joinRewardWaitlist(item!.id),
    onSuccess: () => showMessage({ message: 'Vous serez prévenu dès le retour en stock', type: 'success' }),
    onError: () => showMessage({ message: 'Inscription impossible pour le moment', type: 'danger' }),
  });

  const handleConfirm = useCallback(() => {
    if (!item) return;
    createRedemption(
      { rewardItemId: item.id, quantity: form.quantity, phoneVerification: form.phone.trim(), customerRemarks: form.remarks.trim() || undefined },
      { onSuccess: () => { form.closeConfirm(); navigation.goBack(); } }
    );
  }, [item, form, createRedemption, navigation]);

  if (!item) {
    return (
      <Screen header={{ title: 'Détail', showBack: true, onBackPress: handleBack }}>
        <View style={styles.notFound}>
          <MaterialCommunityIcons name="gift-off-outline" size={40} color={colors.text.disabled} />
          <Text style={styles.notFoundText}>Article introuvable</Text>
        </View>
      </Screen>
    );
  }

  const isPickup = item.pickupMethod === 'PICKUP';
  const pickupColor = isPickup ? colors.status.info : colors.status.success;
  const missingPoints = Math.max(0, form.totalPoints - points);
  const balanceProgress = form.totalPoints > 0 ? Math.min(1, points / form.totalPoints) : 1;

  return (
    <Screen header={{ title: 'Échanger', showBack: true, onBackPress: handleBack }} contentStyle={styles.content}>
      <View style={styles.flex}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View>
            <Image source={{ uri: item.imageUrl }} style={styles.image} contentFit="cover" transition={200} />
            <View style={styles.pointsBadge}>
              <MaterialCommunityIcons name="star-four-points" size={13} color={colors.text.inverse} />
              <Text style={styles.pointsBadgeText}>{item.pointsRequired} pts</Text>
            </View>
            {outOfStock && (
              <View style={styles.stockOverlay}>
                <Text style={styles.stockOverlayText}>Rupture de stock</Text>
              </View>
            )}
          </View>

          {/* Identity */}
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.chipsRow}>
              <View style={[styles.badge, { backgroundColor: pickupColor + '18' }]}>
                <MaterialCommunityIcons name={isPickup ? 'store-outline' : 'truck-delivery-outline'} size={13} color={pickupColor} />
                <Text style={[styles.badgeLabel, { color: pickupColor }]}>{isPickup ? 'Retrait' : 'Livraison'}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: colors.background.paper }]}>
                <MaterialCommunityIcons name="package-variant-closed" size={13} color={colors.text.secondary} />
                <Text style={[styles.badgeLabel, { color: colors.text.secondary }]}>Stock : {item.stock}</Text>
              </View>
            </View>
            {!!item.description && <Text style={styles.description}>{item.description}</Text>}
          </View>

          {/* Balance / affordability */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceTop}>
              <View style={styles.balanceLabelRow}>
                <MaterialCommunityIcons name="wallet-outline" size={16} color={colors.text.secondary} />
                <Text style={styles.balanceLabel}>Votre solde</Text>
              </View>
              <Text style={styles.balanceValue}>{points.toLocaleString('fr-FR')} pts</Text>
            </View>
            <View style={styles.balanceTrack}>
              <View
                style={[
                  styles.balanceFill,
                  { width: `${balanceProgress * 100}%`, backgroundColor: form.canAfford ? colors.status.success : colors.status.warning },
                ]}
              />
            </View>
            <Text style={[styles.balanceHint, { color: form.canAfford ? colors.status.success : colors.status.warning }]}>
              {form.canAfford ? 'Solde suffisant pour cet échange' : `Encore ${missingPoints.toLocaleString('fr-FR')} pts pour échanger`}
            </Text>
          </View>

          {/* Quantity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantité</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity style={[styles.qtyButton, form.quantity <= 1 && styles.qtyButtonDisabled]} onPress={form.decQty} disabled={form.quantity <= 1}>
                <MaterialCommunityIcons name="minus" size={18} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{form.quantity}</Text>
              <TouchableOpacity style={[styles.qtyButton, form.quantity >= item.stock && styles.qtyButtonDisabled]} onPress={form.incQty} disabled={form.quantity >= item.stock}>
                <MaterialCommunityIcons name="plus" size={18} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Inputs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Téléphone</Text>
            <TextInput
              style={[styles.input, form.phoneError && styles.inputError]}
              value={form.phone}
              onChangeText={form.setPhone}
              placeholder="Votre numéro de téléphone"
              placeholderTextColor={colors.text.disabled}
              keyboardType="phone-pad"
              maxLength={20}
            />
            {form.phoneError && <Text style={[styles.errorText, { color: colors.status.error }]}>Numéro requis</Text>}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Remarques (optionnel)</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={form.remarks}
              onChangeText={form.setRemarks}
              placeholder="Notes supplémentaires…"
              placeholderTextColor={colors.text.disabled}
              multiline
              maxLength={500}
            />
          </View>
        </ScrollView>

        {/* Sticky action bar */}
        <View style={styles.footer}>
          <View style={styles.footerTotals}>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalValue}>{form.totalPoints.toLocaleString('fr-FR')} pts</Text>
          </View>
          {outOfStock ? (
            <TouchableOpacity
              style={[styles.cta, { backgroundColor: colors.status.warning }, (notifyMutation.isPending || notifyMutation.isSuccess) && styles.ctaDisabled]}
              onPress={() => notifyMutation.mutate()}
              disabled={notifyMutation.isPending || notifyMutation.isSuccess}
            >
              <MaterialCommunityIcons name={notifyMutation.isSuccess ? 'bell-check-outline' : 'bell-ring-outline'} size={18} color={colors.text.inverse} />
              <Text style={styles.ctaText}>
                {notifyMutation.isSuccess ? 'Vous serez prévenu' : notifyMutation.isPending ? 'Inscription…' : 'Prévenez-moi'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.cta, (!form.isValid || isCreatingRedemption) && styles.ctaDisabled]}
              onPress={form.openConfirm}
              disabled={!form.isValid || isCreatingRedemption}
            >
              <MaterialCommunityIcons name="gift-outline" size={18} color={colors.text.inverse} />
              <Text style={styles.ctaText}>{!form.canAfford ? 'Points insuffisants' : 'Échanger'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <RewardDetailConfirmModal
        visible={form.showConfirm}
        item={item}
        quantity={form.quantity}
        totalPoints={form.totalPoints}
        phone={form.phone}
        remarks={form.remarks}
        onClose={form.closeConfirm}
        onConfirm={handleConfirm}
        isSubmitting={isCreatingRedemption}
      />
    </Screen>
  );
};

export default RewardDetailScreen;
