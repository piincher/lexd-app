import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Container } from '../../../types';
import { createStyles } from './Header.styles';

interface HeaderInfoBlockProps {
  container?: Container;
}

export const HeaderInfoBlock: React.FC<HeaderInfoBlockProps> = ({ container }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.headerInfo}>
      <Text style={styles.headerTitle}>Assigner des marchandises</Text>
      <Text style={styles.headerSubtitle}>{container?.virtualContainerNumber}</Text>
      {container?.shippingMode && (
        <View
          style={[
            styles.modeBadge,
            {
              backgroundColor:
                container.shippingMode === 'AIR'
                  ? colors.status.error + '4D'
                  : colors.status.info + '4D',
            },
          ]}
        >
          <Ionicons
            name={container.shippingMode === 'AIR' ? 'airplane' : 'boat'}
            size={12}
            color={colors.text.inverse}
          />
          <Text style={styles.modeBadgeText}>
            {container.shippingMode === 'AIR' ? 'Aérien uniquement' : 'Maritime uniquement'}
          </Text>
        </View>
      )}
    </View>
  );
};
