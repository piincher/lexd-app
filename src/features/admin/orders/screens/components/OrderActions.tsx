import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './OrderActions.styles';

interface OrderActionsProps {
  order?: any;
  onUpdateStatus?: () => void;
  isUpdating?: boolean;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  onUpdateStatus,
  isUpdating,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.primaryActions}>
        <Button
          mode="contained"
          onPress={onUpdateStatus}
          icon="pencil"
          style={styles.updateButton}
          buttonColor={colors.primary.main}
          labelStyle={styles.buttonLabel}
          disabled={isUpdating}
        >
          Modifier la commande
        </Button>
      </View>
    </View>
  );
};

export default OrderActions;
