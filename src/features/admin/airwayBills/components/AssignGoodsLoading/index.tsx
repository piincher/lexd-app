import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const AssignGoodsLoading: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neutral[50] },
    loadingText: { textAlign: 'center', marginTop: 40, color: colors.neutral[500] },
  }), [colors]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loadingText}>Chargement...</Text>
    </SafeAreaView>
  );
};
