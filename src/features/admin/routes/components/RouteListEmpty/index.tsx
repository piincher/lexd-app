/**
 * RouteListEmpty - Empty state component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { ShippingMode } from '../../types';
import { styles } from './RouteListEmpty.styles';

interface RouteListEmptyProps {
  selectedMode: ShippingMode | 'all';
  onCreateRoute: () => void;
}

export const RouteListEmpty: React.FC<RouteListEmptyProps> = ({ selectedMode, onCreateRoute }) => {
  return (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={['#F3F0FF', '#EDE9FE']}
        style={styles.emptyIconContainer}
      >
        <Ionicons name="map-outline" size={64} color={Theme.primary[400]} />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Aucune route</Text>
      <Text style={styles.emptySubtitle}>
        {selectedMode !== 'all'
          ? 'Aucune route dans cette catégorie'
          : 'Créez votre première route pour commencer'}
      </Text>
      {selectedMode === 'all' && (
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={onCreateRoute}
        >
          <LinearGradient
            colors={Theme.gradients.primary}
            style={styles.emptyButtonGradient}
          >
            <Ionicons name="add" size={20} color="#FFF" />
            <Text style={styles.emptyButtonText}>Nouvelle Route</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RouteListEmpty;
