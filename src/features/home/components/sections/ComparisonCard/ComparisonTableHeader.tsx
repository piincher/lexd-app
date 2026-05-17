import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ComparisonCard.styles';

export const ComparisonTableHeader: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.headerRow}>
      <View style={styles.featureCol}>
        <Text style={[styles.headerLabel, { color: colors.text.secondary }]}>Criteres</Text>
      </View>
      <View style={styles.brandCol}>
        <LinearGradient
          colors={[colors.status.success, colors.primary.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.brandBadge}
        >
          <FontAwesome6 name="star" size={8} color={colors.neutral.white} />
          <Text style={styles.brandBadgeText}>ChinaLink</Text>
        </LinearGradient>
      </View>
      <View style={styles.brandCol}>
        <View
          style={[
            styles.othersBadge,
            { backgroundColor: isDark ? `${colors.text.secondary}1E` : colors.background.paper },
          ]}
        >
          <Text style={[styles.othersBadgeText, { color: colors.text.secondary }]}>Autres</Text>
        </View>
      </View>
    </View>
  );
};
