import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './OutstandingPaymentsEmpty.styles';

export const OutstandingPaymentsEmpty: React.FC = () => {
  return (
    <View style={styles.empty}>
      <Ionicons name="checkmark-circle" size={64} color="#10B981" />
      <Text style={styles.emptyText}>Aucun impayé trouvé</Text>
    </View>
  );
};
