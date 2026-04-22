import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGetGoodsById, useDeleteGoods, useUpdateGoodsStatus } from '../../../hooks/useGoods';
import { useAssignGoodsToContainer } from '@src/features/admin/containers/hooks/useContainers';
import { useGetAllContainers } from '@src/features/admin/containers/hooks/useContainers';
import { useGetAllAirwayBills, useAssignGoodsToAirwayBill, useRemoveGoodsFromAirwayBill } from '@src/features/admin/airwayBills/hooks/useAirwayBills';

// Utility functions
const formatCurrency = (amount: number): string => {
  return amount?.toLocaleString('fr-FR') || '0';
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

export const useGoodsDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { goodsId } = route.params as { goodsId: string };
  
  const { data, isPending, isFetching, refetch } = useGetGoodsById(goodsId);
  const deleteMutation = useDeleteGoods();
  const updateStatusMutation = useUpdateGoodsStatus();

  const [menuVisible, setMenuVisible] = useState(false);
  const [assignDialogVisible, setAssignDialogVisible] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [selectedAirwayBillId, setSelectedAirwayBillId] = useState<string | null>(null);

  const goods = data?.data?.goods || data?.data;
  const isAirShipping = goods?.shippingMode === 'AIR';

  // Container data (for SEA goods)
  const { data: containersData } = useGetAllContainers({ status: ['BOOKED', 'LOADING'] }, { enabled: !isAirShipping });
  const assignContainerMutation = useAssignGoodsToContainer();

  const containers = Array.isArray(containersData?.data)
    ? containersData?.data
    : containersData?.data?.containers || [];
  const hasContainers = containers.length > 0;

  // Airway bill data (for AIR goods)
  const { data: airwayBillsData } = useGetAllAirwayBills({ status: 'CREATED' }, { enabled: isAirShipping });
  const assignAirwayBillMutation = useAssignGoodsToAirwayBill();

  const airwayBills = airwayBillsData?.data?.airwayBills || [];
  const hasAirwayBills = airwayBills.length > 0;

  const removeAirwayBillMutation = useRemoveGoodsFromAirwayBill();

  const client = goods && typeof goods.clientId === 'object' ? goods.clientId : null;
  const container = goods && typeof goods.containerId === 'object' ? goods.containerId : null;
  const airwayBill = goods && typeof goods.airwayBillId === 'object' ? goods.airwayBillId : null;

  const canUnassignFromAwb = airwayBill && ['CREATED', 'PACKING'].includes(airwayBill.status);
  const balanceDue = goods ? (goods.totalCost || 0) - (goods.amountPaid || 0) : 0;
  const hasQRCode = !!goods?.qrCodeImageUrl;

  const handleAssignToContainer = useCallback(() => {
    if (!selectedContainerId) {
      Alert.alert("Erreur", "Veuillez sélectionner un container");
      return;
    }
    if (!goods) return;
    
    assignContainerMutation.mutate(
      { containerId: selectedContainerId, data: { goodsIds: [goods._id] } },
      {
        onSuccess: () => {
          Alert.alert("Succès", "Marchandise assignée au container");
          setAssignDialogVisible(false);
          setSelectedContainerId(null);
          refetch();
        },
        onError: (error: any) => {
          Alert.alert("Erreur", error?.message || "Impossible d'assigner la marchandise");
        }
      }
    );
  }, [selectedContainerId, goods, assignContainerMutation, refetch]);

  const handleAssignToAirwayBill = useCallback(() => {
    if (!selectedAirwayBillId) {
      Alert.alert("Erreur", "Veuillez sélectionner une lettre de transport");
      return;
    }
    if (!goods) return;
    
    assignAirwayBillMutation.mutate(
      { id: selectedAirwayBillId, input: { goodsIds: [goods._id] } },
      {
        onSuccess: () => {
          Alert.alert("Succès", "Marchandise assignée à la lettre de transport");
          setAssignDialogVisible(false);
          setSelectedAirwayBillId(null);
          refetch();
        },
        onError: (error: any) => {
          Alert.alert("Erreur", error?.message || "Impossible d'assigner la marchandise");
        }
      }
    );
  }, [selectedAirwayBillId, goods, assignAirwayBillMutation, refetch]);

  const handleUnassignFromAirwayBill = useCallback(() => {
    if (!airwayBill?._id || !goods) return;
    Alert.alert(
      "Confirmer le désassignement",
      `Retirer cette marchandise de la lettre de transport ${airwayBill.awbNumber} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Retirer",
          style: "destructive",
          onPress: () => {
            removeAirwayBillMutation.mutate(
              { id: airwayBill._id, goodsId: goods._id },
              {
                onSuccess: () => {
                  Alert.alert("Succès", "Marchandise retirée de la lettre de transport");
                  refetch();
                },
                onError: (error: any) => {
                  Alert.alert("Erreur", error?.message || "Impossible de retirer la marchandise");
                }
              }
            );
          }
        }
      ]
    );
  }, [airwayBill, goods, removeAirwayBillMutation, refetch]);

  const handleAssignPress = useCallback(() => {
    setMenuVisible(false);
    if (isAirShipping) {
      if (!hasAirwayBills) {
        Alert.alert(
          "Aucune lettre de transport disponible",
          "Veuillez d'abord créer une lettre de transport pour assigner cette marchandise.",
          [
            { text: "Annuler", style: "cancel" },
            { 
              text: "Créer AWB", 
              onPress: () => navigation.navigate('CreateAirwayBill' as never)
            }
          ]
        );
        return;
      }
    } else {
      if (!hasContainers) {
        Alert.alert(
          "Aucun container disponible",
          "Veuillez d'abord créer un container pour assigner cette marchandise.",
          [
            { text: "Annuler", style: "cancel" },
            { 
              text: "Créer Container", 
              onPress: () => navigation.navigate('CreateContainer' as never)
            }
          ]
        );
        return;
      }
    }
    setAssignDialogVisible(true);
  }, [isAirShipping, hasAirwayBills, hasContainers, navigation]);

  const getPaymentStatusColor = useCallback(() => {
    if (!goods) return '#757575';
    if (goods.paymentStatus === 'PAID') return '#4CAF50';
    if (goods.paymentStatus === 'PARTIAL') return '#FF9800';
    return '#F44336';
  }, [goods]);

  const handleDelete = useCallback(() => {
    if (!goods) return;
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette marchandise ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          style: "destructive",
          onPress: () => {
            deleteMutation.mutate({ id: goods._id }, {
              onSuccess: () => navigation.goBack(),
            });
          }
        }
      ]
    );
  }, [goods, deleteMutation, navigation]);

  const handleStatusUpdate = useCallback((status: string) => {
    if (!goods) return;
    Alert.alert(
      'Confirmer le changement de statut',
      `Passer cette marchandise au statut "${status}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => updateStatusMutation.mutate({ id: goods._id, status }) },
      ]
    );
  }, [goods, updateStatusMutation]);

  const handleShareQR = useCallback(() => {
    // TODO: Implement QR sharing
    Alert.alert("Info", "Partage du QR code à implémenter");
  }, []);

  const handleNavigateToEdit = useCallback(() => {
    navigation.navigate('EditGoods' as never, { goodsId } as never);
  }, [navigation, goodsId]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    state: {
      goods,
      client,
      container,
      balanceDue,
      hasQRCode,
      canUnassignFromAwb,
    },
    loading: {
      isLoading: isPending,
      isRefetching: isFetching && !isPending,
      refetch,
    },
    dialogs: {
      menuVisible,
      assignDialogVisible,
      selectedContainerId,
      selectedAirwayBillId,
      setMenuVisible,
      setAssignDialogVisible,
      setSelectedContainerId,
      setSelectedAirwayBillId,
    },
    containers: {
      containers,
      hasContainers,
    },
    airwayBills: {
      airwayBills,
      hasAirwayBills,
    },
    mutations: {
      isAssigning: assignContainerMutation.isPending || assignAirwayBillMutation.isPending,
      isUnassigning: removeAirwayBillMutation.isPending,
    },
    actions: {
      handleAssignToContainer,
      handleAssignToAirwayBill,
      handleUnassignFromAirwayBill,
      handleAssignPress,
      handleDelete,
      handleStatusUpdate,
      handleShareQR,
      handleNavigateToEdit,
      handleGoBack,
      getPaymentStatusColor,
      formatDate,
      formatCurrency,
    },
  };
};
