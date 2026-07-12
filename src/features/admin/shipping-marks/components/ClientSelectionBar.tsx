import React from 'react';
import { Text, View } from 'react-native';
import { Checkbox } from '@src/shared/ui/Checkbox';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ClientSelectionBar.styles';

interface ClientSelectionBarProps {
  clientCount: number;
  selectedCount: number;
  allSelected: boolean;
  onToggleAll: () => void;
}

export const ClientSelectionBar: React.FC<ClientSelectionBarProps> = ({
  clientCount,
  selectedCount,
  allSelected,
  onToggleAll,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Checkbox
        checked={allSelected}
        onPress={onToggleAll}
        disabled={clientCount === 0}
        style={styles.checkbox}
        accessibilityLabel={allSelected ? 'Désélectionner cette page' : 'Sélectionner cette page'}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{allSelected ? 'Page sélectionnée' : 'Sélectionner cette page'}</Text>
        <Text style={styles.subtitle} selectable>
          {selectedCount > 0 ? `${selectedCount} sur ${clientCount} sélectionnés` : `${clientCount} clients affichés`}
        </Text>
      </View>
    </View>
  );
};
