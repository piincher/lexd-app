import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationEventDetailBlock } from '../components';
import { useNotificationEventDetail } from '../hooks';
import {
  formatNotificationEventDate,
  getNotificationEventUserLabel,
} from '../utils/formatNotificationEvent';
import { createNotificationEventDetailStyles } from './NotificationEventDetailScreen.styles';

const NotificationEventDetailScreen: React.FC<RootStackScreenProps<'NotificationEventDetail'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useAppTheme();
  const styles = createNotificationEventDetailStyles(colors);
  const { data, isLoading, isError } = useNotificationEventDetail(route.params.notificationEventId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>Détail notification</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator style={styles.centered} color={colors.primary.main} />
      ) : isError || !data ? (
        <View style={styles.centered}>
          <Text style={styles.stateText}>Événement introuvable.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <NotificationEventDetailBlock
            title="Message"
            rows={[
              { label: 'Titre', value: data.title },
              { label: 'Message', value: data.body },
              { label: 'Utilisateur', value: getNotificationEventUserLabel(data) },
              { label: 'Date', value: formatNotificationEventDate(data.createdAt) },
            ]}
          />
          <NotificationEventDetailBlock
            title="Dispatch"
            rows={[
              { label: 'Statut', value: data.status },
              { label: 'Type', value: data.eventName || data.type },
              { label: 'Template', value: data.templateKey },
              { label: 'Dispatch ID', value: data.dispatchId },
              { label: 'Via', value: data.sentVia },
            ]}
          />
          <NotificationEventDetailBlock
            title="Canaux"
            rows={[
              { label: 'Push', value: data.pushStatus },
              { label: 'In-app', value: data.inAppStatus },
              { label: 'WhatsApp', value: data.whatsappStatus },
              { label: 'Échecs', value: data.failureReason || data.whatsappFailureReason },
              { label: 'Tentatives', value: data.retryCount },
            ]}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotificationEventDetailScreen;
