import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { styles } from './OrderActions.styles';

interface OrderActionsProps {
  order?: any;
  onUpdateStatus?: () => void;
  onMarkDelivered?: () => void;
  isUpdating?: boolean;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  onUpdateStatus,
  onMarkDelivered,
  isUpdating,
}) => {
  const isDelivered = order?.status === 'Delivered';

  return (
    <View style={styles.container}>
      <View style={styles.primaryActions}>
        <Button
          mode="contained"
          onPress={onUpdateStatus}
          icon="pencil"
          style={styles.updateButton}
          buttonColor={COLORS.blue}
          labelStyle={styles.buttonLabel}
          disabled={isUpdating}
        >
          Modifier la commande
        </Button>

        {!isDelivered && (
          <Button
            mode="contained"
            onPress={onMarkDelivered}
            icon="package-check"
            style={styles.deliverButton}
            buttonColor="#4CAF50"
            labelStyle={styles.buttonLabel}
            loading={isUpdating}
            disabled={isUpdating}
          >
            Marquer comme livré
          </Button>
        )}
      </View>
    </View>
  );
};

export default OrderActions;
