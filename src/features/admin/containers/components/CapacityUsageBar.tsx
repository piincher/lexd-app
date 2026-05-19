/**
 * CapacityUsageBar - Visual capacity indicator component
 */

import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CapacityUsageBarHeader } from './CapacityUsageBarHeader';
import { CapacityUsageBarProgress } from './CapacityUsageBarProgress';
import { CapacityUsageBarFooter } from './CapacityUsageBarFooter';
import { createStyles } from './CapacityUsageBar.styles';

interface CapacityUsageBarProps {
  used: number;
  max: number;
  unit?: string;
  showPercentage?: boolean;
  showLabels?: boolean;
  height?: number;
  variant?: 'cbm' | 'weight' | 'items';
}

const MAX_CBM = 67; // Standard 40ft container

const getFillColor = (pct: number, colors: any): [string, string] => {
  if (pct >= 90) return [colors.status.error, colors.status.error];
  if (pct >= 70) return [colors.status.warning, colors.status.warning];
  return [colors.status.success, colors.status.success];
};

export const CapacityUsageBar: React.FC<CapacityUsageBarProps> = ({
  used,
  max = MAX_CBM,
  unit = 'm³',
  showPercentage = true,
  showLabels = true,
  height = 24,
  variant = 'cbm',
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const percentage = Math.min((used / max) * 100, 100);
  const remaining = Math.max(max - used, 0);
  const fillColors = getFillColor(percentage, colors);

  return (
    <View style={styles.container}>
      {showLabels && (
        <CapacityUsageBarHeader
          variant={variant}
          used={used}
          max={max}
          unit={unit}
          fillColor={fillColors[0]}
        />
      )}

      <CapacityUsageBarProgress
        percentage={percentage}
        fillColors={fillColors}
        height={height}
        showPercentage={showPercentage}
      />

      {showLabels && (
        <CapacityUsageBarFooter
          remaining={remaining}
          unit={unit}
          percentage={percentage}
          fillColor={fillColors[0]}
        />
      )}
    </View>
  );
};

export default CapacityUsageBar;
