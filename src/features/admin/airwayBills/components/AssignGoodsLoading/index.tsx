import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const AssignGoodsLoading: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.loadingText}>Chargement...</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.neutral[50] },
  loadingText: { textAlign: 'center', marginTop: 40, color: Theme.neutral[500] },
});
