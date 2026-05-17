import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createServiceShowcaseStyles } from './ServiceShowcase.styles';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  deliveryTime: string;
  icon: any;
  gradient: [string, string];
  navigateTo: string;
  index: number;
  onPress: (navigateTo: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  deliveryTime,
  icon,
  gradient,
  navigateTo,
  index,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createServiceShowcaseStyles(colors);

  return (
    <Animated.View
      entering={FadeInRight.delay(300 + index * 150).duration(500).springify()}
      style={styles.cardWrapper}
    >
      <Pressable
        style={({ pressed }) => [styles.pressable, pressed && styles.cardPressed]}
        onPress={() => onPress(navigateTo)}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.bgIconWrap}>
            <FontAwesome6
              name={icon}
              size={80}
              color={`${colors.neutral.white}0F`}
              style={styles.bgIcon}
            />
          </View>

          <View style={styles.cardIconCircle}>
            <FontAwesome6 name={icon} size={22} color={gradient[0]} />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDelivery}>{deliveryTime}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>

          <View style={styles.cardArrow}>
            <FontAwesome6 name="arrow-right" size={12} color={`${colors.neutral.white}CC`} />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
