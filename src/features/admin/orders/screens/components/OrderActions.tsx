import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { styles } from './OrderActions.styles';

interface OrderActionsProps {
  order: any;
  onUpdateStatus: () => void;
  onMarkDelivered: () => void;
  isUpdating: boolean;
}

export const OrderActions: React.FC<OrderActionsProps> = ({ 
  order, 
  onUpdateStatus, 
  onMarkDelivered,
  isUpdating 
}) => {
  const navigation = useNavigation();
  const isDelivered = order?.status === 'Delivered' || order?.status === 'Inactive';

  const handleViewWithGoods = () => {
    navigation.navigate('OrderDetailWithGoods' as never, { orderId: order?._id } as never);
  };

  return (
    <View style={styles.container}>
      {/* Primary Actions */}
      <View style={styles.primaryActions}>
        {!isDelivered && (
          <Button
            mode="contained"
            onPress={onUpdateStatus}
            loading={isUpdating}
            disabled={isUpdating}
            style={styles.updateButton}
            buttonColor={COLORS.blue}
            icon="update"
            labelStyle={styles.buttonLabel}
          >
            Update Status
          </Button>
        )}
        
        {!isDelivered && (
          <Button
            mode="contained"
            onPress={onMarkDelivered}
            loading={isUpdating}
            disabled={isUpdating}
            style={styles.deliverButton}
            buttonColor="#4CAF50"
            icon="check-circle"
            labelStyle={styles.buttonLabel}
          >
            Mark as Delivered
          </Button>
        )}

        {isDelivered && (
          <Button
            mode="contained"
            disabled
            style={[styles.updateButton, { backgroundColor: '#E0E0E0' }]}
            labelStyle={[styles.buttonLabel, { color: '#999' }]}
          >
            Order Completed
          </Button>
        )}
      </View>

      {/* Secondary Actions */}
      <View style={styles.secondaryActions}>
        <Button
          mode="outlined"
          onPress={handleViewWithGoods}
          style={styles.secondaryButton}
          textColor={COLORS.blue}
          icon="package-variant"
          labelStyle={styles.buttonLabel}
        >
          View with Goods
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => {}}
          style={styles.secondaryButton}
          textColor={COLORS.grey}
          icon="file-document"
          labelStyle={styles.buttonLabel}
        >
          Generate Invoice
        </Button>
      </View>
    </View>
  );
};

export default OrderActions;
