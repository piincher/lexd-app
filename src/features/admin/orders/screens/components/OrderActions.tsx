import React from 'react';
import { View } from 'react-native';
import { styles } from './OrderActions.styles';

interface OrderActionsProps {
  order?: any;
  onUpdateStatus?: () => void;
  onMarkDelivered?: () => void;
  isUpdating?: boolean;
}

export const OrderActions: React.FC<OrderActionsProps> = () => {
  // All action buttons removed as requested
  return <View style={styles.container} />;
};

export default OrderActions;
