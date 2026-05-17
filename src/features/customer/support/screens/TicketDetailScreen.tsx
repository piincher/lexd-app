/**
 * Ticket Detail Screen
 * Shows ticket details with chat-like message interface
 */

import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Screen } from '@src/shared/ui';
import { useTicketDetailScreen } from './hooks/useTicketDetailScreen';
import { styles } from './TicketDetailScreen.styles';
import { TicketDetailSkeleton } from '../components/TicketDetailSkeleton';
import { TicketDetailHeader } from './components/TicketDetailHeader';
import { TicketDetailContent } from './components/TicketDetailContent';
import { ErrorState } from './components/ErrorState';

export const TicketDetailScreen: React.FC<RootStackScreenProps<'TicketDetail'>> = ({
  navigation,
  route,
}) => {
  const { ticketId } = route.params;
  const { ticket, isLoading, isError, refetch, isSending, isRating, handlers } =
    useTicketDetailScreen(ticketId);

  if (isLoading) {
    return (
      <Screen header={<TicketDetailHeader onBack={() => navigation.goBack()} />} scrollable={false}>
        <TicketDetailSkeleton />
      </Screen>
    );
  }

  if (isError || !ticket) {
    return (
      <Screen header={<TicketDetailHeader onBack={() => navigation.goBack()} />} scrollable={false}>
        <ErrorState onRetry={refetch} />
      </Screen>
    );
  }

  return (
    <Screen
      header={<TicketDetailHeader ticket={ticket} onBack={() => navigation.goBack()} />}
      scrollable={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TicketDetailContent
          ticket={ticket}
          onRefresh={refetch}
          onSendMessage={handlers.handleSendMessage}
          isSending={isSending}
          onRate={handlers.handleRate}
          isRating={isRating}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default TicketDetailScreen;
