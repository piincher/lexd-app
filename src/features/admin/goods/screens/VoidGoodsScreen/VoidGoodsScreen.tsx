/**
 * VoidGoodsScreen - Screen for voiding goods
 * Responsibility: Layout composition only (<100 lines)
 */

import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { Card } from '@src/shared/ui/Card';
import { Button } from '@src/shared/ui/Button';
import { Theme } from '@src/constants/Theme';
import { useVoidGoods } from '../../hooks';
import { styles } from './VoidGoodsScreen.styles';

const VOID_REASONS = [
  { key: 'DAMAGED', label: 'Damaged' },
  { key: 'CANCELLED_BY_CLIENT', label: 'Cancelled by Client' },
  { key: 'ADMIN_ERROR', label: 'Admin Error' },
  { key: 'OTHER', label: 'Other' },
];

export const VoidGoodsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { goodsId, goodsTrackingCode, cbm } = route.params;
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const voidGoods = useVoidGoods();

  const handleConfirm = () => {
    if (!selectedReason) return;

    Alert.alert(
      'Confirm Void',
      'This action cannot be undone. The goods will be marked as voided.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Void',
          style: 'destructive',
          onPress: () => {
            voidGoods.mutate(
              { id: goodsId, reason: selectedReason },
              { onSuccess: () => navigation.goBack() }
            );
          },
        },
      ]
    );
  };

  return (
    <Screen header={{ title: 'Void Goods' }}>
      <View style={styles.container}>
        <Card variant="elevated" style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Warning</Text>
          <Text style={styles.warningText}>
            Voiding goods will permanently mark them as cancelled. This action cannot be undone.
          </Text>
        </Card>

        <Card variant="elevated" style={styles.infoCard}>
          <Text style={styles.infoLabel}>Tracking Code</Text>
          <Text style={styles.infoValue}>{goodsTrackingCode}</Text>
          <Text style={styles.infoLabel}>CBM</Text>
          <Text style={styles.infoValue}>{cbm} m³</Text>
        </Card>

        <Text style={styles.sectionTitle}>Select Reason</Text>
        {VOID_REASONS.map((reason) => (
          <Button
            key={reason.key}
            title={reason.label}
            onPress={() => setSelectedReason(reason.key)}
            variant={selectedReason === reason.key ? 'primary' : 'outline'}
            size="medium"
            fullWidth
            style={styles.reasonButton}
          />
        ))}

        <View style={styles.spacer} />

        <Button
          title="Confirm Void"
          onPress={handleConfirm}
          variant="danger"
          size="large"
          fullWidth
          disabled={!selectedReason || voidGoods.isPending}
          loading={voidGoods.isPending}
        />
      </View>
    </Screen>
  );
};

export default VoidGoodsScreen;
