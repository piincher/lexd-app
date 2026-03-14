import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';

interface BottomActionBarProps {
  selectedCount: number;
  totalSelectedCBM: number;
  isOverCapacity: boolean;
  isAssignable: boolean;
  isPending: boolean;
  onAssign: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  selectedCount,
  totalSelectedCBM,
  isOverCapacity,
  isAssignable,
  isPending,
  onAssign,
}) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <Animated.View entering={FadeInUp.springify()} style={styles.bottomBar}>
      <LinearGradient colors={Theme.gradients.card} style={styles.bottomBarGradient}>
        <View style={styles.bottomBarContent}>
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionCount}>{selectedCount} sélectionné(s)</Text>
            <Text style={[styles.selectionCBM, isOverCapacity && styles.selectionCBMError]}>
              {(totalSelectedCBM || 0).toFixed(3)} m³
              {isOverCapacity && ' (Excès)'}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.assignButton, (isPending || isOverCapacity || !isAssignable) && styles.assignButtonDisabled]}
            onPress={onAssign}
            disabled={isPending || isOverCapacity || !isAssignable}
          >
            <LinearGradient
              colors={isOverCapacity || !isAssignable ? Theme.gradients.card : Theme.gradients.primary}
              style={styles.assignButtonGradient}
            >
              {isPending ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Text style={[styles.assignButtonText, (isOverCapacity || !isAssignable) && styles.assignButtonTextDisabled]}>
                    {!isAssignable ? 'Verrouillé' : 'Assigner'}
                  </Text>
                  <Ionicons name={!isAssignable ? "lock-closed" : "arrow-forward"} size={18} color={isOverCapacity || !isAssignable ? Theme.neutral[400] : '#FFF'} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
  bottomBarGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  selectionInfo: {
    flex: 1,
  },
  selectionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[900],
  },
  selectionCBM: {
    fontSize: 14,
    color: Theme.neutral[600],
    marginTop: 4,
  },
  selectionCBMError: {
    color: Theme.status.error,
  },
  assignButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: 16,
  },
  assignButtonDisabled: {
    opacity: 0.7,
  },
  assignButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  assignButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  assignButtonTextDisabled: {
    color: Theme.neutral[400],
  },
});
