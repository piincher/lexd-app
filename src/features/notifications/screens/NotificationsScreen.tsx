/**
 * NotificationsScreen
 * Full notification center with personal notifications, public activity feed, filters, and infinite scroll
 */

import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  RefreshControl,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Header } from '@src/components/Header/Header';
import type { navigationProps } from '@src/navigations/type';
import type { InAppNotification, PublicNotification } from '../types';
import NotificationItem from '../components/NotificationItem';
import PrivacyNotificationCard from '../components/PrivacyNotificationCard';
import {
  useGetNotificationsInfinite,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification
} from '../hooks/useNotifications';
import { useGetPublicNotificationsInfinite } from '../hooks/usePublicNotifications';
import { certificateApi } from '@src/features/profile/api/certificateApi';

interface NotificationsScreenProps {
  navigation: navigationProps;
}

type FilterTab = 'all' | 'unread' | 'system' | 'activity';

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // Personal Notifications Queries
  const {
    data: personalData,
    fetchNextPage: fetchNextPersonal,
    hasNextPage: hasNextPersonal,
    isFetchingNextPage: isFetchingNextPersonal,
    isLoading: isLoadingPersonal,
    isError: isErrorPersonal,
    refetch: refetchPersonal,
  } = useGetNotificationsInfinite(activeFilter === 'activity' ? 'all' : activeFilter);

  // Public Notifications Query (for activity feed)
  const {
    data: publicData,
    fetchNextPage: fetchNextPublic,
    hasNextPage: hasNextPublic,
    isFetchingNextPage: isFetchingNextPublic,
    isLoading: isLoadingPublic,
    isError: isErrorPublic,
    refetch: refetchPublic,
  } = useGetPublicNotificationsInfinite();

  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  // Flatten paginated data
  const notifications = personalData?.pages.flatMap(page => page.data) || [];

  const publicNotifications = publicData?.pages.flatMap(page => page.data) || [];

  // Combined loading and error states
  const isLoading = activeFilter === 'activity' ? isLoadingPublic : isLoadingPersonal;
  const isError = activeFilter === 'activity' ? isErrorPublic : isErrorPersonal;
  const refetch = activeFilter === 'activity' ? refetchPublic : refetchPersonal;
  const isFetchingNextPage = activeFilter === 'activity' ? isFetchingNextPublic : isFetchingNextPersonal;
  const hasNextPage = activeFilter === 'activity' ? hasNextPublic : hasNextPersonal;
  const fetchNextPage = activeFilter === 'activity' ? fetchNextPublic : fetchNextPersonal;

  // Handle filter change
  const handleFilterChange = (filter: FilterTab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveFilter(filter);
  };

  // Handle notification press
  const handleNotificationPress = (notification: InAppNotification) => {
    // Mark as read if not already
    if (!notification.isRead) {
      markAsRead(notification._id);
    }

    // Navigate based on notification type
    handleNavigation(notification);
  };

  // Handle navigation based on notification type
  const handleNavigation = (notification: InAppNotification) => {
    const { type, data } = notification;

    // Check both the notification type and data.type for certificate notifications
    // (backend creates in-app notifications with type "GENERAL" but data.type "CERTIFICATE_ISSUED")
    const effectiveType = data?.type === 'CERTIFICATE_ISSUED' ? 'CERTIFICATE_ISSUED' : type;

    switch (effectiveType) {
      case 'ORDER_UPDATE':
        if (data?.orderId) {
          navigation.navigate('OrderDetail', { id: data.orderId });
        }
        break;

      case 'CONTAINER_STATUS':
        if (data?.containerId) {
          navigation.navigate('ContainerTracking', { containerId: data.containerId });
        }
        break;

      case 'TICKET_REPLY':
        if (data?.ticketId) {
          navigation.navigate('TicketDetail', { ticketId: data.ticketId });
        }
        break;

      case 'INVOICE':
        if (data?.invoiceId) {
          // Navigate to invoice detail
          // navigation.navigate('InvoiceDetail', { id: data.invoiceId });
        }
        break;

      case 'PAYMENT':
        if (data?.paymentId) {
          navigation.navigate('PaymentConfirmation', {
            paymentId: data.paymentId,
            transactionReference: '',
            amount: 0,
            currency: 'XOF',
            paymentMethod: '',
            goodsCount: 0,
          });
        }
        break;

      case 'CERTIFICATE_ISSUED':
        // Fetch certificate progress and navigate to detail screen
        certificateApi.getProgress().then((response) => {
          const progress = response.data.data;
          if (progress.isCertified && progress.certificate) {
            const cert = progress.certificate;
            navigation.navigate('CertificateDetail', {
              certificateId: cert.certificateId,
              verificationCode: cert.verificationCode,
              issuedAt: cert.issuedAt,
              certificateUrl: cert.certificateUrl || null,
              certificateMongoId: cert._id || data?.certificateId,
            });
          }
        }).catch((err) => {
          console.error('[NotificationsScreen] Error fetching certificate:', err);
        });
        break;

      default:
        // No navigation for general/system notifications
        break;
    }
  };

  // Handle mark as read
  const handleMarkAsRead = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    markAsRead(id);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    deleteNotification(id);
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    markAllAsRead();
  };

  // Render personal notification item
  const renderPersonalItem: ListRenderItem<InAppNotification> = ({ item, index }) => (
    <NotificationItem
      notification={item}
      onPress={handleNotificationPress}
      onMarkAsRead={handleMarkAsRead}
      onDelete={handleDelete}
      index={index}
    />
  );

  // Render public notification item
  const renderPublicItem: ListRenderItem<PublicNotification> = ({ item, index }) => (
    <PrivacyNotificationCard
      notification={item}
      index={index}
    />
  );

  // Render filter tabs
  const renderFilterTabs = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        <Chip
          selected={activeFilter === 'all'}
          onPress={() => handleFilterChange('all')}
          style={[styles.filterChip, activeFilter === 'all' && styles.activeChip]}
          textStyle={[styles.filterChipText, activeFilter === 'all' && styles.activeChipText]}
          icon="bell-outline"
        >
          Tous
        </Chip>
        
        <Chip
          selected={activeFilter === 'unread'}
          onPress={() => handleFilterChange('unread')}
          style={[styles.filterChip, activeFilter === 'unread' && styles.activeChip]}
          textStyle={[styles.filterChipText, activeFilter === 'unread' && styles.activeChipText]}
          icon="email-mark-as-unread"
        >
          Non lues
        </Chip>
        
        <Chip
          selected={activeFilter === 'system'}
          onPress={() => handleFilterChange('system')}
          style={[styles.filterChip, activeFilter === 'system' && styles.activeChip]}
          textStyle={[styles.filterChipText, activeFilter === 'system' && styles.activeChipText]}
          icon="cog-outline"
        >
          Système
        </Chip>

        <Chip
          selected={activeFilter === 'activity'}
          onPress={() => handleFilterChange('activity')}
          style={[styles.filterChip, activeFilter === 'activity' && styles.activeChip]}
          textStyle={[styles.filterChipText, activeFilter === 'activity' && styles.activeChipText]}
          icon="earth"
        >
          Activité
        </Chip>
      </ScrollView>
    </View>
  );

  // Render activity feed header with privacy info
  const renderActivityHeader = () => (
    <View style={styles.activityHeader}>
      <View style={styles.activityHeaderContent}>
        <MaterialCommunityIcons name="shield-check-outline" size={20} color={COLORS.success} />
        <Text style={styles.activityHeaderText}>
          Les informations personnelles sont masquées pour protéger la vie privée
        </Text>
      </View>
    </View>
  );

  // Empty state
  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyStateContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={styles.loadingText}>Chargement des notifications...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <Animated.View entering={FadeIn} style={styles.emptyStateContainer}>
          <MaterialCommunityIcons name="alert-circle" size={64} color={COLORS.danger} />
          <Text style={styles.emptyTitle}>Erreur de chargement</Text>
          <Text style={styles.emptySubtitle}>
            Impossible de récupérer vos notifications. Veuillez réessayer.
          </Text>
          <Pressable onPress={() => refetch()} style={styles.retryButton}>
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        </Animated.View>
      );
    }

    if (activeFilter === 'activity') {
      return (
        <Animated.View entering={FadeInUp} style={styles.emptyStateContainer}>
          <MaterialCommunityIcons name="package-variant" size={80} color={COLORS.grey} />
          <Text style={styles.emptyTitle}>Aucune activité récente</Text>
          <Text style={styles.emptySubtitle}>
            Les notifications d'arrivée de marchandises apparaîtront ici.
          </Text>
        </Animated.View>
      );
    }

    return (
      <Animated.View entering={FadeInUp} style={styles.emptyStateContainer}>
        <MaterialCommunityIcons name="bell-off-outline" size={80} color={COLORS.grey} />
        <Text style={styles.emptyTitle}>Aucune notification</Text>
        <Text style={styles.emptySubtitle}>
          Vous serez informé ici dès qu'une nouvelle notification arrivera.
        </Text>
      </Animated.View>
    );
  };

  // Footer loader
  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.blue} />
      </View>
    );
  };

  // Render activity feed (public notifications)
  const renderActivityFeed = () => (
    <FlashList
      data={publicNotifications}
      renderItem={renderPublicItem}
      keyExtractor={(item) => item._id}
      estimatedItemSize={120}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={renderActivityHeader}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={[COLORS.blue]}
          tintColor={COLORS.blue}
        />
      }
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={renderEmptyComponent}
      ListFooterComponent={renderFooter}
    />
  );

  // Render personal notifications list
  const renderPersonalList = () => (
    <FlashList
      data={notifications}
      renderItem={renderPersonalItem}
      keyExtractor={(item) => item._id}
      estimatedItemSize={100}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={[COLORS.blue]}
          tintColor={COLORS.blue}
        />
      }
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={renderEmptyComponent}
      ListFooterComponent={renderFooter}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <Header 
        title="Notifications" 
        navigation={navigation}
        rightIcon={
          activeFilter !== 'activity' && notifications.some(n => !n.isRead) ? (
            <MaterialCommunityIcons 
              name="check-all" 
              size={24} 
              color={isMarkingAll ? COLORS.grey : COLORS.blue} 
            />
          ) : undefined
        }
        rightIconHandler={activeFilter !== 'activity' && notifications.some(n => !n.isRead) ? handleMarkAllAsRead : undefined}
        rightIconAccessibilityLabel="Tout marquer comme lu"
      />

      {/* Filter Tabs */}
      {renderFilterTabs()}

      {/* Notification List */}
      {activeFilter === 'activity' ? renderActivityFeed() : renderPersonalList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  filterContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    backgroundColor: COLORS.lightergray,
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: COLORS.blue,
  },
  filterChipText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: COLORS.DimGray,
  },
  activeChipText: {
    color: COLORS.white,
  },
  listContent: {
    paddingVertical: 8,
  },
  activityHeader: {
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
  },
  activityHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  activityHeaderText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.success,
    lineHeight: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  loadingText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 16,
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: COLORS.DarkGrey,
    marginTop: 24,
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: COLORS.grey,
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  retryText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: COLORS.white,
  },
  footerLoader: {
    padding: 16,
    alignItems: 'center',
  },
});

export default NotificationsScreen;
