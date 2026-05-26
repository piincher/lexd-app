import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import type { RootStackParamList } from '@src/navigations/type';
import { navigationRef } from '@src/navigations/navigationRef';
import { useAuth } from '@src/store/Auth';
import { isAdminRole } from '@src/shared/lib/roles';
import { useGetCurrentUser, useBalance } from '../../hooks/useProfile';
import { useCertificateProgress } from '../../hooks/useCertificate';

const ADMIN_PROFILE_ROUTE_MAP: Record<string, keyof RootStackParamList> = {
  PastOrders: 'AdminPastOrders',
  Orders: 'AllOrders',
  MyGoods: 'AdminGoodsList',
  MyContainers: 'ContainerList',
  TicketList: 'AdminTicketList',
};

export const useProfileScreen = () => {
  const logout = useAuth((state) => state.logOut);
  const role = useAuth((state) => state.user?.role);
  const { data, refetch: refetchUser } = useGetCurrentUser();
  const { data: balanceData, refetch: refetchBalance } = useBalance();
  const {
    data: certificateProgress,
    isLoading: isCertLoading,
    error: certError,
    refetch: refetchCert,
  } = useCertificateProgress();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchUser(), refetchBalance(), refetchCert()]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchUser, refetchBalance, refetchCert]);

  const handleLogout = useCallback(() => {
    Alert.alert('Se déconnecter', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Se déconnecter', style: 'destructive', onPress: logout },
    ]);
  }, [logout]);

  const handleNavigate = useCallback((screen: string) => {
    const target = isAdminRole(role) ? ADMIN_PROFILE_ROUTE_MAP[screen] ?? screen : screen;
    if (navigationRef.isReady()) navigationRef.navigate(target as never);
  }, [role]);

  return {
    user: data,
    balanceFormatted: balanceData?.balance?.toLocaleString('fr-FR') ?? '0',
    certificateProgress,
    isCertLoading,
    certError,
    refreshing,
    onRefresh,
    refetchCert,
    handleLogout,
    handleNavigate,
  };
};
