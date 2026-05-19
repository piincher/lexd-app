import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OutstandingPaymentsPagination.styles';

interface OutstandingPaymentsPaginationProps {
  pagination: { page: number; pages: number };
  onPrev: () => void;
  onNext: () => void;
}

export const OutstandingPaymentsPagination: React.FC<OutstandingPaymentsPaginationProps> = ({
  pagination,
  onPrev,
  onNext,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { page, pages } = pagination;
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= pages;

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={[styles.pageButton, isPrevDisabled && styles.pageButtonDisabled]}
        onPress={onPrev}
        disabled={isPrevDisabled}
      >
        <Ionicons
          name="chevron-back"
          size={18}
          color={isPrevDisabled ? colors.text.muted : colors.text.primary}
        />
      </TouchableOpacity>
      <Text style={styles.pageText}>
        Page {page} / {pages}
      </Text>
      <TouchableOpacity
        style={[styles.pageButton, isNextDisabled && styles.pageButtonDisabled]}
        onPress={onNext}
        disabled={isNextDisabled}
      >
        <Ionicons
          name="chevron-forward"
          size={18}
          color={isNextDisabled ? colors.text.muted : colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};
