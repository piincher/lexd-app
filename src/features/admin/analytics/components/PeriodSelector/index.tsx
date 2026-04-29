import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './PeriodSelector.styles';

type Period = '7d' | '30d' | '90d' | '1y';

interface PeriodSelectorProps {
  selected: Period;
  onSelect: (period: Period) => void;
}

const PERIODS: Array<{ key: Period; label: string }> = [
  { key: '7d', label: '7 jours' },
  { key: '30d', label: '30 jours' },
  { key: '90d', label: '3 mois' },
  { key: '1y', label: '1 an' },
];

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {PERIODS.map((period) => (
        <TouchableOpacity
          key={period.key}
          style={[
            styles.button,
            selected === period.key && styles.buttonActive,
          ]}
          onPress={() => onSelect(period.key)}
        >
          <Text
            style={[
              styles.buttonText,
              selected === period.key && styles.buttonTextActive,
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
