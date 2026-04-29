import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

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
  const customerName = customerId
    ? `${customerId.firstName || ''} ${customerId.lastName || ''}`.trim()
    : 'Client inconnu';

  return (
    <View style={styles.customerSection}>
      <View style={styles.customerIcon}>
        <Ionicons name="person-circle" size={40} color={Theme.primary[500]} />
      </View>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{customerName}</Text>
        <TouchableOpacity onPress={() => onCall(customerPhone)} style={styles.phoneContainer}>
          <Ionicons name="call" size={14} color={Theme.primary[600]} />
          <Text style={styles.customerPhone}>{customerPhone}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  customerIcon: {
    marginRight: Theme.spacing.md,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: Theme.primary[600],
    marginLeft: 4,
  },
});
