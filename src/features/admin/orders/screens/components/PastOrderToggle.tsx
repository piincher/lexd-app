import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from './PastOrderToggle.styles';

interface PastOrderToggleProps {
  shippingType: 'air' | 'sea';
  onChange: (type: 'air' | 'sea') => void;
}

export const PastOrderToggle: React.FC<PastOrderToggleProps> = ({ shippingType, onChange }) => {
  const styles = createStyles();

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, shippingType === 'air' && styles.activeToggle]}
        onPress={() => onChange('air')}
      >
        <Text style={[styles.toggleText, shippingType === 'air' && styles.activeToggleText]}>
          Air
        </Text>
      </TouchableOpacity>
      <View style={styles.toggleSeparator} />
      <TouchableOpacity
        style={[styles.toggleButton, shippingType === 'sea' && styles.activeToggle]}
        onPress={() => onChange('sea')}
      >
        <Text style={[styles.toggleText, shippingType === 'sea' && styles.activeToggleText]}>
          sea
        </Text>
      </TouchableOpacity>
    </View>
  );
};
