import React from 'react';
import { View } from 'react-native';
import { Text, Card, Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContainerHeaderCardStyles } from './ContainerHeaderCard.styles';
import { CustomerContainer } from '../../types';
import { CUSTOMER_STATUS_LABELS, SHIPPING_LINE_LABELS } from '../../types';

interface ContainerHeaderCardProps {
  container: CustomerContainer;
  statusColor: string;
  statusBgColor: string;
  getShippingModeIcon: (mode: 'SEA' | 'AIR') => string;
}

export const ContainerHeaderCard: React.FC<ContainerHeaderCardProps> = ({
  container,
  statusColor,
  statusBgColor,
  getShippingModeIcon,
}) => {
  const theme = useTheme();
  const styles = useContainerHeaderCardStyles();

  return (
    <Card style={styles.headerCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.containerIconContainer}>
            <MaterialCommunityIcons
              name={getShippingModeIcon(container.shippingMode) as any}
              size={32}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.containerNumber}>
              {container.virtualContainerNumber}
            </Text>
            <Text style={styles.shippingLine}>
              {SHIPPING_LINE_LABELS[container.shippingLine]}
            </Text>
          </View>
          <Chip
            style={[styles.statusChip, { backgroundColor: statusBgColor }]}
            textStyle={{ color: statusColor, fontWeight: '700' }}
          >
            {CUSTOMER_STATUS_LABELS[container.status]}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};
