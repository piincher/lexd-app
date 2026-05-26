import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ClientPackingListScreen.styles';
import { ShimmerBlock } from '@src/shared/ui';

export const LoadingState: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
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
