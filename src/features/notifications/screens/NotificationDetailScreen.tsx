/**
 * NotificationDetailScreen
 * SRP: Layout composition ONLY
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@src/components/Header/Header';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useNotificationDetail } from '../hooks/useNotificationDetail';
import { NotificationDetailIconCard } from '../components/NotificationDetailIconCard';
import { NotificationDetailContentCard } from '../components/NotificationDetailContentCard';
import { NotificationDetailDataCard } from '../components/NotificationDetailDataCard';
import { NotificationDetailActions } from '../components/NotificationDetailActions';

type NotificationDetailScreenProps = RootStackScreenProps<'NotificationDetail'>;

const NotificationDetailScreen: React.FC<NotificationDetailScreenProps> = ({ navigation, route }) => {
  const { colors } = useAppTheme();
  const { notification } = route.params;
  const { createdAt, showActionButton, handleActionPress, handleDelete } = useNotificationDetail(
    notification,
    navigation
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]} edges={['top']}>
      <Header title="Détail" navigation={navigation} showNotificationBell />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <NotificationDetailIconCard type={notification.type} category={notification.category} />
        <NotificationDetailContentCard notification={notification} createdAt={createdAt} />
        <NotificationDetailDataCard data={notification.data} />
        <NotificationDetailActions
          actionLabel={notification.actionLabel}
          showActionButton={showActionButton}
          onActionPress={handleActionPress}
          onDelete={handleDelete}
        />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default NotificationDetailScreen;
