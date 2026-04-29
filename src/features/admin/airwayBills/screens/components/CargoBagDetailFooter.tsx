import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button } from '@src/shared/ui/Button';

interface Props {
  removeMode: boolean;
  selectedCount: number;
  onConfirmRemove: () => void;
  onAddGoods: () => void;
  onToggleRemoveMode: () => void;
  isRemoving: boolean;
  isEmpty: boolean;
}

export const CargoBagDetailFooter: React.FC<Props> = ({
  removeMode,
  selectedCount,
  onConfirmRemove,
  onAddGoods,
  onToggleRemoveMode,
  isRemoving,
  isEmpty,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.footer, { backgroundColor: colors.background.default, borderTopColor: colors.border }]}>
      {removeMode ? (
        <Button
          title={`Retirer (${selectedCount})`}
          onPress={onConfirmRemove}
          variant="danger"
          fullWidth
          loading={isRemoving}
          disabled={selectedCount === 0 || isRemoving}
        />
      ) : (
        <>
          <Button title="+ Ajouter des marchandises" onPress={onAddGoods} variant="primary" fullWidth />
          {!isEmpty && (
            <Button title="Retirer des marchandises" onPress={onToggleRemoveMode} variant="outline" fullWidth />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, gap: 10, borderTopWidth: 1 },
});
