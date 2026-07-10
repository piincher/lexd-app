import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAuth } from '@src/app/store/Auth';
import { useShippingMarkPromptStore } from '@src/app/store/shippingMarkPromptStore';
import { navigationRef } from '@src/app/navigation/navigationRef';
import { styles } from './ShippingMarkProfileCTA.styles';

export const ShippingMarkProfileCTA: React.FC = () => {
  const { colors } = useAppTheme();
  const user = useAuth((state) => state.user);
  const userId = user?._id;
  const role = user?.role;
  const markAcknowledged = useShippingMarkPromptStore((state) => state.markAcknowledged);
  const userState = useShippingMarkPromptStore(
    (state) => (userId ? state.users[userId] : undefined),
  );

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 800 }),
        withTiming(1, { duration: 800 }),
      ),
      -1,
      true,
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (role !== 'user') return null;
  if (!userId || userState?.dismissedAt || userState?.downloadedAt) return null;

  const handlePress = () => {
    markAcknowledged(userId);
    if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.navigate({ name: 'ShippingMark' }));
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.container,
          {
            backgroundColor: colors.status.error + '12',
            borderColor: colors.status.error,
          },
          pressed && { opacity: 0.9 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Télécharger la marque d'expédition"
      >
        <View style={[styles.iconCircle, { backgroundColor: colors.status.error + '20' }]}>
          <MaterialCommunityIcons name="qrcode" size={28} color={colors.status.error} />
        </View>
        <View style={styles.textCol}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.status.error }]}>
              Marque d&apos;expédition requise
            </Text>
            <View style={[styles.urgentBadge, { backgroundColor: colors.status.error }]}>
              <Text style={[styles.urgentBadgeText, { color: colors.text.inverse }]}>
                Important
              </Text>
            </View>
          </View>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Téléchargez votre marque et envoyez-la à votre fournisseur pour que vos colis soient
            acceptés par l&apos;entrepôt.
          </Text>
          <View style={styles.ctaRow}>
            <Text style={[styles.ctaText, { color: colors.status.error }]}>
              Télécharger maintenant
            </Text>
            <MaterialCommunityIcons name="arrow-right" size={18} color={colors.status.error} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
