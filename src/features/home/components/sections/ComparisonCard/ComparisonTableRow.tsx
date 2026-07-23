import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ComparisonCard.styles';
import { ComparisonFeature } from '../../../constants/homeData';
import { ComparisonStatusIcon } from '../ComparisonStatusIcon';

interface ComparisonTableRowProps {
  feature: ComparisonFeature;
  index: number;
}

export const ComparisonTableRow: React.FC<ComparisonTableRowProps> = ({ feature, index }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View
      style={[
        styles.featureRow,
        index % 2 === 0 && {
          backgroundColor: isDark ? `${colors.primary.light}0A` : `${colors.primary.main}06`,
        },
      ]}
    >
      <View style={styles.featureCol}>
        <View style={styles.featureLabelRow}>
          <View style={[styles.featureIconCircle, { backgroundColor: `${feature.color}14` }]}>
            <FontAwesome6 name={feature.icon as any} size={10} color={feature.color} />
          </View>
          <Text style={[styles.featureLabel, { color: colors.text.primary }]} numberOfLines={1}>
            {feature.label}
          </Text>
        </View>
      </View>
      <View style={styles.brandCol}>
        <ComparisonStatusIcon status={feature.lexd} />
      </View>
      <View style={styles.brandCol}>
        <ComparisonStatusIcon status={feature.others} />
      </View>
    </View>
  );
};
