import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { HowItWorksStep } from './HowItWorksStep';
import { HOW_IT_WORKS } from '../data';

export const HowItWorksSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comment Ça Marche ?</Text>
      <View style={styles.stepsContainer}>
        {HOW_IT_WORKS.map((step, index) => (
          <HowItWorksStep key={step.step} step={step} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  stepsContainer: {
    marginTop: 8,
  },
});
