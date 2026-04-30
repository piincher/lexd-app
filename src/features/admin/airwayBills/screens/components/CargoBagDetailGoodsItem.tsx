import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { Card } from '@src/shared/ui/Card';
import type { AirwayBillGoods } from '../../types';

interface Props {
  item: AirwayBillGoods;
  isSelected: boolean;
  removeMode: boolean;
  onToggleSelection: (id: string) => void;
}

export const CargoBagDetailGoodsItem: React.FC<Props> = ({ item, isSelected, removeMode, onToggleSelection }) => {
  const { colors } = useAppTheme();
  const goodsCardStyle = StyleSheet.flatten([
    styles.goodsCard,
    isSelected && { borderColor: colors.status.error, borderWidth: 2 },
  ]);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => removeMode && onToggleSelection(item._id)}
      disabled={!removeMode}
    >
      <Card style={goodsCardStyle} padding="medium">
        <View style={styles.goodsRow}>
          {removeMode && (
            <View style={[styles.checkbox, isSelected && { backgroundColor: colors.status.error }]}>
              {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
          )}
          <MaterialCommunityIcons name="cube-outline" size={20} color={colors.primary.main} />
          <View style={styles.goodsInfo}>
            <Text style={[styles.goodsId, { color: colors.text.primary }]}>{item.goodsId}</Text>
            {item.description && (
              <Text style={[styles.goodsDesc, { color: colors.text.secondary }]} numberOfLines={1}>
                {item.description}
              </Text>
            )}
            <Text style={[styles.goodsMeta, { color: colors.text.muted }]}>
              {item.quantity || 0} colis · {item.weight?.toFixed?.(1) || item.weight || 0} kg
            </Text>
          </View>
          <Badge
            label={item.status || 'N/A'}
            variant="default"
            backgroundColor={`${colors.neutral[300]}22`}
            textColor={colors.text.secondary}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goodsCard: { marginBottom: 8 },
  goodsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  goodsInfo: { flex: 1 },
  goodsId: { fontSize: 14, fontWeight: '700' },
  goodsDesc: { fontSize: 13, marginTop: 2 },
  goodsMeta: { fontSize: 12, marginTop: 2, fontWeight: '500' },
});
