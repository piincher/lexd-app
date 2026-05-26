/**
 * PackingListHeader Component
 * Header with title, client info, date range
 * SRP: Display document header information
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Divider, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PackingListHeader.styles';

interface PackingListHeaderProps {
  containerNumber: string;
  shippingMode: 'SEA' | 'AIR';
  shippingLineLabel: string;
  generatedAt?: string;
}

const getShippingModeIcon = (
  mode: 'SEA' | 'AIR'
): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
  return mode === 'SEA' ? 'ferry' : 'airplane';
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Non disponible';
  try {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

export const PackingListHeader: React.FC<PackingListHeaderProps> = ({
  containerNumber,
  shippingMode,
  shippingLineLabel,
  generatedAt,
}) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Card style={[styles.documentCard, styles.headerCard]}>
      <Card.Content>
        <View style={styles.documentHeader}>
          <View style={styles.documentIconContainer}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={40}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.documentTitleContainer}>
            <Text style={styles.documentTitle}>LISTE DE COLISAGE</Text>
            <Text style={styles.documentSubtitle}>{containerNumber}</Text>
          </View>
        </View>
        <Divider style={styles.headerDivider} />
        <View style={styles.documentMeta}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              name={getShippingModeIcon(shippingMode)}
              size={16}
              color={colors.text.secondary}
            />
            <Text style={styles.metaText}>{shippingLineLabel}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              name="calendar"
              size={16}
              color={colors.text.secondary}
            />
            <Text style={styles.metaText}>{formatDate(generatedAt)}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PackingListHeader;
