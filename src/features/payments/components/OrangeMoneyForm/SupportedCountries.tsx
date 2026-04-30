import React from 'react';
import { View, Text } from 'react-native';
import { useOrangeMoneyFormStyles } from './OrangeMoneyForm.styles';

const COUNTRIES = [
  { code: 'ML', name: 'Mali' },
  { code: 'SN', name: 'Senegal' },
  { code: 'CI', name: 'Ivory Coast' },
];

export const SupportedCountries: React.FC = () => {
  const styles = useOrangeMoneyFormStyles();

  return (
    <View style={styles.supportedContainer}>
      <Text style={styles.supportedTitle}>Supported Countries</Text>
      <View style={styles.countryTags}>
        {COUNTRIES.map((country) => (
          <View key={country.code} style={styles.countryTag}>
            <Text style={styles.countryTagCode}>{country.code}</Text>
            <Text style={styles.countryTagName}>{country.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
