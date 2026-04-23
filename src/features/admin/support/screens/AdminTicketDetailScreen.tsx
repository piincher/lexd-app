import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Linking, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAdminTicket, useAdminTicketReply, useAdminTicketStatusUpdate } from '../hooks';
import type { AdminTicketStatus } from '../types';
import {
  AdminTicketEmptyState, AdminTicketHeader, AdminTicketInfoCard,
  AdminTicketLoadingState, AdminTicketMessageList, AdminTicketReplyBox,
  AdminTicketStatusControl,
} from '../components';

export const AdminTicketDetailScreen: React.FC<RootStackScreenProps<'AdminTicketDetail'>> = ({ navigation, route }) => {
  const { colors } = useAppTheme();
  const { ticketId } = route.params;
  const { data: ticket, isLoading, isError, refetch, isFetching } = useAdminTicket(ticketId);
  const replyMutation = useAdminTicketReply();
  const statusMutation = useAdminTicketStatusUpdate();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);
  const handleReply = async (message: string) => {
    try {
      await replyMutation.mutateAsync({ ticketId, message });
    } catch {
      showMessage({ message: 'Erreur', description: "Impossible d'envoyer la réponse.", type: 'danger' });
    }
  };
  const handleStatus = async (status: AdminTicketStatus) => {
    try {
      await statusMutation.mutateAsync({ ticketId, status });
      showMessage({ message: 'Ticket mis à jour', type: 'success' });
    } catch {
      showMessage({ message: 'Erreur', description: 'Impossible de changer le statut.', type: 'danger' });
    }
  };
  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      showMessage({ message: 'Erreur', description: "Impossible d'ouvrir l'appel.", type: 'danger' });
    });
  };
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
        <AdminTicketHeader title="Ticket support" onBack={navigation.goBack} />
        <AdminTicketLoadingState label="Chargement du ticket..." />
      </SafeAreaView>
    );
  }
  if (isError || !ticket) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
        <AdminTicketHeader title="Ticket support" onBack={navigation.goBack} onRefresh={refetch} />
        <AdminTicketEmptyState title="Ticket introuvable" message="Le ticket demandé n'est pas disponible." />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
      <AdminTicketHeader title={ticket.ticketNumber} subtitle={ticket.subject} onBack={navigation.goBack} onRefresh={handleRefresh} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <AdminTicketMessageList
          messages={ticket.messages}
          header={<AdminTicketInfoCard ticket={ticket} onCallCustomer={handleCall} />}
          refreshing={refreshing || isFetching}
          onRefresh={handleRefresh}
        />
        <View>
          <AdminTicketStatusControl status={ticket.status} isPending={statusMutation.isPending} onChangeStatus={handleStatus} />
          <AdminTicketReplyBox
            isPending={replyMutation.isPending}
            disabled={ticket.status === 'CLOSED'}
            onSend={handleReply}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});

export default AdminTicketDetailScreen;
