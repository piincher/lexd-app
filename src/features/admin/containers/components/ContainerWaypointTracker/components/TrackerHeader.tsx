import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';

interface TrackerHeaderProps {
  containerNumber: string;
}

export const TrackerHeader: React.FC<TrackerHeaderProps> = ({ containerNumber }) => {
  return (
    <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
      <LinearGradient
        colors={[Theme.primary[600], Theme.primary[800]]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="map" size={28} color="#FFF" />
        <Text style={styles.headerTitle}>Suivi du Parcours</Text>
        <Text style={styles.headerSubtitle}>{containerNumber}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
});
