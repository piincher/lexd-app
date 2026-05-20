import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ProgressSectionProps {
  progressPercentage: number;
  progressColor: string;
  progressSubtext: string;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  progressPercentage,
  progressColor,
  progressSubtext,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.progressSection}>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.max(2, progressPercentage)}%`, backgroundColor: progressColor },
          ]}
        />
      </View>
      <View style={styles.progressLabels}>
        <Text style={[styles.progressText, { color: progressColor }]}>
          {progressPercentage}% restants
        </Text>
        <Text style={styles.progressSubtext}>{progressSubtext}</Text>
      </View>
    </View>
  );
};

const createStyles = (colors: any, _isDark?: boolean) => StyleSheet.create({
  progressSection: {
    marginBottom: 4,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.divider,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  progressSubtext: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
  },
});
