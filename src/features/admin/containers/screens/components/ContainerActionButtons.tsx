import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';


import { GradientActionButton } from './GradientActionButton';
import { ListActionButton } from './ListActionButton';

interface ContainerActionButtonsProps {
  onAssignGoods: () => void;
  onGeneratePackingList: () => void;
  onGoToLoadingList: () => void;
  onMarkReadyForPickup: () => void;
  onMarkDelivered: () => void;
  onDeleteContainer: () => void;
  hasGoods: boolean;
  canMarkReadyForPickup: boolean;
  canMarkDelivered: boolean;
  isDeletingContainer: boolean;
}

export const ContainerActionButtons: React.FC<ContainerActionButtonsProps> = ({
  onAssignGoods,
  onGeneratePackingList,
  onGoToLoadingList,
  onMarkReadyForPickup,
  onMarkDelivered,
  onDeleteContainer,
  hasGoods,
  canMarkReadyForPickup,
  canMarkDelivered,
  isDeletingContainer,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Animated.View entering={FadeInUp.delay(500)} style={styles.actionsCard}>
      {canMarkReadyForPickup && (
        <GradientActionButton
          icon="checkmark-done-circle"
          label="Marquer Prêt pour Retrait"
          colors={[colors.status.warning, colors.status.warning]}
          onPress={onMarkReadyForPickup}
        />
      )}

      {canMarkDelivered && (
        <GradientActionButton
          icon="checkmark-done-circle"
          label="Marquer comme Livré"
          colors={[colors.status.success, colors.status.success]}
          onPress={onMarkDelivered}
        />
      )}

      <GradientActionButton
        icon="add-circle"
        label="Assigner des Marchandises"
        colors={[colors.primary[500], colors.primary[700]]}
        onPress={onAssignGoods}
      />

      {hasGoods && (
        <View style={styles.listButtonsRow}>
          <ListActionButton
            icon="document-text"
            title="📋 Packing List"
            subtitle="Liste de colisage"
            iconBackgroundColor={colors.primary[100]}
            iconColor={colors.primary[600]}
            titleColor={colors.primary[700]}
            chevronColor={colors.primary[400]}
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

      <TouchableOpacity
        style={[
          styles.actionButtonDanger,
          isDeletingContainer && styles.actionButtonDangerDisabled,
        ]}
        onPress={onDeleteContainer}
        activeOpacity={0.85}
        disabled={isDeletingContainer}
      >
        {isDeletingContainer ? (
          <ActivityIndicator size="small" color={colors.status.error} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={colors.status.error} />
        )}
        <Text
          style={[
            styles.actionButtonTextDanger,
            isDeletingContainer && styles.actionButtonTextDisabled,
          ]}
        >
          {isDeletingContainer ? 'Suppression...' : 'Supprimer le container'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
