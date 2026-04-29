import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface ContainerProfitCardReconcileButtonProps {
  onReconcile: () => void;
}

export const ContainerProfitCardReconcileButton: React.FC<ContainerProfitCardReconcileButtonProps> = ({
  onReconcile,
}) => (
  <TouchableOpacity onPress={onReconcile} style={styles.reconcileButton} activeOpacity={0.7}>
    <Ionicons name="sync" size={18} color={Theme.colors.background.card} />
    <Text style={styles.reconcileText}>Réconcilier avec l'agent</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  reconcileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 14,
  },
  reconcileText: {
    color: Theme.colors.background.card,
    fontSize: 14,
    fontWeight: '700',
  },
});
