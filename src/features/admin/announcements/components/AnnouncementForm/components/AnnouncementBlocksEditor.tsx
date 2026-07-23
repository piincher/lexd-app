import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@src/shared/ui/Input';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AnnouncementBlockInput } from '../../../types/announcement.types';
import { AnnouncementImagePicker } from './AnnouncementImagePicker';

interface Props {
  blocks: AnnouncementBlockInput[];
  onChange: (blocks: AnnouncementBlockInput[]) => void;
  onInputFocus?: () => void;
  disabled?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

const MAX_BLOCKS = 10;

export const AnnouncementBlocksEditor: React.FC<Props> = ({ blocks, onChange, onInputFocus, disabled, onUploadingChange }) => {
  const { colors } = useAppTheme();

  const update = (index: number, patch: Partial<AnnouncementBlockInput>) => {
    onChange(blocks.map((block, i) => (i === index ? { ...block, ...patch } : block)));
  };
  const remove = (index: number) => onChange(blocks.filter((_, i) => i !== index));
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const add = () => {
    if (blocks.length >= MAX_BLOCKS) return;
    onChange([...blocks, { heading: '', body: '', imageUrl: null }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Parties supplémentaires</Text>
        <Text style={[styles.hint, { color: colors.text.secondary }]}>
          {blocks.length}/{MAX_BLOCKS}
        </Text>
      </View>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Ajoutez plusieurs nouveautés — elles s&apos;afficheront en diapositives glissables (placement « Modal »).
      </Text>

      {blocks.map((block, index) => (
        <View key={index} style={[styles.block, { borderColor: colors.border, backgroundColor: colors.background.card }]}>
          <View style={styles.blockHeader}>
            <Text style={[styles.blockLabel, { color: colors.text.secondary }]}>Partie {index + 1}</Text>
            <View style={styles.blockControls}>
              <Pressable onPress={() => move(index, -1)} disabled={index === 0} hitSlop={6} style={styles.ctrl}>
                <Ionicons name="arrow-up" size={18} color={index === 0 ? colors.border : colors.text.secondary} />
              </Pressable>
              <Pressable
                onPress={() => move(index, 1)}
                disabled={index === blocks.length - 1}
                hitSlop={6}
                style={styles.ctrl}
              >
                <Ionicons
                  name="arrow-down"
                  size={18}
                  color={index === blocks.length - 1 ? colors.border : colors.text.secondary}
                />
              </Pressable>
              <Pressable onPress={() => remove(index)} hitSlop={6} style={styles.ctrl} accessibilityLabel="Supprimer la partie">
                <Ionicons name="trash-outline" size={18} color={colors.status.error} />
              </Pressable>
            </View>
          </View>

          <Input
            label="Titre de la partie"
            value={block.heading ?? ''}
            onChangeText={(text) => update(index, { heading: text })}
            fullWidth
            onFocus={onInputFocus}
          />
          <Input
            label="Texte"
            value={block.body ?? ''}
            onChangeText={(text) => update(index, { body: text })}
            multiline
            numberOfLines={3}
            fullWidth
            onFocus={onInputFocus}
          />
          <AnnouncementImagePicker
            label="Image (optionnel)"
            value={block.imageUrl}
            onChange={(url) => update(index, { imageUrl: url })}
            onClear={() => update(index, { imageUrl: null })}
            disabled={disabled}
            onUploadingChange={onUploadingChange}
          />
        </View>
      ))}

      <Pressable
        onPress={add}
        disabled={disabled || blocks.length >= MAX_BLOCKS}
        style={({ pressed }) => [
          styles.addButton,
          { borderColor: colors.primary.main },
          (disabled || blocks.length >= MAX_BLOCKS) && { opacity: 0.5 },
          pressed && { opacity: 0.7 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Ajouter une partie"
      >
        <Ionicons name="add" size={20} color={colors.primary.main} />
        <Text style={[styles.addText, { color: colors.primary.main }]}>Ajouter une partie</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 8, marginTop: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 15, fontWeight: '700' },
  hint: { fontSize: 13, fontWeight: '600' },
  subtitle: { fontSize: 12, lineHeight: 17, marginBottom: 4 },
  block: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 10 },
  blockHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  blockLabel: { fontSize: 13, fontWeight: '700' },
  blockControls: { flexDirection: 'row', gap: 10 },
  ctrl: { padding: 2 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 12,
  },
  addText: { fontSize: 14, fontWeight: '700' },
});
