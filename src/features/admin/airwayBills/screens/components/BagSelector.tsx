import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  cargoBags: any[];
  selectedBagId: string | null;
  onSelectBag: (bagId: string | null) => void;
  onCreateBag: () => void;
}

export const BagSelector: React.FC<Props> = ({ cargoBags, selectedBagId, onSelectBag, onCreateBag }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.paper }]}>
      <Text style={[styles.label, { color: colors.text.primary }]}>Sac de destination</Text>
      {cargoBags.length === 0 ? (
        <PaperButton mode="outlined" onPress={onCreateBag} icon="plus" style={styles.button}>
          Créer un sac d'abord
        </PaperButton>
      ) : (
        <View style={styles.chips}>
          <PaperButton
            mode={selectedBagId === null ? 'contained' : 'outlined'}
            onPress={() => onSelectBag(null)}
            style={styles.chip}
          >
            AWB direct
          </PaperButton>
          {cargoBags.map((bag: any) => (
            <PaperButton
              key={bag._id}
              mode={selectedBagId === bag._id ? 'contained' : 'outlined'}
              onPress={() => onSelectBag(bag._id)}
              style={styles.chip}
            >
              {bag.bagNumber}
            </PaperButton>
          ))}
          <PaperButton mode="outlined" onPress={onCreateBag} icon="plus" style={styles.chip}>
            Nouveau
          </PaperButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 8 },
  button: { borderRadius: 8, alignSelf: 'flex-start' },
});
