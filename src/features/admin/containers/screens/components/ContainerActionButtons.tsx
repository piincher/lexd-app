import React, { useMemo } from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { GradientActionButton } from './GradientActionButton';
import { ListActionButton } from './ListActionButton';

interface ContainerActionButtonsProps {
  onAssignGoods: () => void;
  onGeneratePackingList: () => void;
  onGoToLoadingList: () => void;
  onMarkReadyForPickup: () => void;
  onMarkDelivered: () => void;
  hasGoods: boolean;
  canMarkReadyForPickup: boolean;
  canMarkDelivered: boolean;
}

export const ContainerActionButtons: React.FC<ContainerActionButtonsProps> = ({
  onAssignGoods,
  onGeneratePackingList,
  onGoToLoadingList,
  onMarkReadyForPickup,
  onMarkDelivered,
  hasGoods,
  canMarkReadyForPickup,
  canMarkDelivered,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Animated.View entering={FadeInUp.delay(500)} style={styles.actionsCard}>
      {canMarkReadyForPickup && (
        <GradientActionButton
          icon="checkmark-done-circle"
          label="Marquer Prêt pour Retrait"
          colors={[Theme.status.warning, Theme.status.warning]}
          onPress={onMarkReadyForPickup}
        />
      )}

      {canMarkDelivered && (
        <GradientActionButton
          icon="checkmark-done-circle"
          label="Marquer comme Livré"
          colors={[Theme.status.success, '#22C55E']}
          onPress={onMarkDelivered}
        />
      )}

      <GradientActionButton
        icon="add-circle"
        label="Assigner des Marchandises"
        colors={Theme.gradients.primary}
        onPress={onAssignGoods}
      />

      {hasGoods && (
        <View style={styles.listButtonsRow}>
          <ListActionButton
            icon="document-text"
            title="📋 Packing List"
            subtitle="Liste de colisage"
            iconBackgroundColor={Theme.primary[100]}
            iconColor={Theme.primary[600]}
            titleColor={Theme.primary[700]}
            chevronColor={Theme.primary[400]}
            gradientColors={[colors.background.paper, colors.background.default]}
            borderColor={colors.primary[200]}
            style={styles.packingListButton}
            onPress={onGeneratePackingList}
          />

          <ListActionButton
            icon="list"
            title="🚛 Loading List"
            subtitle="Plan de chargement"
            iconBackgroundColor={colors.status.warning + '15'}
            iconColor={colors.status.warning}
            titleColor={colors.feedback.warningDark}
            chevronColor={colors.status.warning}
            gradientColors={[colors.status.warning + '10', colors.background.default]}
            borderColor={colors.status.warning + '40'}
            style={styles.loadingListButton}
            onPress={onGoToLoadingList}
          />
        </View>
      )}
    </Animated.View>
  );
};
