import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { OutstandingAgingBucket } from '../../types';

interface AgingChartProps {
  data: OutstandingAgingBucket[];
}

const COLORS = ['#10B981', '#F59E0B', '#F97316', '#EF4444', '#991B1B'];

export const AgingChart: React.FC<AgingChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.totalValueFCFA), 1);

  return (
    <View style={styles.container}>
      {data.map((bucket, index) => {
        const percentage = (bucket.totalValueFCFA / maxValue) * 100;
        const color = COLORS[Math.min(index, COLORS.length - 1)];

        return (
          <View key={bucket.range} style={styles.item}>
            <View style={styles.header}>
              <Text style={styles.range}>{bucket.range}</Text>
              <Text style={styles.count}>{bucket.count} factures</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.barBackground, { flex: 1 }]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.value, { color }]}>
                {bucket.totalValueFCFA.toLocaleString('fr-FR')} FCFA
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  item: {
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  range: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  count: {
    fontSize: 11,
    color: '#6B7280',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    fontSize: 11,
    fontWeight: '600',
    minWidth: 90,
    textAlign: 'right',
  },
});
