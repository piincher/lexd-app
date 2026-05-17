import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './StatusUpdateModal.styles';

export const ModalHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Ionicons name="swap-horizontal" size={28} color={Theme.status.info} />
      <Text style={styles.title}>Mettre à jour le statut</Text>
    </View>
  );
};
