import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface ContainerProfitCardReconcileButtonProps {
  onReconcile: () => void;
}

export const ContainerProfitCardReconcileButton: React.FC<ContainerProfitCardReconcileButtonProps> = ({
  onReconcile,
}) => {
  const { colors } = useAppTheme();
  return (
  <TouchableOpacity onPress={onReconcile} style={[styles.reconcileButton, { backgroundColor: colors.status.info }]} activeOpacity={0.7}>
    <Ionicons name="sync" size={18} color={colors.background.card} />
    <Text style={styles.reconcileText}>Réconcilier avec l'agent</Text>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
  reconcileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
