import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { CapacityIndicator } from './CapacityIndicator';
import { Container, ContainerStatus, CONTAINER_STATUS_LABELS } from '../../../types';
import { Theme } from '@src/constants/Theme';

interface HeaderProps {
  container?: Container;
  currentContainerCBM: number;
  totalSelectedCBM: number;
  isAssignable: boolean;
  containerStatus: ContainerStatus;
  isAirContainer?: boolean;
  maxCapacity?: number;
  onBack: () => void;
}

const MAX_CONTAINER_CBM = 67; // Standard 40ft container capacity

export const Header: React.FC<HeaderProps> = ({
  container,
  currentContainerCBM,
  totalSelectedCBM,
  isAssignable,
  containerStatus,
  isAirContainer = false,
  maxCapacity = MAX_CONTAINER_CBM,
  onBack,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={Theme.gradients.primary} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Theme.colors.text.inverse} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Assigner des marchandises</Text>
            <Text style={styles.headerSubtitle}>{container?.virtualContainerNumber}</Text>
            {container?.shippingMode && (
              <View style={[styles.modeBadge, { backgroundColor: container.shippingMode === 'AIR' ? 'rgba(239,68,68,0.3)' : 'rgba(59,130,246,0.3)' }]}>
                <Ionicons name={container.shippingMode === 'AIR' ? 'airplane' : 'boat'} size={12} color={Theme.colors.text.inverse} />
                <Text style={styles.modeBadgeText}>
                  {container.shippingMode === 'AIR' ? 'Aérien uniquement' : 'Maritime uniquement'}
                </Text>
              </View>
            )}
          </View>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color={Theme.colors.text.inverse}
          />
        </View>

        <CapacityIndicator
          currentCBM={currentContainerCBM}
          selectedCBM={totalSelectedCBM}
          maxCBM={maxCapacity}
          isAir={isAirContainer}
        />

        {!isAssignable && (
          <View style={styles.nonAssignableBanner}>
            <Ionicons name="lock-closed" size={18} color="#EF4444" />
            <View style={styles.nonAssignableContent}>
              <Text style={styles.nonAssignableTitle}>Assignation impossible</Text>
              <Text style={styles.nonAssignableText}>
                Ce container est en statut "{CONTAINER_STATUS_LABELS[containerStatus]}". {'\n'}
                Les marchandises ne peuvent être assignées qu'aux containers "Réservé" ou "En Chargement".
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primary[500],
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.text.inverse,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Theme.colors.text.inverse,
    marginTop: 2,
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  modeBadgeText: {
    fontSize: 11,
    color: Theme.colors.text.inverse,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  nonAssignableBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  nonAssignableContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  nonAssignableTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 2,
  },
  nonAssignableText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },
});
