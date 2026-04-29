import React, { useMemo } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface NotificationDetailActionsProps {
  actionLabel?: string;
  showActionButton: boolean;
  onActionPress: () => void;
  onDelete: () => void;
}

export const NotificationDetailActions: React.FC<NotificationDetailActionsProps> = ({
  actionLabel,
  showActionButton,
  onActionPress,
  onDelete,
}) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        actionContainer: {
          margin: 16,
          marginTop: 8,
        },
        actionButton: {
          borderRadius: 12,
          backgroundColor: colors.primary.main,
        },
        actionButtonContent: {
          paddingVertical: 8,
          flexDirection: 'row-reverse',
        },
        deleteContainer: {
          margin: 16,
          marginTop: 8,
          alignItems: 'center',
        },
        deleteButton: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          padding: 12,
        },
        deleteText: {
          fontFamily: Fonts.medium,
          fontSize: 14,
          color: colors.status.error,
        },
      }),
    [colors]
  );

  return (
    <>
      {showActionButton && (
        <Animated.View entering={FadeInUp.delay(400)} style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={onActionPress}
            style={styles.actionButton}
            icon="arrow-right"
            contentStyle={styles.actionButtonContent}
          >
            {actionLabel || 'Voir les détails'}
          </Button>
        </Animated.View>
      )}

      <Animated.View entering={FadeInUp.delay(500)} style={styles.deleteContainer}>
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <MaterialCommunityIcons name="delete-outline" size={20} color={colors.status.error} />
          <Text style={styles.deleteText}>Supprimer cette notification</Text>
        </Pressable>
      </Animated.View>
    </>
  );
};
