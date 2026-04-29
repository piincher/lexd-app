/**
 * RouteListFab - Floating action button
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { styles } from './RouteListFab.styles';

interface RouteListFabProps {
  onPress: () => void;
}

export const RouteListFab: React.FC<RouteListFabProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.fabContainer}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={Theme.gradients.primary}
        style={styles.fab}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RouteListFab;
