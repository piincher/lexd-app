import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  onBack: () => void;
}

export const CargoBagDetailSkeleton: React.FC<Props> = ({ onBack }) => {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Détail du sac</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.centered}>
        <Text style={{ color: colors.text.secondary }}>Chargement...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, marginHorizontal: 12 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
