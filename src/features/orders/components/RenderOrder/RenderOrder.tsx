import { productType } from '@src/api/order';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@src/shared/ui/Slider';
import { Button, Text } from 'react-native-paper';
import { Pressable, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@src/store/Auth';
import { formatDate } from '@src/utils/formatDate';
import { MaterialIcons } from '@expo/vector-icons';
import { useGetOrderDetails } from '@src/shared/hooks/useOrderDetail';
import { useShippingMode } from '@src/store/shippingMode';
import { CustomModal } from '@src/shared/ui/Modal';
import { useDeleteOrder } from '@src/features/orders/hooks/useDeleteOrder';
import { useClipboard } from '@src/shared/lib/hooks/useClipboard';
import { LEGACY_MANUAL_ORDERS_ENABLED } from '@src/features/admin/orders/legacyOrders';
import { useRenderOrderStyles } from './RenderOrder.styles';
import { OrderHeader } from './OrderHeader';
import { OrderInfoSection } from './OrderInfoSection';
import { AdminActions } from './AdminActions';

export const RenderOrder = ({ item }: { item: productType }) => {
  const { colors } = useAppTheme();
  const styles = useRenderOrderStyles();
  const { role } = useAuth((state) => state.user);
  const isAdminRole = ['admin', 'superadmin'].includes(role);
  const shippingMode = useShippingMode((state) => state.type);
  const navigation = useNavigation();
  const formattedDate = formatDate(item?.departureDate!);
  const formattedLastUpdate = formatDate(item?.updatedAt!);
  const [showModal, setShowModal] = useState(false);
  const { mutate, isSuccess } = useDeleteOrder();
  const { copyToClipboard } = useClipboard();

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
    }
  }, [isSuccess]);

  useGetOrderDetails(item._id!);

  const orderStatus = item.status;

  const customerInfo = [
    { label: 'Nom du client', value: item.clientName, icon: 'person' },
    { label: 'Numéro de téléphone', value: item.clientPhone, icon: 'phone' },
    { label: 'Numéro de suivi', value: item.code, icon: 'qr-code', isCopyable: true },
  ];

  const shippingDetails = [
    { label: "Mode d'expédition", value: item.shippingMode, icon: 'local-shipping' },
    { label: 'Position actuelle', value: item.currentStatus || 'En attente', icon: 'location-on' },
    { label: 'Nombre de colis', value: (item.quantity ?? 0).toString(), icon: '123' },
    { label: 'Type de colis', value: item?.category?.name || 'Non spécifié', icon: 'category' },
    {
      label: shippingMode === 'sea' ? 'Date de chargement' : 'Date de départ',
      value: formattedDate,
      icon: 'calendar-today',
    },
    { label: 'Dernière mise à jour', value: formattedLastUpdate, icon: 'update' },
  ];

  const paymentInfo =
    shippingMode === 'sea'
      ? [
          { label: 'CBM', value: item.packageCBM, icon: 'square' },
          {
            label: 'Prix unitaire (FCFA)',
            value: item.unitPrice ? `${item.unitPrice} FCFA` : 'Non disponible',
            icon: 'attach-money',
          },
          { label: 'Prix total (FCFA)', value: `${item.priceTotal} `, icon: 'attach-money' },
          { label: 'Compagnie de transport', value: item.contenairNumber, icon: 'local-shipping' },
          {
            label: 'Statut de paiement',
            value:
              item.paymentStatus === 'Paid' ? (
                <Text style={{ color: colors.status.success, fontFamily: 'medium' }}>Payé</Text>
              ) : (
                <Text style={{ color: colors.status.error, fontFamily: 'medium' }}>Non payé</Text>
              ),
            icon: 'payment',
          },
        ]
      : [];

  const handleNavigate = () => {
    if (isAdminRole) {
      navigation.navigate('ActiveOrderDetails', { id: item._id! });
      return;
    }
    navigation.navigate('OrderDetail', { id: item._id! });
  };

  const handleEdit = () => {
    // Manual order editing is retired — orders are now driven by goods.
    if (!LEGACY_MANUAL_ORDERS_ENABLED) return;
    navigation.navigate('EditOrder', { id: item._id!, orderId: item?.category?._id });
  };

  const copyTrackingNumber = () => {
    if (item.code) {
      copyToClipboard(item.code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => mutate({ orderId: item._id! })}
        title="Supprimer la commande"
        message="Êtes-vous sûr de vouloir supprimer cette commande ? Cette action ne peut pas être annulée."
        confirmText="Supprimer"
        cancelText="Annuler"
        icon="warning"
      />

      <OrderHeader item={item} orderStatus={orderStatus} formattedLastUpdate={formattedLastUpdate} />

      <View style={styles.sliderContainer}>
        <Slider bannerImages={item?.images!} />
      </View>

      <OrderInfoSection title="Informations client" data={customerInfo} onCopy={copyTrackingNumber} />

      {shippingMode === 'sea' && <OrderInfoSection title="Informations de paiement" data={paymentInfo} />}

      <OrderInfoSection title="Détails d'expédition" data={shippingDetails} />

      {isAdminRole && <AdminActions onEdit={handleEdit} onDelete={() => setShowModal(true)} />}

      <Button
        mode="contained"
        style={styles.primaryButton}
        onPress={handleNavigate}
        contentStyle={styles.buttonContent}
      >
        <Text style={styles.buttonText}>Voir les détails</Text>
      </Button>
    </SafeAreaView>
  );
};
