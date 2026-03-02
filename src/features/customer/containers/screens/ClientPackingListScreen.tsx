/**
 * ClientPackingListScreen
 * Professional document-like packing list for clients
 * Shows only client's goods with consignee info and pickup details
 * Updated: Added PDF download and enhanced sharing functionality
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Share,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {
  Appbar,
  ActivityIndicator,
  Text,
  Button,
  Card,
  Divider,
  Chip,
  useTheme,
  List,
  Portal,
  Dialog,
  Snackbar,
  ProgressBar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { 
  useGetMyPackingList, 
  useDownloadPackingListPDF 
} from '../hooks/useCustomerContainers';
import {
  SHIPPING_MODE_LABELS,
  SHIPPING_LINE_LABELS,
} from '../types';

const ClientPackingListScreen: React.FC<RootStackScreenProps<'ClientPackingList'>> = ({
  navigation,
  route,
}) => {
  const { containerId } = route.params;
  const theme = useTheme();
  const [contactDialogVisible, setContactDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const {
    data: packingList,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetMyPackingList(containerId);

  const downloadMutation = useDownloadPackingListPDF();

  const handleRefresh = () => {
    refetch();
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleCallConsignee = () => {
    if (packingList?.consignee?.phone) {
      Linking.openURL(`tel:${packingList.consignee.phone}`);
    }
    setContactDialogVisible(false);
  };

  const handleOpenMaps = () => {
    if (packingList?.consignee?.warehouseAddress) {
      const encodedAddress = encodeURIComponent(packingList.consignee.warehouseAddress);
      Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
    }
  };

  /**
   * Download PDF and save to device
   */
  const handleDownloadPDF = async () => {
    if (!packingList) return;

    try {
      setDownloadProgress(0.1);
      
      // Get PDF blob from API
      const pdfBlob = await downloadMutation.mutateAsync(containerId);
      setDownloadProgress(0.5);

      // Create filename
      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      const filename = `PackingList_${packingList.containerNumber}_${timestamp}.pdf`;
      
      // For web platform
      if (Platform.OS === 'web') {
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        showSnackbar('PDF téléchargé avec succès');
        return;
      }

      // For native platforms
      const fileUri = `${FileSystem.cacheDirectory}${filename}`;
      
      // Convert blob to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = reader.result?.toString().split(',')[1];
          if (base64) resolve(base64);
          else reject(new Error('Failed to convert PDF to base64'));
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(pdfBlob);
      
      setDownloadProgress(0.7);
      const base64Data = await base64Promise;
      
      // Write file
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      setDownloadProgress(1);
      showSnackbar('PDF téléchargé avec succès');
      
      // Ask if user wants to open the PDF
      Alert.alert(
        'Téléchargement terminé',
        'Voulez-vous ouvrir le PDF ?',
        [
          { text: 'Plus tard', style: 'cancel' },
          { 
            text: 'Ouvrir', 
            onPress: async () => {
              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri, {
                  mimeType: 'application/pdf',
                  dialogTitle: 'Ouvrir le PDF',
                });
              }
            }
          },
        ]
      );
    } catch (err) {
      console.error('Download error:', err);
      Alert.alert(
        'Erreur de téléchargement',
        'Impossible de télécharger le PDF. Veuillez réessayer.'
      );
    } finally {
      setTimeout(() => setDownloadProgress(0), 1000);
    }
  };

  /**
   * Share packing list as text or PDF
   */
  const handleShare = async () => {
    if (!packingList) return;

    try {
      // First try to share PDF if available
      if (packingList.generatedAt) {
        const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
        const filename = `PackingList_${packingList.containerNumber}_${timestamp}.pdf`;
        
        if (Platform.OS !== 'web') {
          try {
            setDownloadProgress(0.3);
            const pdfBlob = await downloadMutation.mutateAsync(containerId);
            setDownloadProgress(0.7);
            
            const fileUri = `${FileSystem.cacheDirectory}${filename}`;
            
            // Convert blob to base64
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve, reject) => {
              reader.onloadend = () => {
                const base64 = reader.result?.toString().split(',')[1];
                if (base64) resolve(base64);
                else reject(new Error('Failed to convert PDF'));
              };
              reader.onerror = reject;
            });
            reader.readAsDataURL(pdfBlob);
            
            const base64Data = await base64Promise;
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            });
            
            setDownloadProgress(1);
            
            // Share the PDF file
            await Sharing.shareAsync(fileUri, {
              mimeType: 'application/pdf',
              dialogTitle: 'Partager ma liste de colisage',
              UTI: 'com.adobe.pdf',
            });
            
            setTimeout(() => setDownloadProgress(0), 500);
            return;
          } catch (pdfError) {
            console.warn('PDF share failed, falling back to text:', pdfError);
          }
        }
      }

      // Fallback to text sharing
      const text = generateShareText();
      await Share.share({
        message: text,
        title: `Liste de Colisage - ${packingList.containerNumber}`,
      });
    } catch (err) {
      console.error('Share error:', err);
      Alert.alert('Erreur', 'Impossible de partager la liste de colisage');
    }
  };

  const generateShareText = () => {
    if (!packingList) return '';

    const lines: string[] = [];
    lines.push('═══════════════════════════════════════');
    lines.push('       LISTE DE COLISAGE CLIENT');
    lines.push('═══════════════════════════════════════');
    lines.push('');
    lines.push(`Container: ${packingList.containerNumber}`);
    lines.push(`Mode: ${packingList.shippingLineLabel}`);
    lines.push(`Route: ${packingList.route.origin} → Dakar → ${packingList.route.destination}`);
    lines.push(`Date: ${format(new Date(packingList.generatedAt), 'dd MMMM yyyy', { locale: fr })}`);
    lines.push('');
    lines.push('── POINT DE RETRAIT ───────────────────');
    lines.push(`Entrepôt: ChinaLink Express Warehouse - Bamako`);
    lines.push('');
    lines.push('── DESTINATAIRE ───────────────────────');
    lines.push(`Nom: ${packingList.consignee.name}`);
    lines.push(`Téléphone: ${packingList.consignee.phone}`);
    lines.push(`Adresse: ${packingList.consignee.warehouseAddress}`);
    lines.push('');
    lines.push('── DOCUMENTS REQUIS ───────────────────');
    lines.push('• Pièce d\'identité');
    lines.push('• Reçu de paiement');
    lines.push('');
    lines.push('── MARCHANDISES ───────────────────────');
    lines.push('N°  ID           Description          CBM    Poids');
    lines.push('──  ───────────  ───────────────────  ─────  ──────');

    packingList.items.forEach((item, index) => {
      const id = item.goodsId.slice(-8).padEnd(11);
      const desc = (item.description || '-').slice(0, 20).padEnd(20);
      const cbm = item.actualCBM.toFixed(2).padStart(5);
      const weight = `${item.weight || 0}kg`.padStart(6);
      lines.push(`${(index + 1).toString().padStart(2)}  ${id}  ${desc}  ${cbm}  ${weight}`);
    });

    lines.push('');
    lines.push('── TOTAUX ─────────────────────────────');
    lines.push(`Total Marchandises: ${packingList.summary.totalItems}`);
    lines.push(`Volume Total: ${packingList.summary.totalCBM.toFixed(2)} m³`);
    lines.push(`Poids Total: ${packingList.summary.totalWeight.toFixed(0)} kg`);
    lines.push('');
    lines.push('── STATUT ─────────────────────────────');
    lines.push(`Statut: ${packingList.tracking.statusLabel}`);
    if (packingList.tracking.estimatedArrival) {
      lines.push(`Arrivée Estimée: ${format(new Date(packingList.tracking.estimatedArrival), 'dd MMMM yyyy', { locale: fr })}`);
    }
    lines.push('');
    lines.push('═══════════════════════════════════════');
    lines.push('ChinaLink Express - Transport International');
    lines.push('Route: Chine → Dakar (Sénégal) → Bamako (Mali)');
    lines.push('═══════════════════════════════════════');

    return lines.join('\n');
  };

  const getShippingModeIcon = (
    mode: 'SEA' | 'AIR'
  ): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
    return mode === 'SEA' ? 'ferry' : 'airplane';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      BOOKED: { bg: '#EDE9FE', text: '#8B5CF6', icon: '#8B5CF6' },
      IN_TRANSIT: { bg: '#E0F2FE', text: '#0EA5E9', icon: '#0EA5E9' },
      ARRIVED: { bg: '#D1FAE5', text: '#10B981', icon: '#10B981' },
      READY_FOR_PICKUP: { bg: '#FEF3C7', text: '#F59E0B', icon: '#F59E0B' },
      DELIVERED: { bg: '#DCFCE7', text: '#22C55E', icon: '#22C55E' },
    };
    return colors[status] || { bg: '#F3F4F6', text: '#6B7280', icon: '#6B7280' };
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Non disponible';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const statusColors = (() => {
    if (!packingList) return { bg: '#F3F4F6', text: '#6B7280', icon: '#6B7280' };
    return getStatusColor(packingList.tracking.status);
  })();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Liste de Colisage" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>
            Chargement de votre liste de colisage...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !packingList) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Liste de Colisage" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-document-remove"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Liste non disponible</Text>
          <Text style={styles.errorText}>
            {error?.message || 'Impossible de charger votre liste de colisage.'}
          </Text>
          <Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Liste de Colisage" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="share-variant" onPress={handleShare} />
        <Appbar.Action icon="download" onPress={handleDownloadPDF} />
      </Appbar.Header>

      {/* Download Progress Bar */}
      {downloadProgress > 0 && downloadProgress < 1 && (
        <ProgressBar
          progress={downloadProgress}
          color={theme.colors.primary}
          style={styles.progressBar}
        />
      )}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* Route Info Banner - At Top */}
        <Card style={styles.routeBannerCard}>
          <LinearGradient
            colors={['#E0F2FE', '#F0F9FF']}
            style={styles.routeBannerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Card.Content>
              <View style={styles.routeBannerHeader}>
                <MaterialCommunityIcons name="routes" size={24} color="#0284C7" />
                <Text style={styles.routeBannerTitle}>Itinéraire Via Dakar, Sénégal</Text>
              </View>
              
              <View style={styles.routeBannerFlow}>
                <View style={styles.routeBannerItem}>
                  <MaterialCommunityIcons name="flag" size={20} color="#0EA5E9" />
                  <Text style={styles.routeBannerLabel}>Chine</Text>
                </View>
                
                <View style={styles.routeBannerArrow}>
                  <MaterialCommunityIcons name="arrow-right" size={16} color="#94A3B8" />
                </View>
                
                <View style={[styles.routeBannerItem, styles.routeBannerHighlight]}>
                  <MaterialCommunityIcons name="ferry" size={24} color="#10B981" />
                  <Text style={styles.routeBannerValue}>DAKAR</Text>
                  <Text style={styles.routeBannerSubtext}>Sénégal</Text>
                </View>
                
                <View style={styles.routeBannerArrow}>
                  <MaterialCommunityIcons name="arrow-right" size={16} color="#94A3B8" />
                </View>
                
                <View style={styles.routeBannerItem}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#8B5CF6" />
                  <Text style={styles.routeBannerLabel}>Bamako</Text>
                </View>
              </View>
            </Card.Content>
          </LinearGradient>
        </Card>

        {/* Document Header Card */}
        <Card style={[styles.documentCard, styles.headerCard]}>
          <Card.Content>
            <View style={styles.documentHeader}>
              <View style={styles.documentIconContainer}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={40}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.documentTitleContainer}>
                <Text style={styles.documentTitle}>LISTE DE COLISAGE</Text>
                <Text style={styles.documentSubtitle}>
                  {packingList.containerNumber}
                </Text>
              </View>
            </View>
            <Divider style={styles.headerDivider} />
            <View style={styles.documentMeta}>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name={getShippingModeIcon(packingList.shippingMode)}
                  size={16}
                  color={COLORS.DimGray}
                />
                <Text style={styles.metaText}>
                  {packingList.shippingLineLabel}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={16}
                  color={COLORS.DimGray}
                />
                <Text style={styles.metaText}>
                  {formatDate(packingList.generatedAt)}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Status Card */}
        <Card style={[styles.statusCard, { backgroundColor: statusColors.bg }]}>
          <Card.Content>
            <View style={styles.statusHeader}>
              <MaterialCommunityIcons
                name="information-circle"
                size={24}
                color={statusColors.icon}
              />
              <Text style={[styles.statusTitle, { color: statusColors.text }]}>
                Statut du Container
              </Text>
            </View>
            <Text style={[styles.statusValue, { color: statusColors.text }]}>
              {packingList.tracking.statusLabel}
            </Text>
            {packingList.tracking.estimatedArrival && (
              <Text style={[styles.estimatedText, { color: statusColors.text }]}>
                Arrivée estimée: {formatDate(packingList.tracking.estimatedArrival)}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Route Info Card - Dakar Route */}
        <Card style={styles.routeInfoCard}>
          <LinearGradient
            colors={['#E0F2FE', '#F0F9FF']}
            style={styles.routeInfoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Card.Content>
              <View style={styles.routeInfoHeader}>
                <MaterialCommunityIcons name="routes" size={24} color="#0284C7" />
                <Text style={styles.routeInfoTitle}>Itinéraire de Transport</Text>
              </View>
              
              <View style={styles.routeFlow}>
                <View style={styles.routeFlowItem}>
                  <MaterialCommunityIcons name="flag" size={20} color="#0EA5E9" />
                  <Text style={styles.routeFlowLabel}>Départ</Text>
                  <Text style={styles.routeFlowValue}>{packingList.route.origin}</Text>
                </View>
                
                <View style={styles.routeFlowArrow}>
                  <MaterialCommunityIcons name="arrow-right" size={20} color="#94A3B8" />
                </View>
                
                <View style={[styles.routeFlowItem, styles.routeFlowHighlight]}>
                  <MaterialCommunityIcons name="ferry" size={24} color="#10B981" />
                  <Text style={styles.routeFlowLabel}>Arrivée Port</Text>
                  <Text style={[styles.routeFlowValue, styles.routeFlowValueHighlight]}>DAKAR</Text>
                  <Text style={styles.routeFlowSubtext}>Sénégal</Text>
                </View>
                
                <View style={styles.routeFlowArrow}>
                  <MaterialCommunityIcons name="arrow-right" size={20} color="#94A3B8" />
                </View>
                
                <View style={styles.routeFlowItem}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#8B5CF6" />
                  <Text style={styles.routeFlowLabel}>Retrait</Text>
                  <Text style={styles.routeFlowValue}>{packingList.route.destination}</Text>
                </View>
              </View>
              
              <View style={styles.routeInfoFooter}>
                <MaterialCommunityIcons name="information" size={16} color="#64748B" />
                <Text style={styles.routeInfoText}>
                  Votre conteneur arrive par bateau à Dakar, puis est transporté par route vers Bamako.
                </Text>
              </View>
            </Card.Content>
          </LinearGradient>
        </Card>

        {/* Pickup Section - Prominent */}
        <Card style={styles.pickupSectionCard}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.pickupGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Card.Content>
              <View style={styles.pickupSectionHeader}>
                <MaterialCommunityIcons name="map-marker" size={28} color="#FFF" />
                <Text style={styles.pickupSectionTitle}>📍 POINT DE RETRAIT</Text>
              </View>
              
              <Text style={styles.warehouseMainName}>ChinaLink Express Warehouse - Bamako</Text>
              <Text style={styles.warehouseMainAddress}>Mali</Text>
              
              <Divider style={styles.pickupDivider} />
              
              {/* Consignee Card */}
              <Text style={styles.consigneeSectionLabel}>Contact pour le retrait:</Text>
              
              <View style={styles.consigneeInfoCard}>
                <View style={styles.consigneeInfoRow}>
                  <MaterialCommunityIcons name="account" size={20} color="#7C3AED" />
                  <Text style={styles.consigneeInfoName}>{packingList.consignee.name}</Text>
                </View>
                
                <View style={styles.consigneeInfoRow}>
                  <MaterialCommunityIcons name="phone" size={20} color="#7C3AED" />
                  <Text style={styles.consigneeInfoPhone}>{packingList.consignee.phone}</Text>
                </View>
                
                <View style={styles.consigneeInfoRow}>
                  <MaterialCommunityIcons name="office-building" size={20} color="#7C3AED" />
                  <Text style={styles.consigneeInfoAddress}>{packingList.consignee.warehouseAddress}</Text>
                </View>
              </View>
              
              {/* Required Documents Note */}
              <View style={styles.requiredDocs}>
                <MaterialCommunityIcons name="file-document" size={16} color="rgba(255,255,255,0.9)" />
                <Text style={styles.requiredDocsText}>
                  Documents requis pour le retrait: Pièce d'identité valide + Reçu de paiement
                </Text>
              </View>
            </Card.Content>
          </LinearGradient>
        </Card>

        {/* Consignee Card */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="warehouse"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.sectionTitle}>Informations du Destinataire</Text>
            </View>
            <Divider style={styles.sectionDivider} />
            
            <View style={styles.consigneeInfo}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="office-building" size={20} color={COLORS.DimGray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Destinataire</Text>
                  <Text style={styles.infoValue}>{packingList.consignee.name}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="map-marker" size={20} color={COLORS.DimGray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Adresse de l'entrepôt</Text>
                  <Text style={styles.infoValue}>{packingList.consignee.warehouseAddress}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="phone" size={20} color={COLORS.DimGray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Téléphone</Text>
                  <Text style={styles.infoValue}>{packingList.consignee.phone}</Text>
                </View>
              </View>

              {packingList.consignee.businessHours && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="clock-outline" size={20} color={COLORS.DimGray} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Heures d'ouverture</Text>
                    <Text style={styles.infoValue}>{packingList.consignee.businessHours}</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.consigneeActions}>
              <Button
                mode="outlined"
                onPress={() => setContactDialogVisible(true)}
                icon="phone"
                style={styles.actionButton}
                labelStyle={{ color: theme.colors.primary }}
                compact
              >
                Appeler
              </Button>
              <Button
                mode="outlined"
                onPress={handleOpenMaps}
                icon="map-marker"
                style={styles.actionButton}
                labelStyle={{ color: theme.colors.primary }}
                compact
              >
                Voir sur la carte
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Route Card */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="routes"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.sectionTitle}>Itinéraire Détaillé</Text>
            </View>
            <Divider style={styles.sectionDivider} />
            
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, { backgroundColor: theme.colors.primary }]} />
                <View style={styles.routeContent}>
                  <Text style={styles.routeLabel}>Origine</Text>
                  <Text style={styles.routeValue}>{packingList.route.origin}</Text>
                </View>
              </View>
              
              <View style={styles.routeLine}>
                <View style={styles.routeLineBar} />
                <View style={styles.routeTransitInfo}>
                  <MaterialCommunityIcons name="ferry" size={14} color="#64748B" />
                  <Text style={styles.transitDays}>~{packingList.route.estimatedTransitDays} jours</Text>
                </View>
              </View>
              
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, { backgroundColor: '#10B981' }]} />
                <View style={styles.routeContent}>
                  <Text style={styles.routeLabel}>Port d'Arrivée</Text>
                  <Text style={[styles.routeValue, { color: '#059669' }]}>Dakar, Sénégal</Text>
                </View>
              </View>
              
              <View style={styles.routeLine}>
                <View style={styles.routeLineBar} />
                <View style={styles.routeTransitInfo}>
                  <MaterialCommunityIcons name="truck" size={14} color="#64748B" />
                  <Text style={styles.transitDays}>Transport routier</Text>
                </View>
              </View>
              
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, { backgroundColor: COLORS.green }]} />
                <View style={styles.routeContent}>
                  <Text style={styles.routeLabel}>Destination Finale</Text>
                  <Text style={styles.routeValue}>{packingList.route.destination}</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Goods Table Card */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.sectionTitle}>
                Vos Marchandises ({packingList.items.length})
              </Text>
            </View>
            <Divider style={styles.sectionDivider} />

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 0.4 }]}>N°</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>ID / Description</Text>
              <Text style={[styles.tableHeaderCell, { flex: 0.6, textAlign: 'right' }]}>CBM</Text>
              <Text style={[styles.tableHeaderCell, { flex: 0.6, textAlign: 'right' }]}>Poids</Text>
            </View>

            {/* Table Rows */}
            {packingList.items.map((item, index) => (
              <View
                key={item.goodsId}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                  index === packingList.items.length - 1 && styles.tableRowLast,
                ]}
              >
                <Text style={[styles.tableCell, { flex: 0.4, fontWeight: '700' }]}>
                  {index + 1}
                </Text>
                <View style={{ flex: 1.5 }}>
                  <Text style={styles.goodsId} numberOfLines={1}>
                    {item.goodsId}
                  </Text>
                  <Text style={styles.goodsDescription} numberOfLines={2}>
                    {item.description || '-'}
                  </Text>
                </View>
                <Text style={[styles.tableCell, { flex: 0.6, textAlign: 'right' }]}>
                  {item.actualCBM.toFixed(2)}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.6, textAlign: 'right' }]}>
                  {item.weight || 0}kg
                </Text>
              </View>
            ))}

            {/* Summary */}
            <View style={styles.summaryContainer}>
              <Divider style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Marchandises</Text>
                <Text style={styles.summaryValue}>{packingList.summary.totalItems}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Volume Total</Text>
                <Text style={styles.summaryValue}>{packingList.summary.totalCBM.toFixed(2)} m³</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Poids Total</Text>
                <Text style={styles.summaryValue}>{packingList.summary.totalWeight.toFixed(0)} kg</Text>
              </View>
              {packingList.summary.totalPackages > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Nombre de Colis</Text>
                  <Text style={styles.summaryValue}>{packingList.summary.totalPackages}</Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Pickup Instructions */}
        {packingList.pickupInstructions && (
          <Card style={[styles.sectionCard, styles.instructionsCard]}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={24}
                  color={COLORS.orange}
                />
                <Text style={[styles.sectionTitle, { color: COLORS.orange }]}>
                  Instructions de Retrait
                </Text>
              </View>
              <Divider style={styles.sectionDivider} />
              <Text style={styles.instructionsText}>
                {packingList.pickupInstructions}
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <MaterialCommunityIcons
            name="seal-variant"
            size={32}
            color={theme.colors.primary}
          />
          <Text style={styles.footerText}>
            Document généré le {formatDate(packingList.generatedAt)}
          </Text>
          <Text style={styles.footerSubtext}>
            ChinaLink Express - Transport International
          </Text>
          <Text style={styles.footerRoute}>
            Route: Chine → Dakar (Sénégal) → Bamako (Mali)
          </Text>
        </View>

        {/* Bottom padding for fixed footer */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={styles.actionBar}>
        <Button
          mode="outlined"
          onPress={handleShare}
          icon="share-variant"
          style={styles.actionBarButton}
          labelStyle={styles.actionBarButtonLabel}
          disabled={downloadMutation.isPending}
        >
          Partager
        </Button>
        <Button
          mode="contained"
          onPress={handleDownloadPDF}
          icon="download"
          style={[styles.actionBarButton, styles.actionBarButtonPrimary]}
          labelStyle={styles.actionBarButtonLabelPrimary}
          loading={downloadMutation.isPending}
          disabled={downloadMutation.isPending}
        >
          Télécharger PDF
        </Button>
      </View>

      {/* Contact Dialog */}
      <Portal>
        <Dialog
          visible={contactDialogVisible}
          onDismiss={() => setContactDialogVisible(false)}
        >
          <Dialog.Title>Contacter le Destinataire</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              <Text style={styles.dialogLabel}>Nom: </Text>
              {packingList.consignee.name}
            </Text>
            <Text style={styles.dialogText}>
              <Text style={styles.dialogLabel}>Téléphone: </Text>
              {packingList.consignee.phone}
            </Text>
            {packingList.consignee.email && (
              <Text style={styles.dialogText}>
                <Text style={styles.dialogLabel}>Email: </Text>
                {packingList.consignee.email}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setContactDialogVisible(false)}>
              Fermer
            </Button>
            <Button onPress={handleCallConsignee} mode="contained">
              Appeler
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Snackbar for notifications */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  progressBar: {
    height: 3,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: COLORS.DimGray,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
  scrollContent: {
    padding: 16,
  },
  // Route Banner at Top
  routeBannerCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  routeBannerGradient: {
    padding: 4,
  },
  routeBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeBannerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#0369A1',
    marginLeft: 8,
  },
  routeBannerFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeBannerItem: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  routeBannerHighlight: {
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  routeBannerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  routeBannerValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#059669',
    marginTop: 2,
  },
  routeBannerSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: '#64748B',
  },
  routeBannerArrow: {
    paddingHorizontal: 4,
  },
  documentCard: {
    marginBottom: 16,
    elevation: 2,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentTitleContainer: {
    flex: 1,
  },
  documentTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.DarkGrey,
    letterSpacing: 1,
  },
  documentSubtitle: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: COLORS.DimGray,
    marginTop: 4,
  },
  headerDivider: {
    marginVertical: 16,
  },
  documentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginLeft: 6,
  },
  statusCard: {
    marginBottom: 16,
    elevation: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    marginLeft: 8,
  },
  statusValue: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  estimatedText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 4,
    opacity: 0.9,
  },
  routeInfoCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  routeInfoGradient: {
    padding: 4,
  },
  routeInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeInfoTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#0369A1',
    marginLeft: 8,
  },
  routeFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routeFlowItem: {
    alignItems: 'center',
    flex: 1,
  },
  routeFlowHighlight: {
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  routeFlowLabel: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
  },
  routeFlowValue: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: COLORS.DarkGrey,
    marginTop: 2,
    textAlign: 'center',
  },
  routeFlowValueHighlight: {
    color: '#059669',
    fontSize: 14,
  },
  routeFlowSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 9,
    color: '#64748B',
  },
  routeFlowArrow: {
    paddingHorizontal: 4,
  },
  routeInfoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 8,
    borderRadius: 8,
  },
  routeInfoText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
  pickupSectionCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  pickupGradient: {
    padding: 4,
  },
  pickupSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pickupSectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#FFF',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  warehouseMainName: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#FFF',
  },
  warehouseMainAddress: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  pickupDivider: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 12,
  },
  consigneeSectionLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  consigneeInfoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  consigneeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  consigneeInfoName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginLeft: 12,
  },
  consigneeInfoPhone: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: '#7C3AED',
    marginLeft: 12,
  },
  consigneeInfoAddress: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginLeft: 12,
    flex: 1,
  },
  requiredDocs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredDocsText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    color: '#FFF',
    marginLeft: 8,
    flex: 1,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginLeft: 12,
  },
  sectionDivider: {
    marginBottom: 16,
  },
  consigneeInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.SlateGray,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: COLORS.DarkGrey,
    lineHeight: 20,
  },
  consigneeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderColor: '#DDD',
  },
  routeContainer: {
    paddingHorizontal: 8,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  routeContent: {
    marginLeft: 16,
  },
  routeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.SlateGray,
  },
  routeValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    marginVertical: 8,
  },
  routeLineBar: {
    width: 2,
    height: 30,
    backgroundColor: COLORS.Silver,
  },
  routeTransitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  transitDays: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginLeft: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: COLORS.DarkGrey,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableRowEven: {
    backgroundColor: '#FFFFFF',
  },
  tableRowOdd: {
    backgroundColor: '#F8FAFC',
  },
  tableRowLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0,
  },
  tableCell: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DarkGrey,
  },
  goodsId: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: COLORS.DarkGrey,
  },
  goodsDescription: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: COLORS.DimGray,
    marginTop: 2,
  },
  summaryContainer: {
    marginTop: 16,
  },
  summaryDivider: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DimGray,
  },
  summaryValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
  instructionsCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
  },
  instructionsText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DarkGrey,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginTop: 8,
  },
  footerSubtext: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: COLORS.DarkGrey,
    marginTop: 4,
  },
  footerRoute: {
    fontFamily: Fonts.meduim,
    fontSize: 11,
    color: COLORS.SlateGray,
    marginTop: 4,
  },
  bottomPadding: {
    height: 80,
  },
  dialogText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Fonts.regular,
  },
  dialogLabel: {
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  // Fixed Action Bar
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionBarButton: {
    flex: 1,
    borderColor: COLORS.primary,
  },
  actionBarButtonPrimary: {
    backgroundColor: COLORS.primary,
  },
  actionBarButtonLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
  },
  actionBarButtonLabelPrimary: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default ClientPackingListScreen;
