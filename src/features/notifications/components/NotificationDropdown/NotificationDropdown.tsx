/**
 * NotificationDropdown Component
 */

import React from 'react';
import { View, StyleSheet, Pressable, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import Animated, { SlideInDown, SlideOutUp } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { InAppNotification } from '../../types';
import { useGetNotifications, useMarkAsRead } from '../../hooks/useNotifications';
import { styles } from './NotificationDropdown.styles';
import { NotificationDropdownItem } from './NotificationDropdownItem';

interface NotificationDropdownProps {
  visible: boolean;
  onClose: () => void;
  onSeeAll: () => void;
  onNotificationPress: (notification: InAppNotification) => void;
  anchorPosition?: { x: number; y: number };
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  visible,
  onClose,
  onSeeAll,
  onNotificationPress,
}) => {
  const { colors } = useAppTheme();
  const { data, isLoading, refetch } = useGetNotifications({ limit: 5 });
  const { mutate: markAsRead } = useMarkAsRead();
  const notifications = data?.data || [];

  const handleNotificationPress = (notification: InAppNotification) => {
    if (!notification.isRead) markAsRead(notification._id);
    onNotificationPress(notification);
    onClose();
  };

  const handleMarkAllRead = () => {
    notifications.forEach((n) => { if (!n.isRead) markAsRead(n._id); });
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />

          <TouchableWithoutFeedback>
            <Animated.View style={styles.container} entering={SlideInDown.springify().damping(15)} exiting={SlideOutUp.duration(200)}>
              <Surface style={[styles.surface, { backgroundColor: colors.background.card }]} elevation={4}>
                <View style={styles.header}>
                  <Text style={[styles.title, { color: colors.text.primary, fontFamily: Fonts.bold }]}>Notifications</Text>
                  <View style={styles.headerActions}>
                    <Pressable onPress={handleMarkAllRead} style={styles.actionButton}>
                      <MaterialCommunityIcons name="check-all" size={20} color={colors.primary.main} />
                    </Pressable>
                    <Pressable onPress={onClose} style={styles.actionButton}>
                      <MaterialCommunityIcons name="close" size={20} color={colors.text.secondary} />
                    </Pressable>
                  </View>
                </View>

                <Divider />

                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <Text style={{ color: colors.text.secondary }}>Loading...</Text>
                  </View>
                ) : notifications.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons name="bell-off-outline" size={40} color={colors.text.disabled} />
                    <Text style={[styles.emptyText, { color: colors.text.secondary, fontFamily: Fonts.medium }]}>Aucune notification</Text>
                  </View>
                ) : (
                  <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                    {notifications.map((notification, index) => (
                      <NotificationDropdownItem
                        key={notification._id}
                        notification={notification}
                        onPress={() => handleNotificationPress(notification)}
                        isLast={index === notifications.length - 1}
                      />
                    ))}
                  </ScrollView>
                )}

                <Divider />
                <Pressable onPress={() => { onSeeAll(); onClose(); }} style={styles.footer}>
                  <Text style={[styles.seeAllText, { color: colors.primary.main, fontFamily: Fonts.medium }]}>Voir tout</Text>
                  <MaterialCommunityIcons name="arrow-right" size={16} color={colors.primary.main} />
                </Pressable>
              </Surface>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationDropdown;
