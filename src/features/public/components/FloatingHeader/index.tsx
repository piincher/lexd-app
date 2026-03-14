/**
 * FloatingHeader - Animated header on scroll
 * 
 * Appears when user scrolls down
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { Fonts } from '@src/constants/Fonts';
import { styles } from './FloatingHeader.styles';

const AnimatedView = Animated.createAnimatedComponent(View);

interface FloatingHeaderProps {
  style: any;
  onLoginPress: () => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({ style, onLoginPress }) => {
  return (
    <AnimatedView style={[styles.container, style]}>
      <Text style={[styles.title, { fontFamily: Fonts.bold }]}>ChinaLink Express</Text>
      <Button mode="contained" onPress={onLoginPress} compact>
        Connexion
      </Button>
    </AnimatedView>
  );
};

export default FloatingHeader;
