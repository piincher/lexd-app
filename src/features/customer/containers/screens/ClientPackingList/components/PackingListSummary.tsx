/**
 * PackingListSummary - Container summary card
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Chip, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHIPPING_MODE_LABELS } from '../../../types';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PackingListSummaryProps {
  containerNumber?: string;
  shippingMode?: 'air' | 'sea';
  status?: string;
  totalCBM?: number;
  totalWeight?: number;
  totalPackages?: number;
  departureDate?: string;
  arrivalDate?: string;
  getShippingModeIcon: (mode: string) => string;
  getStatusColor: (status: string) => { bg: string; text: string; icon: string } | string;
  formatDate: (date?: string) => string;
}

export const PackingListSummary: React.FC<PackingListSummaryProps> = ({
  containerNumber, shippingMode, status, totalCBM, totalWeight, totalPackages,
  departureDate, arrivalDate, getShippingModeIcon, getStatusColor, formatDate,
}) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    card: { marginHorizontal: 16, marginBottom: 16, elevation: 2 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    containerInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    containerTextContainer: { marginLeft: 12 },
    containerLabel: { fontFamily: Fonts.regular, fontSize: 12, color: colors.status.success },
    containerNumber: { fontFamily: Fonts.bold, fontSize: 16, color: colors.text.secondary, marginTop: 2 },
    statusChip: { borderRadius: 16 },
    statusText: { fontFamily: Fonts.meduim, fontSize: 12 },
    modeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    modeText: { fontFamily: Fonts.meduim, fontSize: 14, color: colors.text.secondary, marginLeft: 8 },
    totalsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16, paddingVertical: 12, backgroundColor: colors.background.paper, borderRadius: 8 },
    totalItem: { alignItems: 'center' },
    totalValue: { fontFamily: Fonts.bold, fontSize: 16, color: colors.text.secondary, marginTop: 4 },
    totalLabel: { fontFamily: Fonts.regular, fontSize: 12, color: colors.status.success, marginTop: 2 },
    datesContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    dateItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    dateLabel: { fontFamily: Fonts.regular, fontSize: 12, color: colors.status.success, marginLeft: 6 },
    dateValue: { fontFamily: Fonts.meduim, fontSize: 12, color: colors.text.secondary, marginLeft: 4 },
  }), [colors, isDark]);

  const rawStatusColor = status ? getStatusColor(status) : null;
  const statusColorObj = rawStatusColor && typeof rawStatusColor === 'object' ? rawStatusColor as any : null;
  const statusBg = statusColorObj?.bg || colors.background.paper;
  const statusText = statusColorObj?.text || (typeof rawStatusColor === 'string' ? rawStatusColor : colors.text.secondary);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.containerInfo}>
            <MaterialCommunityIcons name="package-variant-closed" size={24} color={theme.colors.primary} />
            <View style={styles.containerTextContainer}>
              <Text style={styles.containerLabel}>Container</Text>
              <Text style={styles.containerNumber}>{containerNumber || 'N/A'}</Text>
            </View>
          </View>
          {status && (
            <Chip style={[styles.statusChip, { backgroundColor: statusBg }]} textStyle={[styles.statusText, { color: statusText }]}>
              {status}
            </Chip>
          )}
        </View>

        {shippingMode && (
          <View style={styles.modeRow}>
            <MaterialCommunityIcons name={getShippingModeIcon(shippingMode) as any} size={18} color={colors.text.secondary} />
            <Text style={styles.modeText}>
              {SHIPPING_MODE_LABELS[shippingMode.toUpperCase() as 'SEA' | 'AIR'] || shippingMode}
            </Text>
          </View>
        )}

        <View style={styles.totalsContainer}>
          <View style={styles.totalItem}>
            <MaterialCommunityIcons name="cube-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.totalValue}>{totalCBM?.toFixed(2) || '0.00'}</Text>
            <Text style={styles.totalLabel}>CBM</Text>
          </View>
          <View style={styles.totalItem}>
            <MaterialCommunityIcons name="weight-kilogram" size={20} color={theme.colors.primary} />
            <Text style={styles.totalValue}>{totalWeight?.toFixed(0) || '0'}</Text>
            <Text style={styles.totalLabel}>kg</Text>
          </View>
          <View style={styles.totalItem}>
            <MaterialCommunityIcons name="package-variant" size={20} color={theme.colors.primary} />
            <Text style={styles.totalValue}>{totalPackages || '0'}</Text>
            <Text style={styles.totalLabel}>Colis</Text>
          </View>
        </View>

        <View style={styles.datesContainer}>
          <View style={styles.dateItem}>
            <MaterialCommunityIcons name="calendar-export" size={16} color={colors.text.secondary} />
            <Text style={styles.dateLabel}>Départ:</Text>
            <Text style={styles.dateValue}>{formatDate(departureDate)}</Text>
          </View>
          <View style={styles.dateItem}>
            <MaterialCommunityIcons name="calendar-import" size={16} color={colors.text.secondary} />
            <Text style={styles.dateLabel}>Arrivée:</Text>
            <Text style={styles.dateValue}>{formatDate(arrivalDate)}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PackingListSummary;
