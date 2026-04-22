import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TrackingData {
  type: 'goods' | 'container';
  data?: {
    description?: string;
    category?: string;
    weightKg?: number;
    cbm?: number;
    quantity?: number;
    containerNumber?: string;
    shippingLine?: string;
    destination?: string;
  };
  estimatedDelivery?: string;
}

interface TrackingDetailsCardProps {
  data: TrackingData;
}

export const TrackingDetailsCard: React.FC<TrackingDetailsCardProps> = ({ data }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    detailsCard: {
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.xl,
      marginHorizontal: Theme.spacing.lg,
      marginBottom: Theme.spacing.lg,
    },
    sectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      marginBottom: Theme.spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    detailLabel: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
    },
    detailValue: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.primary,
    },
    estimatedDelivery: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: `${colors.primary.main}10`,
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
      marginTop: Theme.spacing.md,
    },
    estimatedDeliveryText: {
      marginLeft: Theme.spacing.md,
    },
    estimatedDeliveryLabel: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    estimatedDeliveryValue: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.primary.main,
    },
  }), [colors, isDark]);

  const DetailRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
    if (!value) return null;
    
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    );
  };

  return (
    <Surface style={styles.detailsCard}>
      <Text style={styles.sectionTitle}>Détails</Text>
      
      {data.type === 'goods' && (
        <>
          <DetailRow label="Description" value={data.data?.description} />
          <DetailRow label="Catégorie" value={data.data?.category} />
          <DetailRow label="Poids" value={data.data?.weightKg ? `${data.data.weightKg} kg` : undefined} />
          <DetailRow label="Volume" value={data.data?.cbm ? `${data.data.cbm} CBM` : undefined} />
          <DetailRow label="Quantité" value={data.data?.quantity?.toString()} />
        </>
      )}

      {data.type === 'container' && (
        <>
          <DetailRow label="Numéro Container" value={data.data?.containerNumber} />
          <DetailRow label="Compagnie" value={data.data?.shippingLine} />
          <DetailRow label="Destination" value={data.data?.destination} />
        </>
      )}

      {data.estimatedDelivery && (
        <View style={styles.estimatedDelivery}>
          <MaterialCommunityIcons name="calendar-clock" size={20} color={colors.primary.main} />
          <View style={styles.estimatedDeliveryText}>
            <Text style={styles.estimatedDeliveryLabel}>Livraison Estimée</Text>
            <Text style={styles.estimatedDeliveryValue}>
              {new Date(data.estimatedDelivery).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      )}
    </Surface>
  );
};
