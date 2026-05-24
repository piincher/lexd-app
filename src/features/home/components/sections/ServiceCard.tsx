import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createServiceShowcaseStyles } from './ServiceShowcase.styles';

type FontAwesome6Name = React.ComponentProps<typeof FontAwesome6>['name'];

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  deliveryTime: string;
  icon: FontAwesome6Name;
  accentColor: string;
  navigateTo: string;
  index: number;
  onPress: (navigateTo: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  deliveryTime,
  icon,
  accentColor,
  navigateTo,
  index,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createServiceShowcaseStyles(colors);

  return (
    <Animated.View
      entering={FadeInRight.delay(160 + index * 90).duration(340)}
      style={styles.cardWrapper}
    >
      <Pressable
        style={({ pressed }) => [styles.pressable, pressed && styles.cardPressed]}
        onPress={() => onPress(navigateTo)}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${deliveryTime}`}
      >
        <View style={styles.card}>
          <View style={[styles.cardIconCircle, { backgroundColor: `${accentColor}14` }]}>
            <FontAwesome6 name={icon} size={22} color={accentColor} />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDelivery}>{deliveryTime}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>

          <View style={styles.cardArrow}>
            <FontAwesome6 name="arrow-right" size={12} color={colors.text.secondary} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
