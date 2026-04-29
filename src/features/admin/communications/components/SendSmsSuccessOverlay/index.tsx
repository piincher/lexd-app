import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface SendSmsSuccessOverlayProps {
  visible: boolean;
  sentCount: number;
}

export const SendSmsSuccessOverlay: React.FC<SendSmsSuccessOverlayProps> = ({ visible, sentCount }) => {
  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(300)} style={styles.overlay}>
      <Animated.View entering={ZoomIn.springify().damping(12)} style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={56} color="#10B981" />
        </View>
        <Text style={styles.title}>Envoye avec succes!</Text>
        <Text style={styles.subtitle}>
          Message envoye a {sentCount} destinataire{sentCount > 1 ? 's' : ''}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16,185,129,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
  },
});
