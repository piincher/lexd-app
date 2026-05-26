import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GoodsListHeaderActionsProps {
  onScanPress?: () => void;
  onToggleSelectionMode?: () => void;
  onExportPress?: () => void;
  isSelectionMode?: boolean;
  primaryColor: string;
  errorColor: string;
  cardBgColor: string;
}

export const GoodsListHeaderActions: React.FC<GoodsListHeaderActionsProps> = ({
  onScanPress,
  onToggleSelectionMode,
  onExportPress,
  isSelectionMode,
  primaryColor,
  errorColor,
  cardBgColor,
}) => (
  <View style={styles.actionsContainer}>
    {/* Scan button — hidden while in selection mode so it doesn't compete with the
        cancel-selection affordance and so the toolbar stays clean for bulk operations. */}
    {onScanPress && !isSelectionMode && (
      <TouchableOpacity
        onPress={onScanPress}
        style={[styles.actionButton, { backgroundColor: cardBgColor }]}
        activeOpacity={0.8}
        accessibilityLabel="Scanner un QR code"
      >
        <Ionicons name="scan-outline" size={22} color={primaryColor} />
      </TouchableOpacity>
    )}
    {onToggleSelectionMode && (
      <TouchableOpacity
        onPress={onToggleSelectionMode}
        style={[styles.actionButton, { backgroundColor: cardBgColor }]}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isSelectionMode ? 'close' : 'checkbox-outline'}
          size={22}
          color={isSelectionMode ? errorColor : primaryColor}
        />
      </TouchableOpacity>
    )}
    {onExportPress && !isSelectionMode && (
      <TouchableOpacity
        onPress={onExportPress}
        style={[styles.actionButton, { backgroundColor: cardBgColor }]}
        activeOpacity={0.8}
      >
        <Ionicons name="document-text" size={22} color={primaryColor} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
