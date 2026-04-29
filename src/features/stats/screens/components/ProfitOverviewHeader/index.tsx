import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  overallMargin?: number;
  isLoading: boolean;
  isProfit: boolean;
  profitColor: string;
}

export const ProfitOverviewHeader: React.FC<Props> = ({
  overallMargin,
  isLoading,
  isProfit,
  profitColor,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.header}>
      <View style={[styles.iconBox, { backgroundColor: colors.feedback.successBg }]}>
        <Ionicons name="trending-up" size={18} color={colors.status.success} />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Rentabilité Globale CBM
      </Text>
      {!isLoading && overallMargin !== undefined && (
        <View
          style={[
            styles.marginBadge,
            { backgroundColor: isProfit ? colors.feedback.successBg : colors.feedback.errorBg },
          ]}
        >
          <Text style={[styles.marginText, { color: profitColor }]}>
            {isProfit ? '+' : ''}{overallMargin.toFixed(1)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  marginBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  marginText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
});
