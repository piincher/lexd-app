import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { WhyChooseCard } from './WhyChooseCard';
import { WHY_CHOOSE_US } from '../data';

export const WhyChooseSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pourquoi Nous Choisir ?</Text>
      <View style={styles.grid}>
        {WHY_CHOOSE_US.map((item, index) => (
          <WhyChooseCard key={item.title} item={item} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
