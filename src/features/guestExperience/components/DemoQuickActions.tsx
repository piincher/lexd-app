import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoQuickAction } from '../types';

interface Props {
  actions: DemoQuickAction[];
  onAction: (id: string) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const DemoQuickActions: React.FC<Props> = ({ actions, onAction }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <ActionButton key={action.id} action={action} index={index} onPress={() => onAction(action.id)} styles={styles} />
        ))}
      </View>
    </View>
  );
};

const ActionButton: React.FC<{
  action: DemoQuickAction;
  index: number;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
}> = ({ action, index, onPress, styles }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(index * 100).springify()}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, { borderTopColor: action.color }, animatedStyle]}
    >
      <FontAwesome6 name={action.icon as any} size={28} color={action.color} />
      <Text style={styles.title}>{action.title}</Text>
      <Text style={styles.description}>{action.description}</Text>
    </AnimatedPressable>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 22,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    card: {
      width: '47%',
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 4,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
      marginTop: 10,
      textAlign: 'center',
    },
    description: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 4,
      textAlign: 'center',
    },
  });
