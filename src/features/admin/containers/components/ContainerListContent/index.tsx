import React from 'react';
import { View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Container, ContainerStatus } from '../../types';
import { ContainerCard } from '../ContainerCard';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ContainerListContent.styles';

interface ContainerListContentProps {
  isLoading: boolean;
  isRefetching: boolean;
  error: any;
  filteredContainers: Container[];
  selectedStatus: ContainerStatus | 'all' | 'assignable';
  onRefresh: () => void;
  onContainerPress: (containerId: string) => void;
  onCreateContainerPress: () => void;
}

export const ContainerListContent: React.FC<ContainerListContentProps> = ({
  isLoading,
  isRefetching,
  error,
  filteredContainers,
  selectedStatus,
  onRefresh,
  onContainerPress,
  onCreateContainerPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const renderContainer = ({ item }: { item: Container }) => (
    <ContainerCard container={item} onPress={() => onContainerPress(item._id)} />
  );
  const keyExtractor = (item: Container) => item._id;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[600]} />
        <Text style={styles.loadingText}>Chargement des containers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <LinearGradient colors={[colors.status.error + '10', colors.status.error + '18']} style={styles.errorIconContainer}>
          <Ionicons name="alert-circle" size={64} color={colors.status.error} />
        </LinearGradient>
        <Text style={styles.errorTitle}>Erreur de chargement</Text>
        <Text style={styles.errorSubtitle}>Impossible de récupérer les containers</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <LinearGradient colors={Theme.gradients.primary} style={styles.retryButtonGradient}>
            <Ionicons name="refresh" size={20} color={colors.text.inverse} />
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlashList
      data={filteredContainers}
      keyExtractor={keyExtractor}
      renderItem={renderContainer}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={colors.primary[500]} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <LinearGradient colors={[colors.primary[50], colors.primary[100]]} style={styles.emptyIconContainer}>
            <Ionicons name="cube-outline" size={64} color={colors.primary[400]} />
          </LinearGradient>
          <Text style={styles.emptyTitle}>Aucun container</Text>
          <Text style={styles.emptySubtitle}>
            {selectedStatus === 'assignable'
              ? 'Aucun container ne peut recevoir de marchandises'
              : selectedStatus !== 'all'
              ? 'Aucun container dans ce statut'
              : 'Créez votre premier container pour commencer'}
          </Text>
          {selectedStatus === 'all' && (
            <TouchableOpacity style={styles.emptyButton} onPress={onCreateContainerPress}>
              <LinearGradient colors={Theme.gradients.primary} style={styles.emptyButtonGradient}>
                <Ionicons name="add" size={20} color={colors.text.inverse} />
                <Text style={styles.emptyButtonText}>Nouveau Container</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      }
    />
  );
};
