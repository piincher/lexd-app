import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { ClientGoodsGroup } from '../../types/packingList';
import { createStyles } from './ClientGoodsSection.styles';

interface ClientHeaderProps {
  clientGroup: ClientGoodsGroup;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({ clientGroup, isExpanded, onToggle }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { clientName, clientPhone, summary } = clientGroup;
  const balance = summary.balanceDue || 0;
  const isPaid = balance <= 0;
  const isPartial = !isPaid && (summary.totalPaid || 0) > 0;
  const statusColor = isPaid ? colors.status.success : isPartial ? colors.status.warning : colors.status.error;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onToggle} style={styles.header}>
      <LinearGradient colors={[colors.primary[50], colors.background.card]} style={styles.headerGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.headerContent}>
          <View style={styles.clientInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{clientName.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.clientDetails}>
              <Text style={styles.clientName} numberOfLines={2}>{clientName}</Text>
              <View style={styles.phoneRow}>
                <Ionicons name="call-outline" size={12} color={colors.neutral[500]} />
                <Text style={styles.clientPhone}>{clientPhone}</Text>
              </View>
              <View style={styles.financialRow}>
                <Text style={styles.totalCost}>{(summary.totalCost || 0).toLocaleString()} FCFA</Text>
                {isPaid ? (
                  <View style={[styles.balanceBadge, { backgroundColor: colors.status.success + '20' }]}>
                    <Text style={[styles.balanceText, { color: colors.status.success }]}>Payé</Text>
                  </View>
                ) : (
                  <View style={[styles.balanceBadge, { backgroundColor: statusColor + '20' }]}>
                    <Text style={[styles.balanceText, { color: statusColor }]}>
                      Solde: {(summary.balanceDue || 0).toLocaleString()} FCFA
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{clientGroup.goods.length}</Text>
              <Text style={styles.summaryLabel}>Colis</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{summary.totalQuantity}</Text>
              <Text style={styles.summaryLabel}>Articles</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{summary.totalCBM.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>m³</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{summary.totalWeight.toFixed(0)}</Text>
              <Text style={styles.summaryLabel}>kg</Text>
            </View>
          </View>

          <View style={styles.expandIcon}>
            <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.primary[600]} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
