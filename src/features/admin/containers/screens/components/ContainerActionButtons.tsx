import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../ContainerDetailScreen.styles';
import { Theme } from '@src/constants/Theme';

interface ContainerActionButtonsProps {
  onAssignGoods: () => void;
  onGeneratePackingList: () => void;
  onGoToLoadingList: () => void;
  onMarkReadyForPickup: () => void;
  hasGoods: boolean;
  canMarkReadyForPickup: boolean;
}

export const ContainerActionButtons: React.FC<ContainerActionButtonsProps> = ({
  onAssignGoods,
  onGeneratePackingList,
  onGoToLoadingList,
  onMarkReadyForPickup,
  hasGoods,
  canMarkReadyForPickup,
}) => {
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
            colors={[Theme.status.warning, '#EA580C']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="checkmark-done-circle" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>
              Marquer Prêt pour Retrait
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
          <Ionicons name="add-circle" size={20} color="#FFF" />
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
              colors={[Theme.primary[50], '#FFFFFF']}
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
              colors={['#FFFBEB', '#FFFFFF']}
              style={styles.listButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={[styles.listButtonIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="list" size={20} color="#D97706" />
              </View>
              <View style={styles.listButtonTextContainer}>
                <Text style={[styles.listButtonTitle, { color: '#92400E' }]}>
                  🚛 Loading List
                </Text>
                <Text style={styles.listButtonSubtitle}>
                  Plan de chargement
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#D97706" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};
