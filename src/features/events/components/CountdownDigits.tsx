import React from 'react';
import { View, Text } from 'react-native';
import type { Countdown } from '../hooks/useCountdown';
import { getCountdownStyles } from './EventCountdownBanner.styles';

interface CountdownDigitsProps {
  countdown: Countdown;
  tint: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

const UNITS = [
  { key: 'days', label: 'Jours' },
  { key: 'hours', label: 'Heures' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
] as const;

/** Four digit boxes (Jours / Heures / Min / Sec) for the countdown. */
export const CountdownDigits: React.FC<CountdownDigitsProps> = ({ countdown, tint }) => {
  const styles = getCountdownStyles(tint);
  return (
    <View style={styles.row}>
      {UNITS.map((unit) => (
        <View key={unit.key} style={styles.cell}>
          <Text style={styles.value}>{pad(countdown[unit.key])}</Text>
          <Text style={styles.label}>{unit.label}</Text>
        </View>
      ))}
    </View>
  );
};
