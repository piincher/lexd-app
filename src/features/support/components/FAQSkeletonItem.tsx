import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './FAQSkeletonItem.styles';

export const FAQSkeletonItem: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: isDark ? colors.background.paper : colors.neutral[100],
        },
      ]}
    >
      <View style={styles.row}>
        <View
          style={[
            styles.indicator,
            { backgroundColor: isDark ? colors.border : colors.neutral[200] },
          ]}
        />
        <View style={styles.content}>
          <View
            style={[
              styles.line,
              { backgroundColor: isDark ? colors.border : colors.neutral[200] },
            ]}
          />
          <View
            style={[
              styles.lineShort,
              { backgroundColor: isDark ? colors.border : colors.neutral[200] },
            ]}
          />
        </View>
      </View>
    </View>
  );
};
