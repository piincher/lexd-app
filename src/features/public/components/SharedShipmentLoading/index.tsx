import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface SharedShipmentLoadingProps {
  color: string;
}

export const SharedShipmentLoading: React.FC<SharedShipmentLoadingProps> = ({ color }) => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});
