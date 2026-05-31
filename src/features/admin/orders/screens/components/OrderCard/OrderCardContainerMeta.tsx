import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';

interface ContainerSummary {
  virtualContainerNumber?: string;
  containerNumber?: string;
  status?: string;
  shippingLine?: string;
}

interface OrderCardContainerMetaProps {
  containerSummaries?: ContainerSummary[];
  legacyContainerNumber?: string;
  goodsCount?: number;
}

export const OrderCardContainerMeta: React.FC<OrderCardContainerMetaProps> = ({
  containerSummaries,
  legacyContainerNumber,
  goodsCount,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const primaryContainer = containerSummaries?.[0];
  const containerLabel =
    primaryContainer?.virtualContainerNumber || primaryContainer?.containerNumber || legacyContainerNumber;
  const remainingContainers = Math.max((containerSummaries?.length || 0) - 1, 0);

  if (!containerLabel && !goodsCount) return null;

  return (
    <View style={styles.containerMetaRow}>
      {containerLabel && (
        <View style={styles.containerMetaPill}>
          <MaterialIcons name="inventory-2" size={13} color={colors.primary.main} />
          <Text style={styles.containerMetaText} numberOfLines={1}>
            {containerLabel}{remainingContainers ? ` +${remainingContainers}` : ''}
          </Text>
        </View>
      )}

      {!!goodsCount && (
        <View style={styles.containerMetaPill}>
          <MaterialIcons name="category" size={13} color={colors.text.secondary} />
          <Text style={styles.containerMetaText}>{goodsCount} colis</Text>
        </View>
      )}

      {primaryContainer?.status && (
        <View style={styles.containerMetaPill}>
          <MaterialIcons name="flag" size={13} color={colors.text.secondary} />
          <Text style={styles.containerMetaText} numberOfLines={1}>{primaryContainer.status}</Text>
        </View>
      )}

      {legacyContainerNumber && !primaryContainer && (
        <View style={styles.manualMetaPill}>
          <Text style={styles.manualMetaText}>manuel</Text>
        </View>
      )}
    </View>
  );
};
