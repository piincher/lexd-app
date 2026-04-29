import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';
import { useQuery, useMutation } from '@tanstack/react-query';
import { SMSKEY } from '@src/constants/queryKey';
import { Calendar, useCalendar } from '@src/components/Calendar/Calendar';
import { fetchAllUsersForSms, getOrdersByDepartureDate, fetchSmsBalance } from '../api/smsApi';
import { useSendNotificationSms } from './useNotifications';

const SMS_CHAR_LIMIT = 160;

export type SourceMode = 'all' | 'date';

export const useSendSmsScreen = () => {
  const [mode, setMode] = useState<SourceMode>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sentCountRef = useRef(0);

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({ queryKey: ['users'], queryFn: fetchAllUsersForSms });
  const { data: smsData } = useQuery({ queryKey: [SMSKEY], queryFn: fetchSmsBalance, enabled: true });
  const { mutate: fetchByDate, data: dateData, isPending: isFetchingByDate, reset: resetDateData } = useMutation({ mutationFn: getOrdersByDepartureDate });
  const { mutate: sendSms, isPending: isSending, isSuccess: isSendSuccess, reset: resetSendState } = useSendNotificationSms();
  const calendar = useCalendar();
  const date = calendar.date as Date | undefined;

  useEffect(() => {
    if (!isSendSuccess) return;
    sentCountRef.current = selectedIds.size;
    setShowSuccess(true);
    const timer = setTimeout(() => { setShowSuccess(false); setSelectedIds(new Set()); setMessage(''); setSearch(''); resetSendState(); }, 2500);
    return () => clearTimeout(timer);
  }, [isSendSuccess, selectedIds.size, resetSendState]);

  const smsBalance = smsData?.reduce((sum, sub) => sum + (sub.availableUnits || 0), 0) || 0;
  const hasExpiringSoon = smsData?.some((sub) => sub.isExpiringSoon) || false;
  const hasExpired = smsData?.some((sub) => sub.isExpired) || false;

  const allRecipients = useMemo(() => {
    if (mode === 'date') return dateData?.map((item: any) => ({ id: item.clientPhone, name: item.clientName, phone: item.clientPhone })) || [];
    return usersData?.filter((u: any) => u.phoneNumber && !u.blocked?.isBlocked).map((u: any) => ({ id: u.phoneNumber, name: `${u.firstName} ${u.lastName}`.trim(), phone: u.phoneNumber })) || [];
  }, [mode, usersData, dateData]);

  const dateLabel = date instanceof Date ? date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const handleModeChange = useCallback((newMode: SourceMode) => { setMode(newMode); setSelectedIds(new Set()); setSearch(''); }, []);
  const handleToggle = useCallback((id: string) => { setSelectedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; }); }, []);
  const handleSelectAll = useCallback(() => { const filtered = allRecipients.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search)); setSelectedIds(new Set(filtered.map(r => r.id))); }, [allRecipients, search]);
  const handleDeselectAll = useCallback(() => { setSelectedIds(new Set()); }, []);
  const handleFetchByDate = useCallback(() => { if (!date || !(date instanceof Date)) return; const departureDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1); fetchByDate({ departureDate }); }, [date, fetchByDate]);
  const handleOpenCalendar = useCallback(() => { resetDateData(); calendar.setOpen(true); }, [resetDateData, calendar.setOpen]);
  const handleSendPress = useCallback(() => { if (selectedIds.size === 0) { showMessage({ message: 'Selectionnez au moins un destinataire', type: 'warning' }); return; } if (!message.trim()) { showMessage({ message: 'Ecrivez un message', type: 'warning' }); return; } Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowConfirmation(true); }, [selectedIds, message]);
  const handleConfirmSend = useCallback(() => { if (isSending) return; setShowConfirmation(false); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); sendSms({ phoneNumbers: Array.from(selectedIds), message: message.trim() }); }, [selectedIds, message, sendSms, isSending]);

  const totalSms = (message.length === 0 ? 0 : Math.ceil(message.length / SMS_CHAR_LIMIT)) * selectedIds.size;

  return {
    mode, setMode: handleModeChange, selectedIds, handleToggle, handleSelectAll, handleDeselectAll,
    search, setSearch, message, setMessage, showConfirmation, setShowConfirmation,
    showSuccess, sentCount: sentCountRef.current, isLoadingUsers, isFetchingByDate, isSending,
    smsData, smsBalance, hasExpiringSoon, hasExpired, allRecipients, dateLabel,
    handleOpenCalendar, handleFetchByDate, handleSendPress, handleConfirmSend, totalSms,
    calendar: { open: calendar.open, date: calendar.date, onConfirmSingle: calendar.onConfirmSingle, onDismissSingle: calendar.onDismissSingle },
  };
};
