/**
 * VoidGoodsScreen - Screen for voiding goods
 * Responsibility: Layout composition only (<100 lines)
 */

import React from 'react';
import { View } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { useVoidGoodsScreen } from '../../hooks';
import {
  VoidGoodsWarningCard,
  VoidGoodsInfoCard,
  VoidGoodsReasonSelector,
  VoidGoodsConfirmButton,
} from '../../components';
import { createStyles } from './VoidGoodsScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const VoidGoodsScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    goodsTrackingCode,
    cbm,
    selectedReason,
    setSelectedReason,
    isPending,
    handleConfirm,
  } = useVoidGoodsScreen();

  return (
    <Screen header={{ title: 'Void Goods', showNotificationBell: true }}>
      <View style={styles.container}>
        <VoidGoodsWarningCard />
        <VoidGoodsInfoCard trackingCode={goodsTrackingCode} cbm={cbm} />
        <VoidGoodsReasonSelector
          selectedReason={selectedReason}
          onSelect={setSelectedReason}
        />
        <View style={styles.spacer} />
        <VoidGoodsConfirmButton
          onPress={handleConfirm}
          disabled={!selectedReason || isPending}
          loading={isPending}
        />
      </View>
    </Screen>
  );
};

export default VoidGoodsScreen;
