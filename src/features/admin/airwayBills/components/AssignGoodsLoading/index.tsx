import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const AssignGoodsLoading: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neutral[50] },
    loadingText: { textAlign: 'center', marginTop: 40, color: colors.neutral[500] },
  }), [colors, isDark]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loadingText}>Chargement...</Text>
    </SafeAreaView>
  );
};


