import React from "react";
import { View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Theme } from "@src/constants/Theme";
import { styles } from "./GoodsPdfPreviewCard.styles";

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

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>Marchandises trouvées</Text>
      {isLoading && goodsCount === 0 ? (
        <ActivityIndicator size="small" color={Theme.primary[500]} />
      ) : (
        <Text style={styles.cardValue}>{goodsCount}</Text>
      )}
    </View>
  );
};
