import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsListScreen.styles';

interface EmptyStateProps {
  searchQuery: string;
  selectedStatus: string;
  onCreate: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, selectedStatus, onCreate }) => (
  <View style={styles.emptyContainer}>
    <LinearGradient
      colors={['#F0FDF4', '#DCFCE7']}
      style={styles.emptyIconContainer}
    >
      <Ionicons name="cube-outline" size={64} color={Theme.primary[500]} />
    </LinearGradient>
    <Text style={styles.emptyTitle}>Aucune marchandise</Text>
    <Text style={styles.emptySubtitle}>
      {searchQuery || selectedStatus !== 'all'
        ? 'Essayez de modifier vos filtres'
        : 'Commencez par recevoir une marchandise'}
    </Text>
    {!searchQuery && selectedStatus === 'all' && (
      <TouchableOpacity style={styles.emptyButton} onPress={onCreate}>
        <LinearGradient colors={Theme.gradients.primary} style={styles.emptyButtonGradient}>
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.emptyButtonText}>Nouvelle marchandise</Text>
        </LinearGradient>
      </TouchableOpacity>
    )}
  </View>
);
