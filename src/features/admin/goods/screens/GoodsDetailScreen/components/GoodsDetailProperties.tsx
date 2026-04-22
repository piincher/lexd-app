import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Goods } from '../../../types';

interface GoodsDetailPropertiesProps {
  goods: Goods;
}

export const GoodsDetailProperties: React.FC<GoodsDetailPropertiesProps> = ({ goods }) => {
  const { colors } = useAppTheme();

  const items = [
    { icon: 'cube-outline' as const, label: 'CBM', value: goods.actualCBM?.toFixed(3) || '0', color: Theme.primary[600], highlight: true },
    { icon: 'weight-outline' as const, label: 'Poids', value: `${goods.weight || 0} kg`, color: Theme.accent.mint, highlight: false },
    { icon: 'layers-outline' as const, label: 'Quantité', value: `${goods.quantity || 1} unité(s)`, color: Theme.accent.coral, highlight: false },
  ];

  return (
    <Card style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Card.Content>
        <View style={styles.header}>
          <Ionicons name="cube-outline" size={20} color={Theme.primary[600]} />
          <Text style={[styles.title, { color: colors.text.primary }]}>
            Caractéristiques physiques
          </Text>
        </View>
        <View style={styles.grid}>
          {items.map((item, i) => (
            <View
              key={i}
              style={[
                styles.item,
                item.highlight && styles.itemHighlight,
                { backgroundColor: item.highlight ? colors.primary[50] : colors.neutral[50] },
              ]}
            >
              <Ionicons name={item.icon as any} size={28} color={item.color} />
              <Text
                style={[
                  styles.value,
                  item.highlight && styles.valueHighlight,
                  { color: item.highlight ? colors.primary[600] : colors.text.primary },
                ]}
              >
                {item.value}
              </Text>
              <Text style={[styles.label, { color: colors.text.secondary }]}>{item.label}</Text>
            </View>
          ))}
        </View>
        {goods.dimensions && (
          <View style={[styles.dimensions, { backgroundColor: colors.neutral[100] }]}>
            <Ionicons name="resize-outline" size={18} color={colors.text.secondary} />
            <Text style={[styles.dimensionsText, { color: colors.text.primary }]}>
              {goods.dimensions.length} × {goods.dimensions.width} × {goods.dimensions.height} cm
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: Theme.radius.lg },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700', marginLeft: 10 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  item: { flex: 1, alignItems: 'center', paddingVertical: 16, borderRadius: Theme.radius.md, marginHorizontal: 4 },
  itemHighlight: { borderWidth: 2, borderColor: Theme.primary[200] },
  value: { fontSize: 18, fontWeight: '700', marginTop: 4 },
  valueHighlight: { fontSize: 20, fontWeight: '800' },
  label: { fontSize: 12, fontWeight: '500', marginTop: 6 },
  dimensions: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: Theme.radius.sm },
  dimensionsText: { fontSize: 14, fontWeight: '600', marginLeft: 10 },
});
