/**
 * PackingListSkeleton Component
 * Loading state for packing list screen
 * SRP: Display loading skeleton
 */

import React from 'react';
import { View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { ShimmerBlock } from '@src/shared/ui';
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
      <View style={{ padding: 16, gap: 12 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}>
            <ShimmerBlock width={48} height={48} borderRadius={8} />
            <View style={{ flex: 1, gap: 8 }}>
              <ShimmerBlock width={'60%'} height={14} borderRadius={3} />
              <ShimmerBlock width={'40%'} height={10} borderRadius={3} />
            </View>
            <ShimmerBlock width={60} height={22} borderRadius={6} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PackingListSkeleton;
