import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface Props {
  title: string;
  onBack: () => void;
}

export const AssignGoodsHeader: React.FC<Props> = ({ title, onBack }) => {
  const { colors, isDark } = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Theme.spacing.lg,
      paddingTop: Theme.spacing.md,
      paddingBottom: Theme.spacing.sm,
    },
    title: { fontSize: 17, fontWeight: '700', color: colors.neutral[800] },
    spacer: { width: 24 },
  });
  return (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.spacer} />
  </View>
  );
};


