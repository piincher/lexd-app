import React, { useState } from "react";
import {
   View,
   StyleSheet,
   ScrollView,
   Image,
   Dimensions,
   TouchableOpacity,
   Alert,
   Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
   Text,
   ActivityIndicator,
   Card,
   Button,
   Divider,
   Avatar,
   Chip,
   List,
   Menu,
   Portal,
   Dialog,
   RadioButton,
} from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetGoodsById, useDeleteGoods, useUpdateGoodsStatus, useAssignGoodsToContainer } from "../hooks";
import { useGetAllContainers } from "@src/features/admin/v2/containers/hooks";
import { StatusBadge } from "@src/features/goods/components";
import { Theme } from "@src/constants/Theme";

const { width } = Dimensions.get("window");

export const GoodsDetailScreen: React.FC = () => {
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
   
   // Handle different API response formats safely
   const containers = Array.isArray(containersData?.data) 
      ? containersData?.data 
      : containersData?.data?.containers || [];
   const hasContainers = containers.length > 0;

   if (isLoading) {
      return (
         <SafeAreaView style={[styles.container, styles.centered]}>
            <ActivityIndicator size="large" color={Theme.primary[600]} />
         </SafeAreaView>
      );
   }

   const goods = data?.data?.goods || data?.data;
   if (!goods) {
      return (
         <SafeAreaView style={[styles.container, styles.centered]}>
            <MaterialCommunityIcons name="package-variant-remove" size={64} color={Theme.neutral[400]} />
            <Text style={styles.emptyText}>Marchandise non trouvée</Text>
         </SafeAreaView>
      );
   }

   const client = typeof goods.clientId === "object" ? goods.clientId : null;
   const container = typeof goods.containerId === "object" ? goods.containerId : null;
   const balanceDue = (goods.totalCost || 0) - (goods.amountPaid || 0);
   const hasQRCode = !!goods.qrCodeImageUrl;

   const handleDelete = () => {
      Alert.alert(
         "Confirmer la suppression",
         `Êtes-vous sûr de vouloir supprimer ${goods.goodsId} ?`,
         [
            { text: "Annuler", style: "cancel" },
            {
               text: "Supprimer",
               style: "destructive",
               onPress: () => deleteMutation.mutate({ id: goods._id }),
            },
         ]
      );
   };

   const handleStatusUpdate = (newStatus: string) => {
      updateStatusMutation.mutate(
         { id: goods._id, status: newStatus },
         { onSuccess: () => refetch() }
      );
      setMenuVisible(false);
   };

   const handleAssignPress = () => {
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
   };

   const handleAssignToContainer = () => {
      if (!selectedContainerId) {
         Alert.alert("Erreur", "Veuillez sélectionner un container");
         return;
      }
      
      assignMutation.mutate(
         { containerId: selectedContainerId, goodsIds: [goods._id] },
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
   };

   const handleShareQR = async () => {
      if (goods.qrCodeImageUrl) {
         try {
            await Share.share({
               message: `QR Code pour ${goods.goodsId}`,
               url: goods.qrCodeImageUrl,
            });
         } catch (error) {
            console.error("Error sharing:", error);
         }
      }
   };

   const getPaymentStatusColor = () => {
      switch (goods.paymentStatus) {
         case "PAID": return Theme.status.success;
         case "PARTIAL": return Theme.status.warning;
         default: return Theme.status.error;
      }
   };

   const formatDate = (dateString: string) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
         day: "2-digit",
         month: "2-digit",
         year: "numeric",
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   const formatCurrency = (amount: number) => {
      return amount?.toLocaleString("fr-FR") || "0";
   };

   return (
      <SafeAreaView style={styles.container}>
         {/* Header with Gradient */}
         <LinearGradient
            colors={Theme.gradients.primary}
            style={styles.header}
         >
            <View style={styles.headerTop}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                  <Ionicons name="arrow-back" size={24} color="#FFF" />
               </TouchableOpacity>
               <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                     <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.iconButton}>
                        <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
                     </TouchableOpacity>
                  }
               >
                  {goods.status === 'RECEIVED_AT_WAREHOUSE' && (
                     <Menu.Item 
                        onPress={handleAssignPress} 
                        title="Assigner au conteneur" 
                        disabled={!hasContainers}
                     />
                  )}
                  <Menu.Item onPress={() => handleStatusUpdate("READY_FOR_PICKUP")} title="Prêt pour retrait" />
                  <Divider />
                  <Menu.Item onPress={handleDelete} title="Supprimer" titleStyle={{ color: Theme.status.error }} />
               </Menu>
            </View>

            <View style={styles.headerContent}>
               <View style={styles.goodsIdBadge}>
                  <MaterialCommunityIcons name="package-variant" size={20} color="#FFF" style={styles.badgeIcon} />
                  <Text style={styles.goodsIdText}>{goods.goodsId}</Text>
               </View>
               <View style={styles.statusWrapper}>
                  <StatusBadge status={goods.status} />
               </View>
            </View>
         </LinearGradient>

         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* QR Code Card - Prominent Display */}
            <Card style={styles.qrCard}>
               <LinearGradient
                  colors={['#FFFFFF', '#F8F7FC']}
                  style={styles.qrGradient}
               >
                  <View style={styles.qrHeader}>
                     <MaterialCommunityIcons name="qrcode-scan" size={24} color={Theme.primary[600]} />
                     <Text style={styles.qrTitle}>QR Code d'identification</Text>
                  </View>
                  
                  {hasQRCode ? (
                     <View style={styles.qrContent}>
                        <View style={styles.qrImageContainer}>
                           <Image 
                              source={{ uri: goods.qrCodeImageUrl }} 
                              style={styles.qrImage} 
                              resizeMode="contain"
                           />
                        </View>
                        <Text style={styles.qrHint}>Scannez pour vérifier l'authenticité</Text>
                        <Button
                           mode="outlined"
                           onPress={handleShareQR}
                           style={styles.shareButton}
                           icon="share-variant"
                           textColor={Theme.primary[600]}
                        >
                           Partager
                        </Button>
                     </View>
                  ) : (
                     <View style={styles.qrEmpty}>
                        <MaterialCommunityIcons name="qrcode-off" size={64} color={Theme.neutral[300]} />
                        <Text style={styles.qrEmptyText}>QR Code non disponible</Text>
                     </View>
                  )}
               </LinearGradient>
            </Card>

            {/* Photo Section */}
            {goods.photos && goods.photos.length > 0 ? (
               <Card style={styles.photoCard}>
                  <Image source={{ uri: goods.photos[0] }} style={styles.photo} resizeMode="cover" />
                  <View style={styles.photoOverlay}>
                     <Text style={styles.photoLabel}>Photo de la marchandise</Text>
                  </View>
               </Card>
            ) : null}

            {/* Description */}
            {goods.description && (
               <Card style={styles.sectionCard}>
                  <Card.Content>
                     <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="text-box-outline" size={20} color={Theme.primary[600]} />
                        <Text style={styles.sectionTitle}>Description</Text>
                     </View>
                     <Text style={styles.description}>{goods.description}</Text>
                  </Card.Content>
               </Card>
            )}

            {/* Client Info */}
            <Card style={styles.sectionCard}>
               <Card.Content>
                  <View style={styles.sectionHeader}>
                     <MaterialCommunityIcons name="account-circle" size={20} color={Theme.primary[600]} />
                     <Text style={styles.sectionTitle}>Client</Text>
                  </View>
                  <View style={styles.clientRow}>
                     <Avatar.Text
                        size={56}
                        label={`${client?.firstName?.[0] || "?"}${client?.lastName?.[0] || "?"}`}
                        style={{ backgroundColor: Theme.primary[500] }}
                        labelStyle={{ fontSize: 22, fontWeight: 'bold' }}
                     />
                     <View style={styles.clientInfo}>
                        <Text style={styles.clientName}>
                           {client ? `${client.firstName} ${client.lastName}` : "Client inconnu"}
                        </Text>
                        <View style={styles.clientPhoneRow}>
                           <Ionicons name="call-outline" size={14} color={Theme.neutral[500]} />
                           <Text style={styles.clientPhone}>{client?.phoneNumber || "N/A"}</Text>
                        </View>
                     </View>
                  </View>
               </Card.Content>
            </Card>

            {/* Physical Properties */}
            <Card style={styles.sectionCard}>
               <Card.Content>
                  <View style={styles.sectionHeader}>
                     <MaterialCommunityIcons name="cube-outline" size={20} color={Theme.primary[600]} />
                     <Text style={styles.sectionTitle}>Caractéristiques physiques</Text>
                  </View>
                  
                  <View style={styles.propertyGrid}>
                     <View style={[styles.propertyItem, styles.propertyItemHighlight]}>
                        <MaterialCommunityIcons name="cube" size={28} color={Theme.primary[600]} />
                        <Text style={styles.propertyValueHighlight}>{goods.actualCBM?.toFixed(3) || "0"}</Text>
                        <Text style={styles.propertyLabel}>m³ (CBM)</Text>
                     </View>
                     
                     <View style={styles.propertyItem}>
                        <MaterialCommunityIcons name="weight-kilogram" size={28} color={Theme.accent.mint} />
                        <Text style={styles.propertyValue}>{goods.weight || "0"}</Text>
                        <Text style={styles.propertyLabel}>kg</Text>
                     </View>
                     
                     <View style={styles.propertyItem}>
                        <MaterialCommunityIcons name="package-variant" size={28} color={Theme.accent.coral} />
                        <Text style={styles.propertyValue}>{goods.quantity || "1"}</Text>
                        <Text style={styles.propertyLabel}>unité(s)</Text>
                     </View>
                  </View>

                  {goods.dimensions && (
                     <View style={styles.dimensionsBox}>
                        <MaterialCommunityIcons name="ruler-square" size={18} color={Theme.neutral[500]} />
                        <Text style={styles.dimensionsText}>
                           {goods.dimensions.length} × {goods.dimensions.width} × {goods.dimensions.height} cm
                        </Text>
                     </View>
                  )}
               </Card.Content>
            </Card>

            {/* Location */}
            <Card style={styles.sectionCard}>
               <Card.Content>
                  <View style={styles.sectionHeader}>
                     <MaterialCommunityIcons name="map-marker" size={20} color={Theme.primary[600]} />
                     <Text style={styles.sectionTitle}>Localisation</Text>
                  </View>
                  
                  <View style={styles.locationGrid}>
                     <View style={styles.locationItem}>
                        <View style={[styles.locationIcon, { backgroundColor: Theme.primary[100] }]}>
                           <MaterialCommunityIcons name="warehouse" size={24} color={Theme.primary[600]} />
                        </View>
                        <View>
                           <Text style={styles.locationLabel}>Emplacement</Text>
                           <Text style={styles.locationValue}>{goods.warehouseLocation || "Non assigné"}</Text>
                        </View>
                     </View>
                     
                     {container && (
                        <View style={styles.locationItem}>
                           <View style={[styles.locationIcon, { backgroundColor: Theme.accent.mint + '20' }]}>
                              <MaterialCommunityIcons name="truck-container" size={24} color={Theme.accent.mint} />
                           </View>
                           <View style={styles.locationTextContainer}>
                              <Text style={styles.locationLabel}>Conteneur</Text>
                              <Text style={styles.locationValue} numberOfLines={1}>
                                 {container.virtualContainerNumber}
                              </Text>
                              <Text style={styles.locationSubtext}>{container.shippingLine}</Text>
                           </View>
                        </View>
                     )}
                  </View>
               </Card.Content>
            </Card>

            {/* Financial Info */}
            <Card style={[styles.sectionCard, styles.financialCard]}>
               <Card.Content>
                  <View style={styles.sectionHeader}>
                     <MaterialCommunityIcons name="cash-multiple" size={20} color={Theme.status.success} />
                     <Text style={[styles.sectionTitle, { color: Theme.status.success }]}>Informations financières</Text>
                  </View>
                  
                  <View style={styles.financialRow}>
                     <Text style={styles.financialLabel}>Prix unitaire</Text>
                     <Text style={styles.financialValue}>{formatCurrency(goods.unitPrice)} FCFA</Text>
                  </View>
                  
                  <Divider style={styles.divider} />
                  
                  <View style={styles.financialRowHighlight}>
                     <Text style={styles.financialLabelHighlight}>Coût total</Text>
                     <Text style={styles.financialValueTotal}>
                        {formatCurrency(goods.totalCost)} FCFA
                     </Text>
                  </View>
                  
                  <View style={styles.financialRow}>
                     <Text style={styles.financialLabel}>Montant payé</Text>
                     <Text style={[styles.financialValue, { color: Theme.status.success }]}>
                        {formatCurrency(goods.amountPaid)} FCFA
                     </Text>
                  </View>
                  
                  <View style={styles.financialRow}>
                     <Text style={styles.financialLabel}>Reste à payer</Text>
                     <Text style={[styles.financialValue, { 
                        color: balanceDue > 0 ? Theme.status.error : Theme.status.success 
                     }]}>
                        {formatCurrency(balanceDue)} FCFA
                     </Text>
                  </View>

                  <View style={styles.paymentStatusContainer}>
                     <Chip
                        style={[styles.paymentChip, { backgroundColor: getPaymentStatusColor() + "20" }]}
                        textStyle={{ color: getPaymentStatusColor(), fontWeight: '600' }}
                        icon={goods.paymentStatus === "PAID" ? "check-circle" : "clock-outline"}
                     >
                        {goods.paymentStatus === "PAID" ? "Payé" : 
                         goods.paymentStatus === "PARTIAL" ? "Partiel" : "Non payé"}
                     </Chip>
                  </View>
               </Card.Content>
            </Card>

            {/* Reception Info */}
            <Card style={styles.sectionCard}>
               <Card.Content>
                  <View style={styles.sectionHeader}>
                     <MaterialCommunityIcons name="calendar-check" size={20} color={Theme.primary[600]} />
                     <Text style={styles.sectionTitle}>Réception</Text>
                  </View>
                  <View style={styles.receptionGrid}>
                     <View style={styles.receptionItem}>
                        <Text style={styles.receptionLabel}>Date de réception</Text>
                        <Text style={styles.receptionValue}>{formatDate(goods.receivedAt)}</Text>
                     </View>
                     <View style={styles.receptionItem}>
                        <Text style={styles.receptionLabel}>Reçu par</Text>
                        <Text style={styles.receptionValue}>
                           {goods.receivedByName || (typeof goods.receivedBy === "object" ? 
                              `${goods.receivedBy.firstName} ${goods.receivedBy.lastName}` : "N/A")}
                        </Text>
                     </View>
                  </View>
               </Card.Content>
            </Card>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
               <Button
                  mode="contained"
                  onPress={() => navigation.navigate('AdminGoodsList' as never)}
                  style={styles.editButton}
                  contentStyle={styles.buttonContent}
                  icon="pencil"
               >
                  Modifier
               </Button>
               <Button
                  mode="outlined"
                  onPress={handleDelete}
                  style={styles.deleteButton}
                  contentStyle={styles.buttonContent}
                  textColor={Theme.status.error}
                  icon="delete"
               >
                  Supprimer
               </Button>
            </View>

            <View style={styles.bottomSpacer} />
         </ScrollView>

         {/* Container Selection Dialog */}
         <Portal>
            <Dialog visible={assignDialogVisible} onDismiss={() => setAssignDialogVisible(false)}>
               <Dialog.Title>Sélectionner un container</Dialog.Title>
               <Dialog.Content>
                  {containers.length === 0 ? (
                     <Text>Aucun container disponible</Text>
                  ) : (
                     <RadioButton.Group
                        onValueChange={value => setSelectedContainerId(value)}
                        value={selectedContainerId || ''}
                     >
                        {Array.isArray(containers) && containers.map((container: any) => (
                           <RadioButton.Item
                              key={container._id}
                              label={`${container.virtualContainerNumber} (${container.totalCBM?.toFixed(2) || 0} m³)`}
                              value={container._id}
                           />
                        ))}
                     </RadioButton.Group>
                  )}
               </Dialog.Content>
               <Dialog.Actions>
                  <Button onPress={() => setAssignDialogVisible(false)}>Annuler</Button>
                  <Button 
                     onPress={handleAssignToContainer} 
                     disabled={!selectedContainerId || assignMutation.isPending}
                     loading={assignMutation.isPending}
                  >
                     Assigner
                  </Button>
               </Dialog.Actions>
            </Dialog>
         </Portal>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Theme.neutral[50],
   },
   centered: {
      justifyContent: "center",
      alignItems: "center",
   },
   header: {
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 30,
   },
   headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
   },
   iconButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.2)',
   },
   headerContent: {
      alignItems: "center",
   },
   goodsIdBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: "rgba(255,255,255,0.25)",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
   },
   badgeIcon: {
      marginRight: 8,
   },
   goodsIdText: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "700",
      letterSpacing: 0.5,
   },
   statusWrapper: {
      transform: [{ scale: 1.1 }],
   },
   scrollView: {
      flex: 1,
      marginTop: -20,
      paddingHorizontal: 16,
   },
   
   // QR Card Styles
   qrCard: {
      marginBottom: 16,
      borderRadius: 20,
      overflow: "hidden",
      elevation: 4,
      shadowColor: Theme.primary[600],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
   },
   qrGradient: {
      padding: 20,
   },
   qrHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
   },
   qrTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: Theme.neutral[800],
      marginLeft: 10,
   },
   qrContent: {
      alignItems: 'center',
   },
   qrImageContainer: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: Theme.primary[200],
      elevation: 2,
   },
   qrImage: {
      width: 200,
      height: 200,
   },
   qrHint: {
      marginTop: 12,
      fontSize: 13,
      color: Theme.neutral[500],
      fontStyle: 'italic',
   },
   shareButton: {
      marginTop: 16,
      borderColor: Theme.primary[600],
      borderRadius: 10,
   },
   qrEmpty: {
      alignItems: 'center',
      paddingVertical: 30,
   },
   qrEmptyText: {
      marginTop: 12,
      fontSize: 14,
      color: Theme.neutral[500],
   },

   // Photo Card
   photoCard: {
      marginBottom: 16,
      borderRadius: 16,
      overflow: "hidden",
      elevation: 3,
   },
   photo: {
      width: "100%",
      height: 200,
   },
   photoOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 12,
   },
   photoLabel: {
      color: '#FFF',
      fontSize: 13,
      fontWeight: '600',
   },

   // Section Card
   sectionCard: {
      marginBottom: 12,
      borderRadius: 16,
      elevation: 2,
      backgroundColor: '#FFFFFF',
   },
   financialCard: {
      borderLeftWidth: 4,
      borderLeftColor: Theme.status.success,
   },
   sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: Theme.neutral[800],
      marginLeft: 10,
   },
   description: {
      fontSize: 15,
      color: Theme.neutral[600],
      lineHeight: 22,
   },

   // Client Section
   clientRow: {
      flexDirection: "row",
      alignItems: "center",
   },
   clientInfo: {
      marginLeft: 16,
   },
   clientName: {
      fontSize: 17,
      fontWeight: "700",
      color: Theme.neutral[800],
   },
   clientPhoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
   },
   clientPhone: {
      fontSize: 14,
      color: Theme.neutral[500],
      marginLeft: 6,
   },

   // Property Grid
   propertyGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
   },
   propertyItem: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 16,
      backgroundColor: Theme.neutral[50],
      borderRadius: 12,
      marginHorizontal: 4,
   },
   propertyItemHighlight: {
      backgroundColor: Theme.primary[50],
      borderWidth: 2,
      borderColor: Theme.primary[200],
   },
   propertyLabel: {
      fontSize: 12,
      color: Theme.neutral[500],
      marginTop: 6,
      fontWeight: '500',
   },
   propertyValue: {
      fontSize: 18,
      fontWeight: "700",
      color: Theme.neutral[800],
      marginTop: 4,
   },
   propertyValueHighlight: {
      fontSize: 20,
      fontWeight: "800",
      color: Theme.primary[600],
      marginTop: 4,
   },

   // Dimensions
   dimensionsBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Theme.neutral[100],
      padding: 14,
      borderRadius: 10,
   },
   dimensionsText: {
      fontSize: 14,
      fontWeight: "600",
      color: Theme.neutral[700],
      marginLeft: 10,
   },

   // Location
   locationGrid: {
      gap: 12,
   },
   locationItem: {
      flexDirection: "row",
      alignItems: "center",
   },
   locationIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
   },
   locationTextContainer: {
      flex: 1,
   },
   locationLabel: {
      fontSize: 12,
      color: Theme.neutral[500],
      marginBottom: 2,
   },
   locationValue: {
      fontSize: 15,
      fontWeight: "700",
      color: Theme.neutral[800],
   },
   locationSubtext: {
      fontSize: 13,
      color: Theme.neutral[500],
      marginTop: 2,
   },

   // Financial Section
   financialRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
   },
   financialRowHighlight: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Theme.primary[50],
      padding: 14,
      borderRadius: 10,
      marginVertical: 8,
   },
   financialLabel: {
      fontSize: 14,
      color: Theme.neutral[600],
   },
   financialLabelHighlight: {
      fontSize: 14,
      fontWeight: '600',
      color: Theme.neutral[700],
   },
   financialValue: {
      fontSize: 15,
      fontWeight: "600",
      color: Theme.neutral[800],
   },
   financialValueTotal: {
      fontSize: 20,
      fontWeight: "800",
      color: Theme.primary[600],
   },
   divider: {
      marginVertical: 8,
      backgroundColor: Theme.neutral[200],
   },
   paymentStatusContainer: {
      marginTop: 16,
      alignItems: 'flex-start',
   },
   paymentChip: {
      height: 36,
      paddingHorizontal: 8,
   },

   // Reception
   receptionGrid: {
      flexDirection: 'row',
      gap: 16,
   },
   receptionItem: {
      flex: 1,
      backgroundColor: Theme.neutral[50],
      padding: 14,
      borderRadius: 12,
   },
   receptionLabel: {
      fontSize: 12,
      color: Theme.neutral[500],
      marginBottom: 4,
   },
   receptionValue: {
      fontSize: 14,
      fontWeight: '600',
      color: Theme.neutral[800],
   },

   // Action Buttons
   actionButtons: {
      flexDirection: "row",
      gap: 12,
      marginTop: 20,
      marginBottom: 8,
   },
   editButton: {
      flex: 1,
      backgroundColor: Theme.primary[600],
      borderRadius: 12,
      elevation: 2,
   },
   deleteButton: {
      flex: 1,
      borderColor: Theme.status.error,
      borderRadius: 12,
      borderWidth: 1.5,
   },
   buttonContent: {
      paddingVertical: 8,
   },
   bottomSpacer: {
      height: 40,
   },
   emptyText: {
      marginTop: 16,
      fontSize: 16,
      color: Theme.neutral[500],
   },
});

export default GoodsDetailScreen;
