import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetAirwayBillById, useUpdateAirwayBillStatus, useDeleteAirwayBill } from '../../hooks/useAirwayBills';
import { useGetCargoBagsByAwb, useCreateCargoBag, useUpdateCargoBagStatus, useAddGoodsToCargoBag } from '../../hooks/useCargoBags';
import { AirwayBill, AirwayBillStatus, AirwayBillConsignee, CargoBag, CargoBagStatus } from '../../types';

const STATUS_TRANSITIONS: Record<AirwayBillStatus, AirwayBillStatus[]> = {
  CREATED: ['PACKING', 'READY_FOR_DEPARTURE'],
  PACKING: ['CREATED', 'READY_FOR_DEPARTURE'],
  READY_FOR_DEPARTURE: ['PACKING', 'IN_TRANSIT'],
  IN_TRANSIT: ['ARRIVED'],
  ARRIVED: ['READY_FOR_PICKUP'],
  READY_FOR_PICKUP: ['DELIVERED'],
  DELIVERED: [],
};

const STATUS_LABELS: Record<AirwayBillStatus, string> = {
  CREATED: 'Créé',
  PACKING: 'Préparation',
  READY_FOR_DEPARTURE: 'Prêt au départ',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
};

export const useAirwayBillDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AirwayBillDetail'>>();
  const { airwayBillId } = route.params;
  const { colors } = useAppTheme();

  const { data, isLoading, refetch: refetchAwb } = useGetAirwayBillById(airwayBillId);
  const updateStatusMutation = useUpdateAirwayBillStatus();
  const deleteMutation = useDeleteAirwayBill();
  const [menuVisible, setMenuVisible] = useState(false);

  const { data: cargoBagsData, isLoading: isLoadingCargoBags, isFetching: isFetchingCargoBags, refetch: refetchCargoBags } = useGetCargoBagsByAwb(airwayBillId);
  const createCargoBagMutation = useCreateCargoBag();
  const updateCargoBagStatusMutation = useUpdateCargoBagStatus();
  const addGoodsToCargoBagMutation = useAddGoodsToCargoBag();
  const [createBagVisible, setCreateBagVisible] = useState(false);

  const airwayBill = data?.data?.airwayBill as AirwayBill | undefined;
  const cargoBags = useMemo(() => (cargoBagsData?.data?.cargoBags || []) as CargoBag[], [cargoBagsData]);
  const goodsList = useMemo(() => (airwayBill?.goodsIds || []) as any[], [airwayBill]);

  const flightLabel = useMemo(
    () => [airwayBill?.airline, airwayBill?.flightNumber].filter(Boolean).join(' · ') || 'Vol à confirmer',
    [airwayBill]
  );
  const routeLabel = useMemo(
    () =>
      airwayBill?.departureAirport && airwayBill?.arrivalAirport
        ? `${airwayBill.departureAirport} → ${airwayBill.arrivalAirport}`
        : 'Route à confirmer',
    [airwayBill]
  );
  const consignee = useMemo(
    () => (typeof airwayBill?.consigneeId === 'object' ? airwayBill.consigneeId : null) as AirwayBillConsignee | null,
    [airwayBill]
  );
  const nextStatuses = useMemo(() => (airwayBill ? STATUS_TRANSITIONS[airwayBill.status] || [] : []), [airwayBill]);

  const statusColors = useMemo(
    () => ({
      CREATED: colors.neutral[500],
      PACKING: colors.primary[500],
      READY_FOR_DEPARTURE: colors.accent.gold,
      IN_TRANSIT: colors.status.info,
      ARRIVED: colors.status.success,
      READY_FOR_PICKUP: colors.accent.mint,
      DELIVERED: colors.neutral[400],
    }),
    [colors]
  );

  const handleStatusChange = useCallback(
    async (newStatus: AirwayBillStatus) => {
      setMenuVisible(false);
      try {
        await updateStatusMutation.mutateAsync({ id: airwayBillId, status: newStatus });
      } catch {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut');
      }
    },
    [airwayBillId, updateStatusMutation]
  );

  const handleDelete = useCallback(() => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette lettre de transport ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMutation.mutateAsync(airwayBillId);
            navigation.goBack();
          } catch {
            Alert.alert('Erreur', 'Impossible de supprimer');
          }
        },
      },
    ]);
  }, [airwayBillId, deleteMutation, navigation]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);
  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);
  const handleAssignPress = useCallback(
    () => navigation.navigate('AssignAirwayGoods', { airwayBillId }),
    [navigation, airwayBillId]
  );

  const handleBagPress = useCallback(
    (cargoBagId: string) => navigation.navigate('CargoBagDetail', { cargoBagId, airwayBillId }),
    [navigation, airwayBillId]
  );

  const handleRefreshCargoBags = useCallback(() => {
    refetchCargoBags();
    refetchAwb();
  }, [refetchCargoBags, refetchAwb]);

  const isRefreshingCargoBags = isFetchingCargoBags && !isLoadingCargoBags;

  const handleCreateBag = useCallback(
    async (notes: string) => {
      try {
        await createCargoBagMutation.mutateAsync({ awbId: airwayBillId, notes });
        setCreateBagVisible(false);
      } catch {
        Alert.alert('Erreur', 'Impossible de créer le sac de cargo');
      }
    },
    [airwayBillId, createCargoBagMutation]
  );

  const handleBagStatusChange = useCallback(
    async (bagId: string, newStatus: CargoBagStatus) => {
      try {
        await updateCargoBagStatusMutation.mutateAsync({ id: bagId, status: newStatus });
      } catch {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut du sac');
      }
    },
    [updateCargoBagStatusMutation]
  );

  const handleAssignGoodsToBag = useCallback(
    async (bagId: string, goodsIds: string[]) => {
      try {
        await addGoodsToCargoBagMutation.mutateAsync({ id: bagId, input: { goodsIds } });
      } catch {
        Alert.alert('Erreur', "Impossible d'assigner les marchandises au sac");
      }
    },
    [addGoodsToCargoBagMutation]
  );

  return {
    airwayBill,
    isLoading,
    goodsList,
    flightLabel,
    routeLabel,
    consignee,
    nextStatuses,
    menuVisible,
    statusLabels: STATUS_LABELS,
    statusColors,
    handleStatusChange,
    handleDelete,
    handleBack,
    openMenu,
    closeMenu,
    handleAssignPress,
    airwayBillId,
    isUpdatingStatus: updateStatusMutation.isPending,
    cargoBags,
    isLoadingCargoBags,
    createBagVisible,
    setCreateBagVisible,
    handleCreateBag,
    handleBagStatusChange,
    handleAssignGoodsToBag,
    isCreatingBag: createCargoBagMutation.isPending,
    handleBagPress,
    handleRefreshCargoBags,
    isRefreshingCargoBags,
  };
};
