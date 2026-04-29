import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './OutstandingPaymentsListHeader.styles';

interface OutstandingPaymentsListHeaderProps {
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const OutstandingPaymentsListHeader: React.FC<OutstandingPaymentsListHeaderProps> = ({
  onBack,
  rightElement,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={Theme.colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Impayés</Text>
      {rightElement || <View style={styles.placeholder} />}
    </View>
  );
};
