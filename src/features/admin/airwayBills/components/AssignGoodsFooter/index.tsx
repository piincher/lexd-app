import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      padding: Theme.spacing.lg,
      backgroundColor: colors.background.card,
      borderTopWidth: 1,
      borderTopColor: colors.neutral[100],
    },
    assignButton: { borderRadius: Theme.radius.lg },
  }), [colors, isDark]);
  return (
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
};


