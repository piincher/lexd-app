import React, { useCallback } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMyRewardSummaryV2 } from '../hooks/useRewards';
import { useMyProductRedemptions } from '../hooks/useProductRedemptions';
import { useRewardDetailForm } from '../hooks/useRewardDetailForm';
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.text.secondary }}>Article introuvable</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={{ title: 'Échanger', showBack: true, onBackPress: handleBack }} contentStyle={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} contentFit="cover" />
        <InfoSection item={item} colors={colors} styles={styles} />
        <QtySection form={form} colors={colors} styles={styles} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{form.totalPoints} pts</Text>
        </View>
        <InputSection label="Téléphone" value={form.phone} onChange={form.setPhone} error={form.phoneError} placeholder="Votre numéro de téléphone" keyboard="phone-pad" colors={colors} styles={styles} />
        <InputSection label="Remarques (optionnel)" value={form.remarks} onChange={form.setRemarks} placeholder="Notes supplémentaires..." multiline colors={colors} styles={styles} />
        <TouchableOpacity style={[styles.redeemButton, !form.isValid && styles.redeemDisabled]} onPress={form.openConfirm} disabled={!form.isValid || isCreatingRedemption}>
          <MaterialCommunityIcons name="gift-outline" size={18} color={colors.text.inverse} />
          <Text style={styles.redeemText}>{!form.canAfford ? 'Points insuffisants' : 'Échanger'}</Text>
        </TouchableOpacity>
      </ScrollView>
      <RewardDetailConfirmModal visible={form.showConfirm} item={item} quantity={form.quantity} totalPoints={form.totalPoints} phone={form.phone} remarks={form.remarks} onClose={form.closeConfirm} onConfirm={handleConfirm} isSubmitting={isCreatingRedemption} />
    </Screen>
  );
};

const InfoSection: React.FC<any> = ({ item, colors, styles }) => {
  const isPickup = item.pickupMethod === 'PICKUP';
  const color = (colors.status as any)[isPickup ? 'info' : 'success'];
  return (
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.points}>{item.pointsRequired} pts / unité</Text>
        <Text style={styles.stock}>Stock: {item.stock}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: color + '18', alignSelf: 'flex-start' }]}>
        <MaterialCommunityIcons name={isPickup ? 'store-outline' : 'truck-delivery-outline'} size={14} color={color} />
        <Text style={[styles.badgeLabel, { color }]}>{isPickup ? 'Retrait' : 'Livraison'}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const QtySection: React.FC<any> = ({ form, colors, styles }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Quantité</Text>
    <View style={styles.quantityRow}>
      <TouchableOpacity style={styles.qtyButton} onPress={form.decQty}>
        <MaterialCommunityIcons name="minus" size={18} color={colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.qtyValue}>{form.quantity}</Text>
      <TouchableOpacity style={styles.qtyButton} onPress={form.incQty}>
        <MaterialCommunityIcons name="plus" size={18} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  </View>
);

const InputSection: React.FC<any> = ({ label, value, onChange, error, placeholder, keyboard, multiline, colors, styles }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{label}</Text>
    <TextInput style={[styles.input, error && styles.inputError, multiline && styles.multilineInput]} value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={colors.text.disabled} keyboardType={keyboard} multiline={multiline} maxLength={multiline ? 500 : 20} />
    {error && <Text style={[styles.errorText, { color: colors.status.error }]}>Requis</Text>}
  </View>
);

export default RewardDetailScreen;
