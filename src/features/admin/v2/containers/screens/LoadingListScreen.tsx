/**
 * LoadingListScreen - Admin Loading List with sequence visualization
 * Shows loading order with client color coding and status toggle
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useGetContainerById } from '../hooks';
import {
  Container,
  SHIPPING_LINE_LABELS,
  SHIPPING_MODE_LABELS,
} from '../types';
import { Goods } from '../../goods/types';
import { Theme } from '@src/constants/Theme';
import {
  AdminLoadingListData,
  LoadingListItem,
  WeightDistribution,
  getClientColor,
} from '../types/packingList';
import { LoadingSequenceItem } from '../components/LoadingSequenceItem';
import { CapacityUsageBar } from '../components/CapacityUsageBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_CBM = 67;

type AdminV2StackParamList = {
  ContainerDetail: { containerId: string };
  PackingList: { containerId: string };
  LoadingList: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const LoadingListScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { containerId } = route.params as { containerId: string };

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [loadedItems, setLoadedItems] = useState<Set<string>>(new Set());

  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;

  // Process loading list data
  const loadingListData: AdminLoadingListData | null = (() => {
    if (!container) return null;

    const goodsIds = (container as any).goodsIds;
    const goodsList: Goods[] = Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object'
      ? (goodsIds as Goods[])
      : (container.goods || []);

    if (goodsList.length === 0) {
      return {
        container,
        items: [],
        clientColors: {},
        summary: {
          totalCBM: 0,
          totalWeight: 0,
          totalItems: 0,
          totalPackages: 0,
          capacityPercentage: 0,
          remainingCBM: MAX_CBM,
          maxCBM: MAX_CBM,
          loadedItems: 0,
          remainingItems: 0,
          loadedCBM: 0,
          remainingCBM: 0,
        },
      };
    }

    // Assign colors to clients
    const clientColorMap = new Map<string, string>();
    const uniqueClients = new Set<string>();

    goodsList.forEach((goods) => {
      const client = typeof goods.clientId === 'object' ? goods.clientId : null;
      const clientId = client?._id || (goods.clientId as string) || 'unknown';
      uniqueClients.add(clientId);
    });

    Array.from(uniqueClients).forEach((clientId, index) => {
      clientColorMap.set(clientId, getClientColor(index));
    });

    // Sort goods by weight (heaviest first for loading)
    const sortedGoods = [...goodsList].sort((a, b) => (b.weight || 0) - (a.weight || 0));

    // Create loading items
    const items: LoadingListItem[] = sortedGoods.map((goods, index) => {
      const client = typeof goods.clientId === 'object' ? goods.clientId : null;
      const clientId = client?._id || (goods.clientId as string) || 'unknown';
      const clientName = client
        ? `${client.firstName} ${client.lastName}`
        : 'Client Inconnu';

      return {
        sequenceNumber: index + 1,
        goods,
        clientId,
        clientName,
        clientColor: clientColorMap.get(clientId) || '#8B5CF6',
        isLoaded: loadedItems.has(goods._id),
      };
    });

    // Calculate summary
    const totalCBM = container.totalCBM || 0;
    const loadedCBM = items
      .filter((item) => item.isLoaded)
      .reduce((sum, item) => sum + (item.goods.actualCBM || 0), 0);

    return {
      container,
      items,
      clientColors: Object.fromEntries(clientColorMap),
      summary: {
        totalCBM,
        totalWeight: items.reduce((sum, item) => sum + (item.goods.weight || 0), 0),
        totalItems: goodsList.length,
        totalPackages: items.reduce((sum, item) => sum + (item.goods.quantity || 1), 0),
        capacityPercentage: (totalCBM / MAX_CBM) * 100,
        remainingCBM: Math.max(MAX_CBM - totalCBM, 0),
        maxCBM: MAX_CBM,
        loadedItems: items.filter((item) => item.isLoaded).length,
        remainingItems: items.filter((item) => !item.isLoaded).length,
        loadedCBM,
        remainingCBM: totalCBM - loadedCBM,
      },
    };
  })();

  // Calculate weight distribution
  const weightDistribution: WeightDistribution[] = (() => {
    if (!loadingListData) return [];

    const clientWeights = new Map<string, { name: string; weight: number; color: string }>();

    loadingListData.items.forEach((item) => {
      const existing = clientWeights.get(item.clientId);
      if (existing) {
        existing.weight += item.goods.weight || 0;
      } else {
        clientWeights.set(item.clientId, {
          name: item.clientName,
          weight: item.goods.weight || 0,
          color: item.clientColor,
        });
      }
    });

    const totalWeight = loadingListData.summary.totalWeight;

    return Array.from(clientWeights.entries())
      .map(([clientId, data]) => ({
        clientId,
        clientName: data.name,
        weight: data.weight,
        percentage: totalWeight > 0 ? (data.weight / totalWeight) * 100 : 0,
        color: data.color,
      }))
      .sort((a, b) => b.weight - a.weight);
  })();

  const handleToggleLoaded = (goodsId: string, isLoaded: boolean) => {
    setLoadedItems((prev) => {
      const newSet = new Set(prev);
      if (isLoaded) {
        newSet.add(goodsId);
      } else {
        newSet.delete(goodsId);
      }
      return newSet;
    });
  };

  const handleMarkAllLoaded = () => {
    if (!loadingListData) return;
    const allIds = new Set(loadingListData.items.map((item) => item.goods._id));
    setLoadedItems(allIds);
  };

  const handleResetLoading = () => {
    Alert.alert(
      'Réinitialiser le chargement',
      'Êtes-vous sûr de vouloir réinitialiser le statut de chargement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => setLoadedItems(new Set()),
        },
      ]
    );
  };

  const handlePrint = async () => {
    if (!loadingListData) return;
    setIsGeneratingPDF(true);

    try {
      const { container, items, summary } = loadingListData;

      // Generate HTML for PDF
      const itemsHtml = items.map((item) => `
        <tr style="background: ${item.isLoaded ? '#f0fdf4' : '#ffffff'}; border-left: 4px solid ${item.clientColor};">
          <td style="padding: 10px 12px; font-size: 14px; font-weight: 700; color: #166534;">${item.sequenceNumber}</td>
          <td style="padding: 10px 12px; font-size: 12px; color: #374151; font-family: monospace;">${item.goods.goodsId}</td>
          <td style="padding: 10px 12px; font-size: 12px; color: #4b5563;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${item.clientColor};"></div>
              <span>${item.clientName}</span>
            </div>
          </td>
          <td style="padding: 10px 12px; font-size: 12px; color: #4b5563;">${item.goods.description || '-'}</td>
          <td style="padding: 10px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 600;">${(item.goods.actualCBM || 0).toFixed(2)} m³</td>
          <td style="padding: 10px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 600;">${(item.goods.weight || 0).toFixed(0)} kg</td>
          <td style="padding: 10px 12px; text-align: center;">
            <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: ${item.isLoaded ? '#d1fae5' : '#f3f4f6'}; color: ${item.isLoaded ? '#059669' : '#6b7280'};">
              ${item.isLoaded ? '✓ CHARGÉ' : 'En attente'}
            </span>
          </td>
        </tr>
      `).join('');

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Plan de Chargement - ${container.virtualContainerNumber}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; color: #1f2937; }
            .header { text-align: center; margin-bottom: 30px; padding: 24px; background: linear-gradient(135deg, #d97706, #b45309); border-radius: 12px; color: white; }
            .header h1 { margin: 0 0 8px 0; font-size: 24px; letter-spacing: 2px; }
            .header p { margin: 0; opacity: 0.9; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 30px; }
            .info-item { background: #f9fafb; padding: 12px 16px; border-radius: 8px; }
            .info-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .info-value { font-size: 14px; font-weight: 600; color: #374151; }
            .progress-section { background: #fffbeb; padding: 20px; border-radius: 12px; margin-bottom: 30px; border: 2px solid #fcd34d; }
            .progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
            .progress-title { font-size: 16px; font-weight: 700; color: #92400e; }
            .progress-value { font-size: 24px; font-weight: 800; color: #d97706; }
            .progress-bar { height: 24px; background: #fef3c7; border-radius: 12px; overflow: hidden; }
            .progress-fill { height: 100%; background: linear-gradient(90deg, #d97706, #f59e0b); border-radius: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #fffbeb; padding: 12px; text-align: left; font-size: 11px; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #fcd34d; }
            td { border-bottom: 1px solid #e5e7eb; }
            .footer { margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .footer p { margin: 4px 0; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📋 PLAN DE CHARGEMENT</h1>
            <p>${container.virtualContainerNumber}</p>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Route</div>
              <div class="info-value">Chine → Bamako</div>
            </div>
            <div class="info-item">
              <div class="info-label">Mode</div>
              <div class="info-value">${SHIPPING_MODE_LABELS[container.shippingMode]}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Compagnie</div>
              <div class="info-value">${SHIPPING_LINE_LABELS[container.shippingLine]}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Date</div>
              <div class="info-value">${new Date().toLocaleDateString('fr-FR')}</div>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-header">
              <span class="progress-title">Progression du Chargement</span>
              <span class="progress-value">${summary.loadedItems} / ${summary.totalItems}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${summary.totalItems > 0 ? (summary.loadedItems / summary.totalItems) * 100 : 0}%;"></div>
            </div>
            <div style="margin-top: 12px; display: flex; justify-content: space-between; font-size: 13px; color: #92400e;">
              <span>Chargé: ${summary.loadedCBM.toFixed(2)} m³</span>
              <span>Restant: ${summary.remainingCBM.toFixed(2)} m³</span>
            </div>
          </div>

          <h2 style="color: #92400e; font-size: 18px; margin-bottom: 16px;">🚛 Séquence de Chargement</h2>
          <p style="color: #6b7280; font-size: 12px; margin-bottom: 16px;">Ordre: Du plus lourd au plus léger pour une meilleure stabilité</p>

          <table>
            <thead>
              <tr>
                <th style="width: 50px;">N°</th>
                <th style="width: 100px;">ID</th>
                <th style="width: 120px;">Client</th>
                <th>Description</th>
                <th style="width: 80px; text-align: right;">CBM</th>
                <th style="width: 80px; text-align: right;">Poids</th>
                <th style="width: 100px; text-align: center;">Statut</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="footer">
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p><strong>ChinaLink Express</strong> - Transport International</p>
          </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Plan de Chargement - ${container.virtualContainerNumber}`,
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('PDF Généré', `Fichier sauvegardé: ${uri}`);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isContainerLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.status.warning} />
          <Text style={styles.loadingText}>Chargement du plan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!container || !loadingListData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
          <Text style={styles.errorText}>Container non trouvé</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { items, summary, clientColors } = loadingListData;
  const progressPercentage = summary.totalItems > 0
    ? (summary.loadedItems / summary.totalItems) * 100
    : 0;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <LinearGradient
        colors={['#D97706', '#B45309']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plan de Chargement</Text>
          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => navigation.navigate('PackingList', { containerId })}
          >
            <Ionicons name="document-text" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          {container.virtualContainerNumber}
        </Text>
        <Text style={styles.headerMeta}>
          {items.length} articles • Ordre: Poids décroissant
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Loading Progress */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressTitleContainer}>
                <Ionicons name="timer" size={20} color="#D97706" />
                <Text style={styles.progressTitle}>Progression</Text>
              </View>
              <Text style={styles.progressValue}>
                {summary.loadedItems} <Text style={styles.progressTotal}>/ {summary.totalItems}</Text>
              </Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <LinearGradient
                  colors={['#D97706', '#F59E0B']}
                  style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}%</Text>
            </View>

            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Ionicons name="checkmark-circle" size={16} color={Theme.status.success} />
                <Text style={styles.progressStatText}>
                  {summary.loadedCBM.toFixed(2)} m³ chargé
                </Text>
              </View>
              <View style={styles.progressStat}>
                <Ionicons name="time" size={16} color={Theme.neutral[400]} />
                <Text style={styles.progressStatText}>
                  {summary.remainingCBM.toFixed(2)} m³ restant
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Capacity Usage */}
        <Animated.View entering={FadeInUp.delay(150)}>
          <View style={styles.capacityCard}>
            <CapacityUsageBar
              used={summary.totalCBM}
              max={MAX_CBM}
              unit="m³"
              showPercentage
              showLabels
              height={24}
              variant="cbm"
            />
          </View>
        </Animated.View>

        {/* Client Legend */}
        {Object.keys(clientColors).length > 0 && (
          <Animated.View entering={FadeInUp.delay(200)} style={styles.legendCard}>
            <Text style={styles.legendTitle}>Code Couleur Clients</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.legendItems}>
                {weightDistribution.map((client) => (
                  <View key={client.clientId} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: client.color }]} />
                    <Text style={styles.legendName} numberOfLines={1}>
                      {client.clientName}
                    </Text>
                    <Text style={styles.legendWeight}>{client.weight.toFixed(0)} kg</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        )}

        {/* Loading Sequence */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name="list-number" size={18} color={Theme.neutral[600]} />
            <Text style={styles.sectionHeaderTitle}>Séquence de Chargement</Text>
          </View>
          <Text style={styles.sectionHeaderSubtitle}>Du plus lourd au plus léger</Text>
        </View>

        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color={Theme.neutral[400]} />
            <Text style={styles.emptyTitle}>Aucune marchandise</Text>
            <Text style={styles.emptySubtitle}>
              Ce container est vide
            </Text>
          </View>
        ) : (
          <View style={styles.loadingList}>
            {items.map((item, index) => (
              <LoadingSequenceItem
                key={item.goods._id}
                item={item}
                index={index}
                onToggleLoaded={handleToggleLoaded}
              />
            ))}
          </View>
        )}

        {/* Spacer for scroll */}
        <View style={{ height: Theme.spacing['4xl'] }} />
      </ScrollView>

      {/* Action Buttons */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleResetLoading}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#FEE2E2', '#FECACA']}
            style={styles.actionGradientSecondary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="refresh" size={18} color={Theme.status.error} />
            <Text style={styles.actionButtonTextSecondary}>Réinitialiser</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleMarkAllLoaded}
          disabled={summary.loadedItems === summary.totalItems}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#D1FAE5', '#A7F3D0']}
            style={[styles.actionGradientSecondary, summary.loadedItems === summary.totalItems && styles.actionGradientDisabled]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="checkmark-done" size={18} color={Theme.status.success} />
            <Text style={styles.actionButtonTextSuccess}>Tout charger</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonPrimary]}
          onPress={handlePrint}
          disabled={items.length === 0 || isGeneratingPDF}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#D97706', '#B45309']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isGeneratingPDF ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Ionicons name="print" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>PDF</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: 16,
    color: Theme.neutral[500],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing['2xl'],
  },
  errorText: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  backButton: {
    marginTop: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    backgroundColor: Theme.primary[500],
    borderRadius: Theme.radius.lg,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginTop: Theme.spacing.md,
  },
  headerMeta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  progressCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  progressTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D97706',
  },
  progressTotal: {
    fontSize: 16,
    fontWeight: '500',
    color: Theme.neutral[400],
  },
  progressBarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  progressBarBackground: {
    height: 28,
    backgroundColor: '#FEF3C7',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  progressPercentage: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 13,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressStatText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  capacityCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  legendCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.md,
  },
  legendItems: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Theme.neutral[50],
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Theme.radius.full,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendName: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[700],
    maxWidth: 100,
  },
  legendWeight: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  sectionHeaderSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
    fontStyle: 'italic',
  },
  emptyState: {
    padding: Theme.spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  emptySubtitle: {
    marginTop: Theme.spacing.xs,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
  },
  loadingList: {
    paddingLeft: Theme.spacing.sm,
  },
  actionBar: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    backgroundColor: Theme.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  actionButton: {
    flex: 1,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  actionButtonPrimary: {
    flex: 0.8,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  actionGradientSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.xs,
  },
  actionGradientDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  actionButtonTextSecondary: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.status.error,
  },
  actionButtonTextSuccess: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.status.success,
  },
});

export default LoadingListScreen;
