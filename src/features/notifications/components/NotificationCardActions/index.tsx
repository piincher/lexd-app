/**
 * NotificationCardActions
 * SRP: Swipe action renderers for notification cards
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface NotificationCardLeftActionsProps {
  isUnread: boolean;
}

export const NotificationCardLeftActions: React.FC<NotificationCardLeftActionsProps> = ({
  isUnread,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!isUnread) return null;
  return (
    <View style={[styles.swipeAction, styles.leftAction]}>
      <MaterialCommunityIcons name="check-circle-outline" size={26} color={colors.text.inverse} />
      <Text style={styles.swipeText}>Lu</Text>
    </View>
  );
};

export const NotificationCardRightActions: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.swipeAction, styles.rightAction]}>
      <MaterialCommunityIcons name="delete-outline" size={24} color={colors.text.inverse} />
      <Text style={styles.swipeText}>Suppr.</Text>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    swipeAction: {
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    leftAction: {
      backgroundColor: colors.status.success,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      marginLeft: 16,
    },
    rightAction: {
      backgroundColor: colors.status.error,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      marginRight: 16,
    },
    swipeText: {
      fontSize: 11,
      fontFamily: Fonts.medium,
      fontWeight: '500',
      color: colors.text.inverse,
      marginTop: 3,
    },
  });
