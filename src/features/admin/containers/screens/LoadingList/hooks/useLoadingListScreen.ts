import { useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetContainerById } from '../../../hooks';
import { Container } from '../../../types';
import { Goods } from '../../../../goods/types';
import {
  AdminLoadingListData,
  LoadingListItem,
  getClientColor,
} from '../../../types/packingList';

// Navigation types
export type AdminV2StackParamList = {
  ContainerDetail: { containerId: string };
  PackingList: { containerId: string };
  LoadingList: { containerId: string };
};

export type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

// Constants
export const MAX_CBM = 67;

// Shipping labels for PDF
const SHIPPING_MODE_LABELS: Record<string, string> = {
  sea: 'Maritime',
  air: 'Aérien',
  land: 'Terrestre',
};

const SHIPPING_LINE_LABELS: Record<string, string> = {
  'cosco': 'COSCO',
  'maersk': 'Maersk',
  'msc': 'MSC',
  'cma-cgm': 'CMA CGM',
  'evergreen': 'Evergreen',
  'one': 'ONE',
  'hapag-lloyd': 'Hapag-Lloyd',
  'other': 'Autre',
};

export const useLoadingListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { containerId } = route.params as { containerId: string };

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [loadedItems, setLoadedItems] = useState<Set<string>>(new Set());

  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;

  // Process loading list data
  const loadingListData: AdminLoadingListData | null = useMemo(() => {
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
          maxCBM: MAX_CBM,
          loadedItems: 0,
          remainingItems: 0,
          loadedCBM: 0,
          remainingCBM: MAX_CBM,
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
        maxCBM: MAX_CBM,
        loadedItems: items.filter((item) => item.isLoaded).length,
        remainingItems: items.filter((item) => !item.isLoaded).length,
        loadedCBM,
        remainingCBM: totalCBM - loadedCBM,
      },
    };
  }, [container, loadedItems]);

  // Calculate weight distribution
  const weightDistribution = useMemo(() => {
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
  }, [loadingListData]);

  const progressPercentage = (loadingListData?.summary?.totalItems ?? 0) > 0
    ? ((loadingListData?.summary?.loadedItems ?? 0) / (loadingListData?.summary?.totalItems ?? 1)) * 100
    : 0;

  const handleToggleLoaded = useCallback((goodsId: string, isLoaded: boolean) => {
    setLoadedItems((prev) => {
      const newSet = new Set(prev);
      if (isLoaded) {
        newSet.add(goodsId);
      } else {
        newSet.delete(goodsId);
      }
      return newSet;
    });
  }, []);

  const handleMarkAllLoaded = useCallback(() => {
    if (!loadingListData) return;
    const allIds = new Set(loadingListData.items.map((item) => item.goods._id));
    setLoadedItems(allIds);
  }, [loadingListData]);

  const handleResetLoading = useCallback(() => {
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
  }, []);

  const handlePrint = useCallback(async () => {
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
              <div class="info-value">${SHIPPING_MODE_LABELS[container.shippingMode] || container.shippingMode}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Compagnie</div>
              <div class="info-value">${SHIPPING_LINE_LABELS[container.shippingLine] || container.shippingLine}</div>
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

      setIsGeneratingPDF(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
      setIsGeneratingPDF(false);
    }
  }, [loadingListData]);

  return {
    containerId,
    container,
    navigation,
    isContainerLoading,
    isGeneratingPDF,
    setIsGeneratingPDF,
    loadedItems,
    setLoadedItems,
    loadingListData,
    weightDistribution,
    progressPercentage,
    handleToggleLoaded,
    handleMarkAllLoaded,
    handleResetLoading,
    handlePrint,
  };
};
