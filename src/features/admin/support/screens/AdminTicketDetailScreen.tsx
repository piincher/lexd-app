import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAdminTicketDetailScreen } from './hooks';
import { createStyles } from './AdminTicketDetailScreen.styles';
import {
  AdminTicketEmptyState, AdminTicketHeader, AdminTicketInfoCard,
  AdminTicketLoadingState, AdminTicketMessageList, AdminTicketReplyBox,
  AdminTicketStatusControl,
} from '../components';

export const AdminTicketDetailScreen: React.FC<RootStackScreenProps<'AdminTicketDetail'>> = ({ navigation, route }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { ticketId } = route.params;
  const { ticket, isLoading, isError, refreshing, isFetching, isReplyPending, isStatusPending, handlers } = useAdminTicketDetailScreen(ticketId);

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
        <AdminTicketHeader title="Ticket support" onBack={navigation.goBack} onRefresh={handlers.handleRefresh} />
        <AdminTicketEmptyState title="Ticket introuvable" message="Le ticket demandé n'est pas disponible." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
      <AdminTicketHeader title={ticket.ticketNumber} subtitle={ticket.subject} onBack={navigation.goBack} onRefresh={handlers.handleRefresh} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <AdminTicketMessageList
          messages={ticket.messages}
          header={<AdminTicketInfoCard ticket={ticket} onCallCustomer={handlers.handleCall} />}
          refreshing={refreshing || isFetching}
          onRefresh={handlers.handleRefresh}
        />
        <View>
          <AdminTicketStatusControl status={ticket.status} isPending={isStatusPending} onChangeStatus={handlers.handleStatus} />
          <AdminTicketReplyBox
            isPending={isReplyPending}
            disabled={ticket.status === 'CLOSED'}
            onSend={handlers.handleReply}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminTicketDetailScreen;
