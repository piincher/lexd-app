import React, { useMemo } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { QuietHours } from '../hooks/useNotificationSettings';

interface QuietHoursCardProps {
  quietHours: QuietHours;
  onToggle: (value: boolean) => void;
  onEditPress: () => void;
}

export const QuietHoursCard: React.FC<QuietHoursCardProps> = ({
  quietHours,
  onToggle,
  onEditPress,
}) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginBottom: 16,
          borderRadius: 12,
          elevation: 2,
          backgroundColor: colors.background.default,
        },
        sectionTitle: {
          fontSize: 14,
          fontWeight: '600',
          color: colors.text.secondary,
          textTransform: 'uppercase',
          marginBottom: 8,
          marginLeft: 4,
        },
        quietHoursHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        quietHoursLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        },
        iconContainer: {
          width: 48,
          height: 48,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        },
        quietHoursTitle: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.text.primary,
        },
        quietHoursSubtitle: {
          fontSize: 14,
          color: colors.text.secondary,
          marginTop: 2,
        },
        quietHoursDetails: {
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        quietHoursDescription: {
          fontSize: 14,
          color: colors.text.secondary,
          marginBottom: 12,
          lineHeight: 20,
        },
        editTimeButton: {
          borderColor: colors.primary.main,
        },
      }),
    [colors]
  );

  return (
    <>
      <Text style={styles.sectionTitle}>Heures silencieuses</Text>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.quietHoursHeader}>
            <View style={styles.quietHoursLeft}>
              <View style={[styles.iconContainer, { backgroundColor: isDark ? hexToRgba(colors.status.info, 0.15) : hexToRgba(colors.status.info, 0.1) }]}>
                <Ionicons name="moon" size={24} color={colors.status.info} />
              </View>
              <View>
                <Text style={styles.quietHoursTitle}>Heures silencieuses</Text>
                <Text style={styles.quietHoursSubtitle}>
                  {quietHours.enabled
                    ? `${quietHours.startTime} - ${quietHours.endTime}`
                    : 'Desactivees'}
                </Text>
              </View>
            </View>
            <Switch
              value={quietHours.enabled}
              onValueChange={onToggle}
              trackColor={{ false: colors.neutral[200], true: colors.primary.main + '50' }}
              thumbColor={quietHours.enabled ? colors.primary.main : colors.background.default}
            />
          </View>

          {quietHours.enabled && (
            <View style={styles.quietHoursDetails}>
              <Text style={styles.quietHoursDescription}>
                Les notifications seront silencieuses pendant ces heures. Les
                alertes urgentes peuvent toutefois etre recues.
              </Text>
              <Button
                mode="outlined"
                onPress={onEditPress}
                style={styles.editTimeButton}
              >
                Modifier les horaires
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    </>
  );
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};
