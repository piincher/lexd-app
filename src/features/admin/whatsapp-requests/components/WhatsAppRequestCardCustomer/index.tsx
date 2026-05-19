import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WhatsAppRequestCardCustomerProps {
  customerId?: { firstName?: string; lastName?: string } | null;
  customerPhone: string;
  onCall: (phoneNumber: string) => void;
}

export const WhatsAppRequestCardCustomer: React.FC<WhatsAppRequestCardCustomerProps> = ({
  customerId,
  customerPhone,
  onCall,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const customerName = customerId
    ? `${customerId.firstName || ''} ${customerId.lastName || ''}`.trim()
    : 'Client inconnu';

  return (
    <View style={styles.customerSection}>
      <View style={styles.customerIcon}>
        <Ionicons name="person-circle" size={40} color={colors.primary[500]} />
      </View>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{customerName}</Text>
        <TouchableOpacity onPress={() => onCall(customerPhone)} style={styles.phoneContainer}>
          <Ionicons name="call" size={14} color={colors.primary[600]} />
          <Text style={styles.customerPhone}>{customerPhone}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  customerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerIcon: {
    marginRight: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: colors.primary[600],
    marginLeft: 4,
  },
});
