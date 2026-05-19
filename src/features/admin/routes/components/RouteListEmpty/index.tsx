/**
 * RouteListEmpty - Empty state component
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShippingMode } from '../../types';
import { createStyles } from './RouteListEmpty.styles';

interface RouteListEmptyProps {
  selectedMode: ShippingMode | 'all';
  onCreateRoute: () => void;
}

export const RouteListEmpty: React.FC<RouteListEmptyProps> = ({ selectedMode, onCreateRoute }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={[colors.primary[50], colors.primary[100]]}
        style={styles.emptyIconContainer}
      >
        <Ionicons name="map-outline" size={64} color={colors.primary[400]} />
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
            <Ionicons name="add" size={20} color={colors.text.inverse} />
            <Text style={styles.emptyButtonText}>Nouvelle Route</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RouteListEmpty;
