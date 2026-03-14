import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGetGoodsById, useDeleteGoods, useUpdateGoodsStatus } from '../../../hooks';
import { useAssignGoodsToContainer } from '@src/features/admin/containers/hooks';
import { useGetAllContainers } from '@src/features/admin/containers/hooks';

export const useGoodsDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { goodsId } = route.params as { goodsId: string };
  
  const { data, isLoading, refetch } = useGetGoodsById(goodsId);
  const deleteMutation = useDeleteGoods();
  const updateStatusMutation = useUpdateGoodsStatus();
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [assignDialogVisible, setAssignDialogVisible] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  
  const { data: containersData } = useGetAllContainers({ status: ['BOOKED', 'LOADING'] });
  const assignMutation = useAssignGoodsToContainer();
  
  const containers = Array.isArray(containersData?.data) 
    ? containersData?.data 
    : containersData?.data?.containers || [];
  const hasContainers = containers.length > 0;

  const goods = data?.data?.goods || data?.data;
  const client = goods && typeof goods.clientId === 'object' ? goods.clientId : null;
  const container = goods && typeof goods.containerId === 'object' ? goods.containerId : null;
  const balanceDue = goods ? (goods.totalCost || 0) - (goods.amountPaid || 0) : 0;
  const hasQRCode = !!goods?.qrCodeImageUrl;

  const handleAssignToContainer = useCallback(() => {
    if (!selectedContainerId) {
      Alert.alert("Erreur", "Veuillez sélectionner un container");
      return;
    }
    if (!goods) return;
    
    assignMutation.mutate(
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
  }, [selectedContainerId, goods, assignMutation, refetch]);

  const handleAssignPress = useCallback(() => {
    setMenuVisible(false);
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
    setAssignDialogVisible(true);
  }, [hasContainers, navigation]);

  return {
    goodsId,
    navigation,
    goods,
    isLoading,
    refetch,
    client,
    container,
    balanceDue,
    hasQRCode,
    menuVisible,
    setMenuVisible,
    assignDialogVisible,
    setAssignDialogVisible,
    selectedContainerId,
    setSelectedContainerId,
    containers,
    hasContainers,
    assignMutation,
    deleteMutation,
    updateStatusMutation,
    handleAssignToContainer,
    handleAssignPress,
  };
};
