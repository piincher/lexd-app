import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface LoadingStateProps {
  onBack: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ onBack }) => {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={Theme.gradients.primary} style={styles.loadingHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Theme.colors.text.inverse} />
        </TouchableOpacity>
        <Text style={styles.loadingTitle}>Chargement...</Text>
      </LinearGradient>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.primary[500]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  loadingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  backButton: {
    marginRight: Theme.spacing.sm,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Theme.colors.text.inverse,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
