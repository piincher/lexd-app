import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface Props {
  selectedCount: number;
  isOverCapacity: boolean;
  isAssigning: boolean;
  onAssign: () => void;
}

export const AssignGoodsFooter: React.FC<Props> = ({
  selectedCount,
  isOverCapacity,
  isAssigning,
  onAssign,
}) => (
  <View style={styles.container}>
    <PaperButton
      mode="contained"
      onPress={onAssign}
      loading={isAssigning}
      disabled={selectedCount === 0 || isAssigning || isOverCapacity}
      style={styles.assignButton}
    >
      Assigner {selectedCount > 0 ? `(${selectedCount})` : ''}
    </PaperButton>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  assignButton: { borderRadius: Theme.radius.lg },
});
