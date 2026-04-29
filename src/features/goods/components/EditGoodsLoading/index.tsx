import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { EditGoodsHeader } from '../EditGoodsHeader';

interface EditGoodsLoadingProps {
  onBack: () => void;
  onNotification: () => void;
}

export const EditGoodsLoading: React.FC<EditGoodsLoadingProps> = ({
  onBack,
  onNotification,
}) => {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]}>
      <EditGoodsHeader
        title="Modifier"
        onBack={onBack}
        onNotification={onNotification}
        color={colors.text.secondary}
      />
      <View style={styles.shimmerContainer}>
        <ShimmerBlock width="60%" height={18} borderRadius={4} />
        <ShimmerBlock width="100%" height={48} borderRadius={8} />
        <ShimmerBlock width="100%" height={48} borderRadius={8} />
        <ShimmerBlock width="100%" height={48} borderRadius={8} />
        <ShimmerBlock width="100%" height={80} borderRadius={8} />
        <ShimmerBlock width="100%" height={48} borderRadius={8} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shimmerContainer: {
    padding: 16,
    gap: 16,
  },
});
