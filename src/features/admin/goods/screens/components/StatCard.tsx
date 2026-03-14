import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsListScreen.styles';

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
  gradient: readonly [string, string];
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, gradient }) => (
  <View style={styles.statCard}>
    <LinearGradient colors={gradient} style={styles.statIconContainer}>
      <Ionicons name={icon as any} size={20} color="#FFF" />
    </LinearGradient>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);
