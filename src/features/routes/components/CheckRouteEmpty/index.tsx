import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { CheckRouteCard } from '../CheckRouteCard';

export const CheckRouteEmpty: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <CheckRouteCard style={styles.emptyCard}>
      <View
        style={[
          styles.emptyIcon,
          { backgroundColor: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)' },
        ]}
      >
        <MaterialCommunityIcons name="cube-scan" size={36} color={colors.primary.main} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>Aucun colis sélectionné</Text>
      <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
        Saisissez votre numéro de suivi ci-dessus pour commencer.
      </Text>
    </CheckRouteCard>
  );
};

const styles = StyleSheet.create({
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
