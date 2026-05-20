/**
 * FloatingButtons Component
 * Back to top and WhatsApp floating action buttons
 */

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { openSupportWhatsApp } from '@src/shared/lib/openWhatsApp';

interface FloatingButtonsProps {
  scrollRef: React.RefObject<any>;
  backButtonStyle: any;
  whatsappStyle: any;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  scrollRef,
  backButtonStyle,
  whatsappStyle,
}) => {
  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleWhatsApp = () => {
    openSupportWhatsApp("Bonjour ChinaLink, J ai une demande d'expedition a faire :)");
  };

  return (
    <>
      {/* Back to Top Button */}
      <Animated.View style={[styles.backToTop, backButtonStyle]}>
        <Pressable
          onPress={handleBackToTop}
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <LinearGradient colors={[Theme.gradients.ocean[2], Theme.gradients.ocean[0]]} style={styles.backToTopButton}>
            <AntDesign name="arrow-up" size={24} color="white" />
          </LinearGradient>
        </Pressable>
      </Animated.View>

      {/* WhatsApp Button */}
      <Animated.View style={[styles.whatsappButton, whatsappStyle]}>
        <Pressable
          onPress={handleWhatsApp}
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <LinearGradient colors={['#25D366', '#128C7E']} style={styles.whatsappContainer}>
            <FontAwesome6 name="whatsapp" size={28} color="white" />
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backToTop: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 100,
  },
  backToTopButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    zIndex: 100,
  },
  whatsappContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default FloatingButtons;
