import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { CheckRouteCard } from '../CheckRouteCard';

interface CheckRouteErrorProps {
  message: string;
}

export const CheckRouteError: React.FC<CheckRouteErrorProps> = ({ message }) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeInUp.duration(200)}>
      <CheckRouteCard
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 14,
          borderRadius: 12,
          backgroundColor: `${colors.status.error}15`,
          gap: 10,
        }}
      >
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={22}
          color={colors.status.error}
        />
        <View style={styles.flex}>
          <Text style={[styles.errorTitle, { color: colors.status.error }]}>Code introuvable</Text>
          <Text style={[styles.errorText, { color: colors.text.secondary }]}>{message}</Text>
        </View>
      </CheckRouteCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  errorTitle: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  errorText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
});
