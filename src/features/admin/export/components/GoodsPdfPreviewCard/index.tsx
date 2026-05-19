import React from "react";
import { View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { createStyles } from './GoodsPdfPreviewCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsPdfPreviewCardProps {
  isLoading: boolean;
  goodsCount: number;
  visible: boolean;
}

export const GoodsPdfPreviewCard: React.FC<GoodsPdfPreviewCardProps> = ({
  isLoading,
  goodsCount,
  visible,
}) => {
  if (!visible) return null;

  const { colors, isDark } = useAppTheme();

  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>Marchandises trouvées</Text>
      {isLoading && goodsCount === 0 ? (
        <ActivityIndicator size="small" color={colors.primary[500]} />
      ) : (
        <Text style={styles.cardValue}>{goodsCount}</Text>
      )}
    </View>
  );
};
