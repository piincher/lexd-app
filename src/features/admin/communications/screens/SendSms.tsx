/**
 * SendSmsScreen
 * SRP: Layout composition ONLY
 */

import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Calendar } from '@src/components/Calendar/Calendar';
import { useSendSmsScreen } from '../hooks/useSendSmsScreen';
import { SmsBalanceHeader } from '../components/SmsBalanceHeader';
import { SmsSubscriptionList } from '../components/SmsSubscriptionList';
import { RecipientSelector } from '../components/RecipientSelector';
import { MessageComposer } from '../components/MessageComposer';
import { SendConfirmationModal } from '../components/SendConfirmationModal';
import { SendSmsSuccessOverlay } from '../components/SendSmsSuccessOverlay';
import { createStyles } from './SendSms.styles';

const SendSms = ({ navigation }: RootStackScreenProps<'SendSms'>) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const s = useSendSmsScreen();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SmsBalanceHeader
        smsBalance={s.smsBalance}
        hasExpiringSoon={s.hasExpiringSoon}
        hasExpired={s.hasExpired}
        onBack={() => navigation.goBack()}
      />

      {s.smsData && s.smsData.length > 0 && (
        <View style={styles.subscriptionSection}>
          <SmsSubscriptionList subscriptions={s.smsData} />
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.content}>
          <View style={[styles.recipientSection, styles.recipientSectionWithSubs]}>
            <RecipientSelector
              mode={s.mode}
              onModeChange={s.setMode}
              recipients={s.allRecipients}
              selectedIds={s.selectedIds}
              onToggle={s.handleToggle}
              onSelectAll={s.handleSelectAll}
              onDeselectAll={s.handleDeselectAll}
              search={s.search}
              onSearchChange={s.setSearch}
              isLoading={s.mode === 'all' ? s.isLoadingUsers : s.isFetchingByDate}
              dateLabel={s.dateLabel}
              onOpenCalendar={s.handleOpenCalendar}
              onFetchByDate={s.handleFetchByDate}
              isFetchingByDate={s.isFetchingByDate}
            />
          </View>

          <MessageComposer
            message={s.message}
            onMessageChange={s.setMessage}
            recipientCount={s.selectedIds.size}
            isSending={s.isSending}
            onSend={s.handleSendPress}
          />
        </View>
      </KeyboardAvoidingView>

      <Calendar
        open={s.calendar.open}
        onDismissSingle={s.calendar.onDismissSingle}
        date={s.calendar.date}
        onConfirmSingle={s.calendar.onConfirmSingle}
      />

      <SendConfirmationModal
        visible={s.showConfirmation}
        recipientCount={s.selectedIds.size}
        smsCount={s.totalSms}
        messagePreview={s.message}
        isSending={s.isSending}
        onConfirm={s.handleConfirmSend}
        onCancel={() => s.setShowConfirmation(false)}
      />

      <SendSmsSuccessOverlay visible={s.showSuccess} sentCount={s.sentCount} />
    </SafeAreaView>
  );
};

export default SendSms;
