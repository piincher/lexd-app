/**
 * PackingListSkeleton Component
 * Loading state for packing list screen
 * SRP: Display loading skeleton
 */

import React from 'react';
import { View } from 'react-native';
import { Appbar, ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListSkeleton.styles';

interface PackingListSkeletonProps {
  onBack: () => void;
}

export const PackingListSkeleton: React.FC<PackingListSkeletonProps> = ({ onBack }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Liste de Colisage" />
      </Appbar.Header>
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>
          Chargement de votre liste de colisage...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PackingListSkeleton;
