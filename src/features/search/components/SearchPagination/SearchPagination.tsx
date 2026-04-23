import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const SearchPagination: React.FC<SearchPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canGoPrevious && styles.disabledButton]}
        onPress={() => canGoPrevious && onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={canGoPrevious ? Theme.neutral[700] : Theme.neutral[400]}
        />
      </TouchableOpacity>

      <Text style={styles.pageInfo}>
        Page {currentPage} sur {totalPages}
      </Text>

      <TouchableOpacity
        style={[styles.button, !canGoNext && styles.disabledButton]}
        onPress={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={canGoNext ? Theme.neutral[700] : Theme.neutral[400]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.lg,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Theme.neutral[50],
  },
  pageInfo: {
    fontSize: 14,
    color: Theme.neutral[700],
  },
});
