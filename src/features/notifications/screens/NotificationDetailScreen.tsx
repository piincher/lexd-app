/**
 * NotificationDetailScreen
 * SRP: Layout composition ONLY
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@src/components/Header/Header';
import { useNotificationDetailScreen } from './hooks/useNotificationDetailScreen';
import { useNotificationDetailScreenStyles } from './NotificationDetailScreen.styles';
import { NotificationDetailIconCard } from '../components/NotificationDetailIconCard';
import { NotificationDetailContentCard } from '../components/NotificationDetailContentCard';
import { NotificationDetailDataCard } from '../components/NotificationDetailDataCard';
import { NotificationDetailActions } from '../components/NotificationDetailActions';

const NotificationDetailScreen: React.FC = () => {
  const {
    notification,
    createdAt,
    showActionButton,
    handlers,
  } = useNotificationDetailScreen();

  const styles = useNotificationDetailScreenStyles();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Détail" showNotificationBell />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <NotificationDetailIconCard type={notification.type} category={notification.category} />
        <NotificationDetailContentCard notification={notification} createdAt={createdAt} />
        <NotificationDetailDataCard data={notification.data} />
        <NotificationDetailActions
          actionLabel={notification.actionLabel}
          showActionButton={showActionButton}
          onActionPress={handlers.handleActionPress}
          onDelete={handlers.handleDelete}
        />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetailScreen;
