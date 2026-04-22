import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import {
  SharedShipmentGoods,
  SharedShipmentContainer,
  SharedShipmentOrder,
} from '../../../api/shareApi';

interface Props {
  type: 'goods' | 'container' | 'order';
  data: SharedShipmentGoods | SharedShipmentContainer | SharedShipmentOrder;
  estimatedDelivery?: string;
}

export const SharedShipmentDetails: React.FC<Props> = ({ type, data, estimatedDelivery }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    card: {
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.xl,
      marginTop: Theme.spacing.lg,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      marginBottom: Theme.spacing.md,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowLabel: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
    },
    rowValue: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.primary,
    },
    estimatedRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: `${colors.primary.main}10`,
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
      marginTop: Theme.spacing.md,
    },
    estimatedText: {
      marginLeft: Theme.spacing.md,
    },
    estimatedLabel: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    estimatedValue: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.primary.main,
    },
  }), [colors]);

  const DetailRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
    if (!value) return null;
    return (
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    );
  };

  const GoodsDetails = () => (
    <>
      <DetailRow label="Description" value={(data as SharedShipmentGoods).description} />
      <DetailRow label="Catégorie" value={(data as SharedShipmentGoods).category} />
      <DetailRow label="Poids" value={(data as SharedShipmentGoods).weightKg ? `${(data as SharedShipmentGoods).weightKg} kg` : undefined} />
      <DetailRow label="Volume" value={(data as SharedShipmentGoods).cbm ? `${(data as SharedShipmentGoods).cbm} CBM` : undefined} />
      <DetailRow label="Quantité" value={(data as SharedShipmentGoods).quantity?.toString()} />
      <DetailRow label="Mode d'expédition" value={(data as SharedShipmentGoods).shippingMode} />
      {(data as SharedShipmentGoods).container?.virtualContainerNumber && (
        <DetailRow label="Container" value={(data as SharedShipmentGoods).container?.virtualContainerNumber} />
      )}
      {(data as SharedShipmentGoods).airwayBill?.awbNumber && (
        <DetailRow label="AWB" value={(data as SharedShipmentGoods).airwayBill?.awbNumber} />
      )}
    </>
  );

  const ContainerDetails = () => (
    <>
      <DetailRow label="Numéro Container" value={(data as SharedShipmentContainer).containerNumber} />
      <DetailRow label="Compagnie" value={(data as SharedShipmentContainer).shippingLine} />
      <DetailRow label="Mode d'expédition" value={(data as SharedShipmentContainer).shippingMode} />
      <DetailRow label="Origine" value={(data as SharedShipmentContainer).origin} />
      <DetailRow label="Destination" value={(data as SharedShipmentContainer).destination} />
      <DetailRow label="Marchandises" value={`${(data as SharedShipmentContainer).goodsCount} article(s)`} />
    </>
  );

  const OrderDetails = () => (
    <>
      <DetailRow label="Commande" value={(data as SharedShipmentOrder).orderId} />
      <DetailRow label="Mode d'expédition" value={(data as SharedShipmentOrder).shippingMode} />
      <DetailRow label="Destination" value={(data as SharedShipmentOrder).destinationCountry} />
      <DetailRow label="Ligne" value={(data as SharedShipmentOrder).shipmentLine} />
      <DetailRow label="Poids" value={(data as SharedShipmentOrder).packageWeight} />
      <DetailRow label="Quantité" value={(data as SharedShipmentOrder).quantity} />
      <DetailRow label="Marchandises" value={`${(data as SharedShipmentOrder).goodsCount} article(s)`} />
    </>
  );

  return (
    <Surface style={styles.card}>
      <Text style={styles.title}>Détails</Text>

      {type === 'goods' && <GoodsDetails />}
      {type === 'container' && <ContainerDetails />}
      {type === 'order' && <OrderDetails />}

      {estimatedDelivery && (
        <View style={styles.estimatedRow}>
          <MaterialCommunityIcons name="calendar-clock" size={20} color={colors.primary.main} />
          <View style={styles.estimatedText}>
            <Text style={styles.estimatedLabel}>Livraison Estimée</Text>
            <Text style={styles.estimatedValue}>
              {new Date(estimatedDelivery).toLocaleDateString('fr-FR', {
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
