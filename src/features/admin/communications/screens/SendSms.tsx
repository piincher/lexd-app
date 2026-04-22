/**
 * SendSmsScreen
 * SRP: State coordination and layout composition ONLY
 * Delegates all rendering to sub-components
 */

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useGetUsers } from '../../hooks/useGetUsers';
import { useGetOrderBaseonDate } from '../../orders/hooks/useOrderManagement';
import { useSendNotificationSms } from '../hooks/useNotifications';
import { useViewSmsBalance } from '@src/shared/hooks/useOrders';
import { Calendar, useCalendar } from '@src/components/Calendar/Calendar';

import { SmsBalanceHeader } from '../components/SmsBalanceHeader';
import { SmsSubscriptionList } from '../components/SmsSubscriptionList';
import { RecipientSelector, Recipient } from '../components/RecipientSelector';
import { MessageComposer } from '../components/MessageComposer';
import { SendConfirmationModal } from '../components/SendConfirmationModal';

const SMS_CHAR_LIMIT = 160;

type SourceMode = 'all' | 'date';

const SendSms = ({ navigation }: RootStackScreenProps<'SendSms'>) => {
  // UI state
  const [mode, setMode] = useState<SourceMode>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Data hooks
  const { data: usersData, isLoading: isLoadingUsers } = useGetUsers();
  const { data: smsData } = useViewSmsBalance(true);
  const {
    mutate: fetchByDate,
    data: dateData,
    isPending: isFetchingByDate,
    reset: resetDateData,
  } = useGetOrderBaseonDate();
  const { mutate: sendSms, isPending: isSending, isSuccess: isSendSuccess, reset: resetSendState } = useSendNotificationSms();
  const [showSuccess, setShowSuccess] = useState(false);
  const sentCountRef = useRef(0);

  // Calendar
  const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();

  // SMS balance & subscriptions
  const smsBalance = smsData?.reduce((sum, sub) => sum + (sub.availableUnits || 0), 0) || 0;
  const hasExpiringSoon = smsData?.some((sub) => sub.isExpiringSoon) || false;
  const hasExpired = smsData?.some((sub) => sub.isExpired) || false;

  // Handle send success — show overlay, then reset form
  useEffect(() => {
    if (isSendSuccess) {
      sentCountRef.current = selectedIds.size;
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setSelectedIds(new Set());
        setMessage('');
        setSearch('');
        resetSendState();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSendSuccess]);

  // Map users to unified Recipient format
  const allRecipients: Recipient[] = useMemo(() => {
    if (mode === 'date') {
      return (
        dateData?.map((item: any) => ({
          id: item.clientPhone,
          name: item.clientName,
          phone: item.clientPhone,
        })) || []
      );
    }
    return (
      usersData
        ?.filter((u: any) => u.phoneNumber && !u.blocked?.isBlocked)
        .map((u: any) => ({
          id: u.phoneNumber,
          name: `${u.firstName} ${u.lastName}`.trim(),
          phone: u.phoneNumber,
        })) || []
    );
  }, [mode, usersData, dateData]);

  // Date label
  const dateLabel = date instanceof Date
    ? date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  // Handlers
  const handleModeChange = useCallback(
    (newMode: SourceMode) => {
      setMode(newMode);
      setSelectedIds(new Set());
      setSearch('');
    },
    []
  );

  const handleToggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    const filtered = allRecipients.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search)
    );
    setSelectedIds(new Set(filtered.map((r) => r.id)));
  }, [allRecipients, search]);

  const handleDeselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const handleFetchByDate = useCallback(() => {
    if (!date || !(date instanceof Date)) return;
    const departureDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    fetchByDate({ departureDate });
  }, [date, fetchByDate]);

  const handleOpenCalendar = useCallback(() => {
    resetDateData();
    setOpen(true);
  }, [resetDateData, setOpen]);

  const handleSendPress = useCallback(() => {
    if (selectedIds.size === 0) {
      showMessage({ message: 'Selectionnez au moins un destinataire', type: 'warning' });
      return;
    }
    if (!message.trim()) {
      showMessage({ message: 'Ecrivez un message', type: 'warning' });
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowConfirmation(true);
  }, [selectedIds, message]);

  const handleConfirmSend = useCallback(() => {
    // Guard: prevent double-firing if the mutation is already in flight
    if (isSending) return;
    setShowConfirmation(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    sendSms({
      phoneNumbers: Array.from(selectedIds),
      message: message.trim(),
    });
  }, [selectedIds, message, sendSms, isSending]);

  // SMS calculation
  const smsPerRecipient = message.length === 0 ? 0 : Math.ceil(message.length / SMS_CHAR_LIMIT);
  const totalSms = smsPerRecipient * selectedIds.size;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SmsBalanceHeader
        smsBalance={smsBalance}
        hasExpiringSoon={hasExpiringSoon}
        hasExpired={hasExpired}
        onBack={() => navigation.goBack()}
      />

      {smsData && smsData.length > 0 && (
        <View style={styles.subscriptionSection}>
          <SmsSubscriptionList subscriptions={smsData} />
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
            mode={mode}
            onModeChange={handleModeChange}
            recipients={allRecipients}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            search={search}
            onSearchChange={setSearch}
            isLoading={mode === 'all' ? isLoadingUsers : isFetchingByDate}
            dateLabel={dateLabel}
            onOpenCalendar={handleOpenCalendar}
            onFetchByDate={handleFetchByDate}
            isFetchingByDate={isFetchingByDate}
          />
          </View>

          <MessageComposer
            message={message}
            onMessageChange={setMessage}
            recipientCount={selectedIds.size}
            isSending={isSending}
            onSend={handleSendPress}
          />
        </View>
      </KeyboardAvoidingView>

      <Calendar
        open={open}
        onDismissSingle={onDismissSingle}
        date={date}
        onConfirmSingle={onConfirmSingle}
      />

      <SendConfirmationModal
        visible={showConfirmation}
        recipientCount={selectedIds.size}
        smsCount={totalSms}
        messagePreview={message}
        isSending={isSending}
        onConfirm={handleConfirmSend}
        onCancel={() => setShowConfirmation(false)}
      />

      {/* Success Overlay */}
      {showSuccess && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(300)}
          style={styles.successOverlay}
        >
          <Animated.View entering={ZoomIn.springify().damping(12)} style={styles.successCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-circle" size={56} color="#10B981" />
            </View>
            <Text style={styles.successTitle}>Envoye avec succes!</Text>
            <Text style={styles.successSubtitle}>
              Message envoye a {sentCountRef.current} destinataire{sentCountRef.current > 1 ? 's' : ''}
            </Text>
          </Animated.View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  subscriptionSection: {
    maxHeight: 280,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  recipientSection: {
    flex: 1,
  },
  recipientSectionWithSubs: {
    marginTop: 4,
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  successCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16,185,129,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
  },
});

export default SendSms;
