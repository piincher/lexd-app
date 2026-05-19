import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';


interface FloatingActionButtonsProps {
  onAddWaypoint: () => void;
  onImportTemplate: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onAddWaypoint,
  onImportTemplate,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity style={styles.fabSecondary} onPress={onImportTemplate}>
        <Ionicons name="download" size={20} color={colors.primary.main} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fab} onPress={onAddWaypoint}>
        <Ionicons name="add" size={24} color={colors.text.inverse} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
