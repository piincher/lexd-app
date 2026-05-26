import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from '../GoodsDetailScreen.styles';
import { Goods } from '../../../types';

interface GoodsDetailPropertiesProps {
  goods: Goods;
}

export const GoodsDetailProperties: React.FC<GoodsDetailPropertiesProps> = ({ goods }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const local = useMemo(() => createLocal(colors), [colors]);

  const metrics = [
    { label: 'CBM', value: `${+(goods.actualCBM ?? 0).toFixed(3)} m³` },
    { label: 'POIDS', value: `${goods.weight ?? 0} kg` },
    { label: 'QTÉ', value: `${goods.quantity ?? 1}` },
  ];

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Ionicons name="cube-outline" size={20} color={colors.primary.main} />
          <Text style={styles.sectionTitle}>Caractéristiques physiques</Text>
        </View>

        <View style={local.strip}>
          {metrics.map((m, i) => (
            <React.Fragment key={m.label}>
              {i > 0 && <View style={local.divider} />}
              <View style={local.metric}>
                <Text style={local.label}>{m.label}</Text>
                <Text style={local.value}>{m.value}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {goods.dimensions && (
          <View style={[styles.dimensionsBox, local.dims]}>
            <Ionicons name="resize-outline" size={18} color={colors.text.secondary} />
            <Text style={styles.dimensionsText}>
              {goods.dimensions.length} × {goods.dimensions.width} × {goods.dimensions.height} cm
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const createLocal = (colors: any) =>
  StyleSheet.create({
    strip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
      backgroundColor: colors.background.paper,
    },
    divider: {
      width: 1,
      height: 28,
      backgroundColor: colors.border,
    },
    metric: {
      flex: 1,
      alignItems: 'center',
      gap: 3,
    },
    label: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.6,
      color: colors.text.secondary,
    },
    value: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text.primary,
    },
    dims: {
      marginTop: Theme.spacing.md,
    },
  });
