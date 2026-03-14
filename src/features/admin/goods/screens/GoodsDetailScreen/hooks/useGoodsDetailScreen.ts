import { useState, useCallback, useMemo } from 'react';
import { Alert, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetGoodsById,
  useDeleteGoods,
  useUpdateGoodsStatus,
  useAssignGoodsToContainer,
  goodsQueryKeys,
} from '../../../hooks';
import { useGetAllContainers } from '../../../../containers/hooks';
import { Goods, GoodsStatus } from '../../../types';

type AdminGoodsStackParamList = {
  AdminGoodsList: undefined;
  CreateContainer: undefined;
  GoodsDetail: { goodsId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminGoodsStackParamList>;

interface GoodsState {
  goodsId: string;
  goods: Goods | undefined;
  client: any;
  container: any;
  balanceDue: number;
  hasQRCode: boolean;
}

interface LoadingState {
  isLoading: boolean;
  isRefetching: boolean;
}

interface DialogState {
  menuVisible: boolean;
  assignDialogVisible: boolean;
  selectedContainerId: string | null;
  setMenuVisible: (v: boolean) => void;
  setAssignDialogVisible: (v: boolean) => void;
  setSelectedContainerId: (v: string | null) => void;
}

interface ContainerOption {
  containers: any[];
  hasContainers: boolean;
}

interface MutationState {
  isDeleting: boolean;
  isUpdatingStatus: boolean;
  isAssigning: boolean;
}

interface GoodsActions {
  handleDelete: () => void;
  confirmDelete: () => void;
  handleStatusUpdate: (status: string) => void;
  handleAssignPress: () => void;
  handleAssignToContainer: () => void;
  handleShareQR: () => void;
  handleGoBack: () => void;
  handleNavigateToEdit: () => void;
  getPaymentStatusColor: () => string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
}

interface UseGoodsDetailScreenReturn {
  state: GoodsState;
  loading: LoadingState;
  dialogs: DialogState;
  containers: ContainerOption;
  mutations: MutationState;
  actions: GoodsActions;
}

export const useGoodsDetailScreen = (): UseGoodsDetailScreenReturn => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const { goodsId } = route.params as { goodsId: string };

  const [menuVisible, setMenuVisible] = useState(false);
  const [assignDialogVisible, setAssignDialogVisible] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);

  const { data, isLoading, isRefetching, refetch } = useGetGoodsById(goodsId);
  const deleteMutation = useDeleteGoods();
  const updateStatusMutation = useUpdateGoodsStatus();
  const assignMutation = useAssignGoodsToContainer();

  const { data: containersData } = useGetAllContainers({ status: ['BOOKED', 'LOADING'] });

  const containers = useMemo(() => {
    const list = Array.isArray(containersData?.data)
      ? containersData?.data
      : containersData?.data?.containers || [];
    return { containers: list, hasContainers: list.length > 0 };
  }, [containersData]);

  const goods: Goods | undefined = useMemo(() => 
    data?.data?.goods || data?.data, 
  [data]);

  const client = useMemo(() => 
    typeof goods?.clientId === 'object' ? goods.clientId : null,
  [goods]);

  const container = useMemo(() => 
    typeof goods?.containerId === 'object' ? goods.containerId : null,
  [goods]);

  const balanceDue = useMemo(() => 
    (goods?.totalCost || 0) - (goods?.amountPaid || 0),
  [goods]);

  const hasQRCode = useMemo(() => !!goods?.qrCodeImageUrl, [goods]);

  const getPaymentStatusColor = useCallback(() => {
    const { Theme } = require('@src/constants/Theme');
    switch (goods?.paymentStatus) {
      case 'PAID': return Theme.status.success;
      case 'PARTIAL': return Theme.status.warning;
      default: return Theme.status.error;
    }
  }, [goods?.paymentStatus]);

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    return amount?.toLocaleString('fr-FR') || '0';
  }, []);

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleNavigateToEdit = useCallback(() => {
    navigation.navigate('AdminGoodsList' as never);
  }, [navigation]);

  const confirmDelete = useCallback(() => {
    if (!goods) return;
    deleteMutation.mutate(
      { id: goods._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: goodsQueryKeys.all });
          navigation.goBack();
        },
        onError: (error: any) => {
          Alert.alert('Erreur', error?.message || 'Impossible de supprimer la marchandise');
        },
      }
    );
  }, [goods, deleteMutation, navigation, queryClient]);

  const handleDelete = useCallback(() => {
    if (!goods) return;
    Alert.alert(
      'Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer ${goods.goodsId} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: confirmDelete },
      ]
    );
  }, [goods, confirmDelete]);

  const handleStatusUpdate = useCallback((newStatus: string) => {
    if (!goods) return;
    updateStatusMutation.mutate(
      { id: goods._id, status: newStatus },
      { onSuccess: () => refetch() }
    );
    setMenuVisible(false);
  }, [goods, updateStatusMutation, refetch]);

  const handleAssignPress = useCallback(() => {
    setMenuVisible(false);
    if (!containers.hasContainers) {
      Alert.alert(
        'Aucun container disponible',
        'Veuillez d\'abord créer un container pour assigner cette marchandise.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Créer Container', onPress: () => navigation.navigate('CreateContainer' as never) },
        ]
      );
      return;
    }
    setAssignDialogVisible(true);
  }, [containers.hasContainers, navigation]);

  const handleAssignToContainer = useCallback(() => {
    if (!goods || !selectedContainerId) {
      Alert.alert('Erreur', 'Veuillez sélectionner un container');
      return;
    }

    assignMutation.mutate(
      { containerId: selectedContainerId, goodsIds: [goods._id] },
      {
        onSuccess: () => {
          Alert.alert('Succès', 'Marchandise assignée au container');
          setAssignDialogVisible(false);
          setSelectedContainerId(null);
          refetch();
        },
        onError: (error: any) => {
          Alert.alert('Erreur', error?.message || 'Impossible d\'assigner la marchandise');
        },
      }
    );
  }, [goods, selectedContainerId, assignMutation, refetch]);

  const handleShareQR = useCallback(async () => {
    if (goods?.qrCodeImageUrl) {
      try {
        await Share.share({
          message: `QR Code pour ${goods.goodsId}`,
          url: goods.qrCodeImageUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  }, [goods]);

  return {
    state: {
      goodsId,
      goods,
      client,
      container,
      balanceDue,
      hasQRCode,
    },
    loading: {
      isLoading,
      isRefetching,
    },
    dialogs: {
      menuVisible,
      assignDialogVisible,
      selectedContainerId,
      setMenuVisible,
      setAssignDialogVisible,
      setSelectedContainerId,
    },
    containers,
    mutations: {
      isDeleting: deleteMutation.isPending,
      isUpdatingStatus: updateStatusMutation.isPending,
      isAssigning: assignMutation.isPending,
    },
    actions: {
      handleDelete,
      confirmDelete,
      handleStatusUpdate,
      handleAssignPress,
      handleAssignToContainer,
      handleShareQR,
      handleGoBack,
      handleNavigateToEdit,
      getPaymentStatusColor,
      formatDate,
      formatCurrency,
    },
  };
};
