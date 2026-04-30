import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { formatDate } from './DateRangePicker.utils';

interface DateRangeSummaryProps {
  startDate: Date;
  endDate: Date;
  styles: any;
}

export const DateRangeSummary: React.FC<DateRangeSummaryProps> = ({
  startDate,
  endDate,
  styles,
}) => (
  <View style={styles.summaryContainer}>
    <Text style={styles.summaryLabel}>Période sélectionnée:</Text>
    <Text style={styles.summaryValue}>
      {formatDate(startDate)} - {formatDate(endDate)}
    </Text>
  </View>
);
