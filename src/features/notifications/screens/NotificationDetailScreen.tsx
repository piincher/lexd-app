/**
 * NotificationDetailScreen
 * Shows full notification details with action buttons
 */

import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  Pressable,
} from 'react-native';
import { Text, Surface, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatFullDate } from '../utils/timeUtils';

import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Header } from '@src/components/Header/Header';
import type { navigationProps, RootStackParamList } from '@src/navigations/type';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG, NOTIFICATION_PRIORITY_CONFIG } from '../types';
import { useMarkAsRead, useDeleteNotification } from '../hooks/useNotifications';

type NotificationDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NotificationDetail'
>;

// Extend RootStackParamList for this screen
declare module '@src/navigations/type' {
  export type RootStackParamList = {
    // ... existing routes
    NotificationDetail: { notification: import('../types').InAppNotification };
  };
}

const NotificationDetailScreen: React.FC<NotificationDetailScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { notification } = route.params;
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  // Mark as read when screen opens
  useEffect(() => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  }, [notification._id, notification.isRead, markAsRead]);

  // Get configs
  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;
  const priorityConfig = NOTIFICATION_PRIORITY_CONFIG[notification.priority];

  // Format dates
  const createdAt = formatFullDate(notification.createdAt);

  // Handle action button press
  const handleActionPress = () => {
    // Navigate based on type and data
    if (notification.data?.type === 'CERTIFICATE_ISSUED' || notification.data?.certificateId) {
      if (notification.data?.certificateId && notification.data?.verificationCode && notification.data?.issuedAt) {
        navigation.navigate('CertificateDetail', {
          certificateId: notification.data.certificateId,
          verificationCode: notification.data.verificationCode,
          issuedAt: notification.data.issuedAt,
          certificateUrl: notification.data.certificateUrl || null,
          certificateMongoId: notification.data.certificateMongoId || notification.data.certificateId,
        });
      } else {
        navigation.navigate('Profile');
      }
    } else if (notification.data?.orderId) {
      navigation.navigate('OrderDetail', { id: notification.data.orderId });
    } else if (notification.data?.containerId) {
      navigation.navigate('ContainerTracking', { containerId: notification.data.containerId });
    } else if (notification.data?.ticketId) {
      navigation.navigate('TicketDetail', { ticketId: notification.data.ticketId });
    }
  };

  // Handle delete
  const handleDelete = () => {
    deleteNotification(notification._id);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Détail" navigation={navigation} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Icon Card */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <Surface style={styles.iconCard} elevation={2}>
            <View style={[styles.iconContainer, { backgroundColor: categoryConfig.color }]}>
              <MaterialCommunityIcons 
                name={typeConfig.icon as any} 
                size={48} 
                color={COLORS.white} 
              />
            </View>
            
            <Text style={styles.typeLabel}>{typeConfig.label}</Text>
            
            <View style={[styles.categoryBadge, { backgroundColor: categoryConfig.backgroundColor }]}>
              <MaterialCommunityIcons 
                name={categoryConfig.icon as any} 
                size={14} 
                color={categoryConfig.color} 
              />
              <Text style={[styles.categoryText, { color: categoryConfig.color }]}>
                {categoryConfig.label}
              </Text>
            </View>
          </Surface>
        </Animated.View>

        {/* Content Card */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <Surface style={styles.contentCard} elevation={1}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{notification.title}</Text>
              {notification.priority === 'HIGH' && (
                <View style={[styles.priorityBadge, { backgroundColor: priorityConfig.color }]}>
                  <Text style={styles.priorityText}>{priorityConfig.label}</Text>
                </View>
              )}
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.message}>{notification.message}</Text>

            <Divider style={styles.divider} />

            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons name="clock-outline" size={18} color={COLORS.grey} />
                <Text style={styles.metaText}>{createdAt}</Text>
              </View>

              <View style={styles.metaItem}>
                <MaterialCommunityIcons 
                  name={notification.isRead ? "email-open-outline" : "email-outline"} 
                  size={18} 
                  color={notification.isRead ? COLORS.green : COLORS.grey} 
                />
                <Text style={styles.metaText}>
                  {notification.isRead ? 'Lue' : 'Non lue'}
                </Text>
              </View>
            </View>
          </Surface>
        </Animated.View>

        {/* Data Card (if applicable) */}
        {notification.data && Object.keys(notification.data).length > 0 && (
          <Animated.View entering={FadeInUp.delay(300)}>
            <Surface style={styles.dataCard} elevation={1}>
              <Text style={styles.dataTitle}>Informations associées</Text>
              
              {notification.data.orderId && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Commande</Text>
                  <Text style={styles.dataValue}>#{notification.data.orderId.slice(-6)}</Text>
                </View>
              )}
              
              {notification.data.containerId && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Conteneur</Text>
                  <Text style={styles.dataValue}>#{notification.data.containerId.slice(-6)}</Text>
                </View>
              )}
              
              {notification.data.ticketId && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Ticket</Text>
                  <Text style={styles.dataValue}>#{notification.data.ticketId.slice(-6)}</Text>
                </View>
              )}
              
              {notification.data.invoiceId && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Facture</Text>
                  <Text style={styles.dataValue}>#{notification.data.invoiceId.slice(-6)}</Text>
                </View>
              )}

              {notification.data.certificateId && (
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Certificat</Text>
                  <Text style={styles.dataValue}>#{notification.data.certificateId.slice(-6)}</Text>
                </View>
              )}
            </Surface>
          </Animated.View>
        )}

        {/* Action Button */}
        {(notification.data?.orderId || notification.data?.containerId || notification.data?.ticketId || notification.data?.certificateId) && (
          <Animated.View entering={FadeInUp.delay(400)} style={styles.actionContainer}>
            <Button
              mode="contained"
              onPress={handleActionPress}
              style={styles.actionButton}
              icon="arrow-right"
              contentStyle={styles.actionButtonContent}
            >
              {notification.actionLabel || 'Voir les détails'}
            </Button>
          </Animated.View>
        )}

        {/* Delete Button */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.deleteContainer}>
          <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <MaterialCommunityIcons name="delete-outline" size={20} color={COLORS.danger} />
            <Text style={styles.deleteText}>Supprimer cette notification</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  scrollView: {
    flex: 1,
  },
  iconCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeLabel: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.DarkGrey,
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
  },
  contentCard: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: COLORS.DarkGrey,
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: COLORS.white,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: COLORS.border,
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: COLORS.DimGray,
    lineHeight: 24,
  },
  metaContainer: {
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.grey,
  },
  dataCard: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  dataTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginBottom: 12,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dataLabel: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: COLORS.DimGray,
  },
  dataValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
  actionContainer: {
    margin: 16,
    marginTop: 8,
  },
  actionButton: {
    borderRadius: 12,
    backgroundColor: COLORS.blue,
  },
  actionButtonContent: {
    paddingVertical: 8,
    flexDirection: 'row-reverse',
  },
  deleteContainer: {
    margin: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  deleteText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: COLORS.danger,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default NotificationDetailScreen;
