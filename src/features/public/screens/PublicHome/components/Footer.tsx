import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        © 2024 ChinaLink Express. Tous droits réservés.
      </Text>
      <Text style={styles.contact}>
        contact@chinalinkexpress.com | +223 XX XX XX XX
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contact: {
    fontSize: 12,
    color: '#999',
  },
});
