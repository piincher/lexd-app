import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../../types';
import type { NotificationType, NotificationCategory } from '../../types';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface NotificationDetailIconCardProps {
  type: NotificationType;
  category: NotificationCategory;
}

export const NotificationDetailIconCard: React.FC<NotificationDetailIconCardProps> = ({
  type,
  category,
}) => {
  const { colors } = useAppTheme();
  const typeConfig = NOTIFICATION_TYPE_CONFIG[type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[category] || NOTIFICATION_CATEGORY_CONFIG.INFO;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        iconCard: {
          margin: 16,
          padding: 24,
          borderRadius: RADIUS.card,
          alignItems: 'center',
          backgroundColor: colors.background.card,
          // Waybill: border-first, no drop shadow.
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
        iconContainer: {
          width: 80,
          height: 80,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        },
        typeLabel: {
          fontFamily: Fonts.bold,
          fontSize: 18,
          color: colors.text.primary,
          marginBottom: 8,
        },
        categoryBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: RADIUS.badge,
          gap: 4,
        },
        categoryText: {
          fontFamily: Fonts.medium,
          fontSize: 12,
        },
      }),
    [colors]
  );

  return (
    <Animated.View entering={FadeInUp.delay(100)}>
      <Surface style={styles.iconCard} elevation={0}>
        <View style={[styles.iconContainer, { backgroundColor: categoryConfig.color }]}>
          <MaterialCommunityIcons
            name={typeConfig.icon as MaterialIconName}
            size={48}
            color={colors.text.inverse}
          />
        </View>

        <Text style={styles.typeLabel}>{typeConfig.label}</Text>

        <View style={[styles.categoryBadge, { backgroundColor: categoryConfig.backgroundColor }]}>
          <MaterialCommunityIcons
            name={categoryConfig.icon as MaterialIconName}
            size={14}
            color={categoryConfig.color}
          />
          <Text style={[styles.categoryText, { color: categoryConfig.color }]}>
            {categoryConfig.label}
          </Text>
        </View>
      </Surface>
    </Animated.View>
  );
};
