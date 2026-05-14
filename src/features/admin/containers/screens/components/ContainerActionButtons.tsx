import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {  createStyles  } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

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
      {/* Mark Ready for Pickup Button */}
      {canMarkReadyForPickup && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onMarkReadyForPickup}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[Theme.status.warning, Theme.status.warning]}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="checkmark-done-circle" size={20} color={colors.text.inverse} />
            <Text style={styles.actionButtonText}>
              Marquer Prêt pour Retrait
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Mark Delivered Button */}
      {canMarkDelivered && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onMarkDelivered}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[Theme.status.success, '#22C55E']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="checkmark-done-circle" size={20} color={colors.text.inverse} />
            <Text style={styles.actionButtonText}>
              Marquer comme Livré
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Assign Goods Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onAssignGoods}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={Theme.gradients.primary}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="add-circle" size={20} color={colors.text.inverse} />
          <Text style={styles.actionButtonText}>Assigner des Marchandises</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* List View Buttons Row - Only when hasGoods */}
      {hasGoods && (
        <View style={styles.listButtonsRow}>
          {/* Generate Packing List Button */}
          <TouchableOpacity
            style={[styles.listButton, styles.packingListButton]}
            onPress={onGeneratePackingList}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.background.paper, colors.background.default]}
              style={styles.listButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={[styles.listButtonIcon, { backgroundColor: Theme.primary[100] }]}>
                <Ionicons name="document-text" size={20} color={Theme.primary[600]} />
              </View>
              <View style={styles.listButtonTextContainer}>
                <Text style={[styles.listButtonTitle, { color: Theme.primary[700] }]}>
                  📋 Packing List
                </Text>
                <Text style={styles.listButtonSubtitle}>
                  Liste de colisage
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Theme.primary[400]} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Loading List Button */}
          <TouchableOpacity
            style={[styles.listButton, styles.loadingListButton]}
            onPress={onGoToLoadingList}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.status.warning + '10', colors.background.default]}
              style={styles.listButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={[styles.listButtonIcon, { backgroundColor: colors.status.warning + '15' }]}>
                <Ionicons name="list" size={20} color={colors.status.warning} />
              </View>
              <View style={styles.listButtonTextContainer}>
                <Text style={[styles.listButtonTitle, { color: '#92400E' }]}>
                  🚛 Loading List
                </Text>
                <Text style={styles.listButtonSubtitle}>
                  Plan de chargement
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.status.warning} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};
