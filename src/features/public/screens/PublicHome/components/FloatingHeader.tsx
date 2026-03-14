import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface FloatingHeaderProps {
  headerStyle: any;
  onLogin: () => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({ headerStyle, onLogin }) => {
  return (
    <Animated.View style={[styles.container, headerStyle]}>
      <Text style={styles.title}>ChinaLink Express</Text>
      <Button mode="contained" onPress={onLogin} compact>
        Connexion
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 100,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.blue,
  },
});
