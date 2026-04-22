/**
 * AirwayBillCard - Modern card component for airway bill list
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { AirwayBill, AirwayBillStatus } from '../../types';

interface AirwayBillCardProps {
  item: AirwayBill;
  onPress: (id: string) => void;
}

const STATUS_CONFIG: Record<
  AirwayBillStatus,
  { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom'; color: string }
> = {
  CREATED: { label: 'Créé', variant: 'custom', color: '#6B7280' },
  PACKING: { label: 'Préparation', variant: 'custom', color: '#3B82F6' },
  READY_FOR_DEPARTURE: { label: 'Prêt au départ', variant: 'custom', color: '#D4AF37' },
  IN_TRANSIT: { label: 'En transit', variant: 'info', color: '#3B82F6' },
  ARRIVED: { label: 'Arrivé', variant: 'success', color: '#16A34A' },
  READY_FOR_PICKUP: { label: 'Prêt', variant: 'custom', color: '#4ECDC4' },
  DELIVERED: { label: 'Livré', variant: 'custom', color: '#9CA3AF' },
};

const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const AirwayBillCard: React.FC<AirwayBillCardProps> = ({ item, onPress }) => {
  const { colors } = useAppTheme();
  const statusConfig = STATUS_CONFIG[item.status];
  const departureDate = formatDate(item.departureDate);
  const flightLabel = [item.airline, item.flightNumber].filter(Boolean).join(' · ') || 'Vol à confirmer';
  const departureAirport = item.departureAirport || '---';
  const arrivalAirport = item.arrivalAirport || '---';

  const capacityPercentage = item.capacityWeight > 0 ? (item.totalWeight / item.capacityWeight) * 100 : 0;
  const capacityColor =
    capacityPercentage > 100
      ? colors.status.error
      : capacityPercentage >= 80
        ? colors.status.warning
        : colors.status.success;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item._id)}
      style={[
        styles.container,
        {
          backgroundColor: colors.background.card,
          borderLeftColor: statusConfig.color,
          shadowColor: colors.neutral[900],
        },
      ]}
      accessibilityLabel={`Lettre de transport ${item.awbNumber}, statut ${statusConfig.label}`}
    >
      {/* Top Row: AWB Number + Status */}
      <View style={styles.headerRow}>
        <View style={styles.awbContainer}>
          <MaterialCommunityIcons name="file-document-outline" size={18} color={colors.primary.main} />
          <Text style={[styles.awbNumber, { color: colors.text.primary }]}>
            {item.awbNumber}
          </Text>
        </View>
        <Badge
          label={statusConfig.label}
          variant={statusConfig.variant}
          backgroundColor={`${statusConfig.color}18`}
          textColor={statusConfig.color}
        />
      </View>

      {/* Flight & Airline */}
      <View style={styles.flightRow}>
        <Ionicons name="airplane" size={14} color={colors.text.secondary} />
        <Text style={[styles.flightText, { color: colors.text.secondary }]}>
          {flightLabel}
        </Text>
      </View>

      {/* Route Visualization */}
      <View style={styles.routeContainer}>
        <View style={styles.airportBlock}>
          <Text style={[styles.airportCode, { color: colors.text.primary }]}>
            {departureAirport}
          </Text>
          <Text style={[styles.airportLabel, { color: colors.text.secondary }]}>Départ</Text>
        </View>

        <View style={styles.routeLine}>
          <View style={[styles.dashedLine, { borderBottomColor: colors.border }]} />
          <View style={[styles.planeIconContainer, { backgroundColor: colors.background.default }]}>
            <Ionicons name="airplane" size={14} color={colors.primary.main} style={styles.planeIcon} />
          </View>
        </View>

        <View style={[styles.airportBlock, styles.airportBlockRight]}>
          <Text style={[styles.airportCode, { color: colors.text.primary }]}>
            {arrivalAirport}
          </Text>
          <Text style={[styles.airportLabel, { color: colors.text.secondary }]}>Arrivée</Text>
        </View>
      </View>

      {/* Footer: Stats + Date */}
      <View style={styles.footerRow}>
        <View style={styles.statPills}>
          <View style={[styles.statPill, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="package-variant" size={13} color={colors.primary.main} />
            <Text style={[styles.statPillText, { color: colors.text.secondary }]}>
              {item.totalPackages} colis
            </Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="weight-kilogram" size={13} color={colors.primary.main} />
            <Text style={[styles.statPillText, { color: colors.text.secondary }]}>
              {item.totalWeight.toFixed(1)} kg
            </Text>
          </View>
        </View>
        {departureDate && (
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={12} color={colors.text.muted} />
            <Text style={[styles.dateText, { color: colors.text.muted }]}>{departureDate}</Text>
          </View>
        )}
      </View>

      {/* Capacity Indicator */}
      {item.capacityWeight > 0 && (
        <View style={styles.capacityContainer}>
          <View style={[styles.capacityTrack, { backgroundColor: colors.neutral[200] }]}>
            <View
              style={[
                styles.capacityBar,
                {
                  width: `${Math.min(capacityPercentage, 100)}%`,
                  backgroundColor: capacityColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.capacityText, { color: colors.text.muted }]}>
            {item.totalWeight.toFixed(1)} / {item.capacityWeight} kg
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  awbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  awbNumber: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  flightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  flightText: {
    fontSize: 13,
    fontWeight: '500',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  airportBlock: {
    alignItems: 'flex-start',
    minWidth: 60,
  },
  airportBlockRight: {
    alignItems: 'flex-end',
  },
  airportCode: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  airportLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    height: 20,
  },
  dashedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  planeIconContainer: {
    position: 'absolute',
    left: '50%',
    marginLeft: -14,
    paddingHorizontal: 4,
  },
  planeIcon: {
    transform: [{ rotate: '90deg' }],
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    paddingTop: 12,
    marginTop: 2,
  },
  statPills: {
    flexDirection: 'row',
    gap: 8,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  capacityContainer: {
    marginTop: 10,
    gap: 4,
  },
  capacityTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  capacityBar: {
    height: '100%',
    borderRadius: 2,
  },
  capacityText: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default AirwayBillCard;
