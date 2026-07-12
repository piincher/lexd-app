import { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { openWhatsApp } from '@src/shared/lib/openWhatsApp';
import type { AtRiskCustomer, AtRiskFilter } from '../types';

type TriggerWinBack = (variables: { userId: string; triggerType: string }) => Promise<boolean>;

export function useAtRiskScreen(triggerWinBack: TriggerWinBack) {
  const [search, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeFilter, setFilterValue] = useState<AtRiskFilter>('all');
  const [page, setPage] = useState(1);
  const [detailCustomer, setDetailCustomer] = useState<AtRiskCustomer | null>(null);
  const [winBackCustomer, setWinBackCustomer] = useState<AtRiskCustomer | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const setSearch = useCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  const setActiveFilter = useCallback((value: AtRiskFilter) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const queryParams = useMemo(() => ({
    days: 60,
    page,
    limit: 20,
    q: debouncedSearch || undefined,
    risk: activeFilter,
  }), [activeFilter, debouncedSearch, page]);

  const handleWhatsApp = useCallback(async (customer: AtRiskCustomer) => {
    if (!customer.phoneNumber) return;
    try {
      await openWhatsApp(customer.phoneNumber, `Bonjour ${customer.firstName || ''}, ChinaLink Express vous remercie pour votre fidélité.`);
    } catch {
      showMessage({ message: 'WhatsApp indisponible', type: 'danger' });
    }
  }, []);

  const handleCall = useCallback(async (customer: AtRiskCustomer) => {
    if (!customer.phoneNumber) return;
    try {
      await Linking.openURL(`tel:${customer.phoneNumber}`);
    } catch {
      showMessage({ message: 'Appel impossible', type: 'danger' });
    }
  }, []);

  const handleWinBack = useCallback(async (userId: string, triggerType: string) => {
    if (await triggerWinBack({ userId, triggerType })) setWinBackCustomer(null);
  }, [triggerWinBack]);

  return {
    search, setSearch, activeFilter, setActiveFilter, page, setPage, queryParams,
    detailCustomer, setDetailCustomer, winBackCustomer, setWinBackCustomer,
    handleWhatsApp, handleCall, handleWinBack,
  };
}
