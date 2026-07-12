import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PaginationControls.styles';

interface PaginationControlsProps {
  page: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  pages,
  hasPrev,
  hasNext,
  onPageChange,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const previous = useCallback(() => onPageChange(page - 1), [onPageChange, page]);
  const next = useCallback(() => onPageChange(page + 1), [onPageChange, page]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={previous}
        disabled={!hasPrev}
        style={({ pressed }) => [styles.button, !hasPrev && styles.disabled, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Page précédente"
        accessibilityState={{ disabled: !hasPrev }}
      >
        <Ionicons name="chevron-back" size={21} color={hasPrev ? colors.text.primary : colors.text.disabled} />
      </Pressable>
      <View style={styles.pageInfo}>
        <Text style={styles.pageValue} selectable>{page} / {pages}</Text>
        <Text style={styles.pageLabel}>Pages</Text>
      </View>
      <Pressable
        onPress={next}
        disabled={!hasNext}
        style={({ pressed }) => [styles.button, !hasNext && styles.disabled, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Page suivante"
        accessibilityState={{ disabled: !hasNext }}
      >
        <Ionicons name="chevron-forward" size={21} color={hasNext ? colors.text.primary : colors.text.disabled} />
      </Pressable>
    </View>
  );
};
