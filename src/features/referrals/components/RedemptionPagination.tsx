import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RedemptionPagination.styles';

interface RedemptionPaginationProps {
  page: number;
  pages: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export const RedemptionPagination: React.FC<RedemptionPaginationProps> = ({
  page,
  pages,
  total,
  onPrev,
  onNext,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (pages <= 1) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        Page {page} / {pages} • {total} total
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, page <= 1 && styles.buttonDisabled]}
          onPress={onPrev}
          disabled={page <= 1}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={20}
            color={page <= 1 ? colors.text.disabled : colors.primary.main}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, page >= pages && styles.buttonDisabled]}
          onPress={onNext}
          disabled={page >= pages}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={page >= pages ? colors.text.disabled : colors.primary.main}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
