import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useRenderOrderStyles } from './RenderOrder.styles';
import { productType } from '@src/api/order';

interface OrderHeaderProps {
  item: productType;
  orderStatus: string | undefined;
  formattedLastUpdate: string;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ item, orderStatus, formattedLastUpdate }) => {
  const { colors } = useAppTheme();
  const styles = useRenderOrderStyles();

  return (
    <View style={styles.headerCard}>
      <View style={styles.headerContent}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Suivi de la commande</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressStep}>
              <MaterialIcons name="check" size={20} color={colors.status.success} />
              <Text style={styles.progressText}>Commande passée</Text>
            </View>
            <View style={styles.progressStep}>
              <MaterialIcons
                name={orderStatus === 'In Transit' || orderStatus === 'Delivered' ? 'check' : 'circle'}
                size={20}
                color={
                  orderStatus === 'In Transit' || orderStatus === 'Delivered'
                    ? colors.status.success
                    : colors.text.secondary
                }
              />
              <Text style={styles.progressText}>En transit</Text>
            </View>
            <View style={styles.progressStep}>
              <MaterialIcons
                name={orderStatus === 'Delivered' ? 'check' : 'circle'}
                size={20}
                color={orderStatus === 'Delivered' ? colors.status.success : colors.text.secondary}
              />
              <Text style={styles.progressText}>Livré</Text>
            </View>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              item.paymentStatus === 'Paid' ? styles.paid : styles.unpaid,
            ]}
          >
            {item.paymentStatus === 'Paid' ? (
              <MaterialIcons name="check-circle" size={16} color={colors.text.inverse} />
            ) : (
              <MaterialIcons name="warning" size={16} color={colors.text.inverse} />
            )}
            <Text style={styles.statusText}>
              {item.paymentStatus === 'Paid' ? 'Payé' : 'Non payé'}
            </Text>
          </View>
          <Text style={styles.orderId}>Commande #{item.code}</Text>
        </View>
        <Text style={styles.dateText}>Dernière mise à jour: {formattedLastUpdate}</Text>
      </View>
    </View>
  );
};
