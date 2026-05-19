import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';

interface OrderCardProgressProps {
  status: string;
  statusColor: string;
}

export const OrderCardProgress: React.FC<OrderCardProgressProps> = ({ status, statusColor }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.progressSection}>
      <View style={styles.progressTrack}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: status === 'In Transit' ? '70%' : '30%',
              backgroundColor: statusColor 
            }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        {status === 'In Transit' ? 'In Transit to Destination' : 'Processing at Warehouse'}
      </Text>
    </View>
  );
};
