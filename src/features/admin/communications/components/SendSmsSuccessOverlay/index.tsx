import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface SendSmsSuccessOverlayProps {
  visible: boolean;
  sentCount: number;
}

export const SendSmsSuccessOverlay: React.FC<SendSmsSuccessOverlayProps> = ({ visible, sentCount }) => {
  const { colors } = useAppTheme();
  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(300)} style={[styles.overlay, { backgroundColor: colors.background.overlay }]}>
      <Animated.View entering={ZoomIn.springify().damping(12)} style={[styles.card, { backgroundColor: colors.background.card }]}>
        <View style={[styles.iconCircle, { backgroundColor: colors.status.success + '18' }]}>
          <Ionicons name="checkmark-circle" size={56} color={colors.status.success} />
        </View>
        <Text style={[styles.title, { color: colors.text.primary }]}>Envoye avec succes!</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Message envoye a {sentCount} destinataire{sentCount > 1 ? 's' : ''}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  card: {
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
});
