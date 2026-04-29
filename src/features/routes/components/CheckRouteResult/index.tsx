import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { CheckRouteCard } from '../CheckRouteCard';
import { TrackingTimeline } from '../TrackingTimeline';

interface CheckRouteResultProps {
  code: string;
  updatedAt?: string;
  route: string[];
  currentStep: number;
}

const formatUpdatedAt = (iso?: string): string | null => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const CheckRouteResult: React.FC<CheckRouteResultProps> = ({
  code,
  updatedAt,
  route,
  currentStep,
}) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeInUp.duration(240)}>
      <CheckRouteCard>
        <View style={styles.resultHeader}>
          <MaterialCommunityIcons
            name="package-variant-closed-check"
            size={22}
            color={colors.primary.main}
            style={styles.icon}
          />
          <View style={styles.flex}>
            <Text style={[styles.resultCode, { color: colors.text.primary }]}>
              {code.trim().toUpperCase()}
            </Text>
            {formatUpdatedAt(updatedAt) ? (
              <Text style={[styles.resultMeta, { color: colors.text.secondary }]}>
                Dernière mise à jour : {formatUpdatedAt(updatedAt)}
              </Text>
            ) : null}
          </View>
        </View>
        <TrackingTimeline steps={route} currentStep={currentStep} />
      </CheckRouteCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  flex: {
    flex: 1,
  },
  resultCode: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
  },
  resultMeta: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
});
