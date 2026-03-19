import { useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetContainerById, useGetPackingList } from '../../../hooks';
import { Container } from '../../../types';
import { Goods } from '../../../../goods/types';
import {
  AdminLoadingListData,
  LoadingListItem,
  getClientColor,
  ClientGoodsGroup,
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
  const params = route.params as { containerId: string; clientId?: string } | undefined;
  const containerId = params?.containerId || '';
  const initialClientId = params?.clientId || null;

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [loadedItems, setLoadedItems] = useState<Set<string>>(new Set());
  
  // State for client filtering (for walk-in customers)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(initialClientId);

  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;
  
  // Fetch packing list to get client info (names, phone)
  const { data: packingListResponse, isLoading: isPackingListLoading } = useGetPackingList(containerId);
  
  console.log('[DEBUG] Packing list loading:', isPackingListLoading);
  console.log('[DEBUG] Packing list response:', packingListResponse ? 'has data' : 'no data');
  
  // Create a map of clientId -> client info from packing list
  const clientInfoMap = useMemo(() => {
    const map = new Map<string, ClientGoodsGroup>();
    const packingData = packingListResponse?.data?.data || packingListResponse?.data;
    console.log('[DEBUG] Packing list data:', packingData);
    console.log('[DEBUG] Packing list clients:', packingData?.clients);
    if (packingData?.clients) {
      packingData.clients.forEach((client: ClientGoodsGroup) => {
        console.log('[DEBUG] Adding client to map:', client.clientId, client.clientName);
        map.set(String(client.clientId), client);
      });
    }
    console.log('[DEBUG] Client info map size:', map.size);
    return map;
  }, [packingListResponse]);

  // Process loading list data
  const loadingListData: AdminLoadingListData | null = useMemo(() => {
    if (!container) return null;

    // Use packing list goods which have client info populated
    const packingData = packingListResponse?.data?.data || packingListResponse?.data;
    let goodsList: any[] = [];
    
    if (packingData?.clients) {
      // Flatten goods from all clients in packing list
      packingData.clients.forEach((client: any) => {
        if (client.goods) {
          client.goods.forEach((goods: any) => {
            goodsList.push({
              ...goods,
              clientId: client.clientId,
              clientName: client.clientName,
            });
          });
        }
      });
    }
    
    // Fallback to container goods if packing list not available
    if (goodsList.length === 0) {
      const goodsIds = (container as any).goodsIds;
      goodsList = Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object'
        ? (goodsIds as Goods[])
        : (container.goods || []);
    }

    console.log('[DEBUG] Final goods count:', goodsList.length);
    if (goodsList.length > 0) {
      console.log('[DEBUG] First goods:', JSON.stringify(goodsList[0], null, 2));
    }

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
      // Extract client ID (now directly on goods from packing list)
      const clientId = (goods as any).clientId || 'unknown';
      uniqueClients.add(clientId);
    });

    Array.from(uniqueClients).forEach((clientId, index) => {
      clientColorMap.set(clientId, getClientColor(index));
    });

    // Sort goods by weight (heaviest first for loading)
    const sortedGoods = [...goodsList].sort((a, b) => (b.weight || 0) - (a.weight || 0));

    // Create loading items
    const items: LoadingListItem[] = sortedGoods.map((goods, index) => {
      // Get client info directly from goods (populated from packing list)
      const clientId = (goods as any).clientId || 'unknown';
      const clientName = (goods as any).clientName || 'Client Inconnu';

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
  }, [container, loadedItems, clientInfoMap]);

  // Filter data for single client view (walk-in customers)
  const filteredLoadingListData = useMemo(() => {
    if (!loadingListData) return null;
    if (!selectedClientId) return loadingListData; // Show all clients

    // Normalize IDs for comparison (handle both string and ObjectId)
    const normalizeId = (id: any) => String(id).trim();
    const targetId = normalizeId(selectedClientId);
    
    const filteredItems = loadingListData.items.filter(
      (item) => normalizeId(item.clientId) === targetId
    );
    
    // Debug: Show sample IDs if filter fails
    if (filteredItems.length === 0 && loadingListData.items.length > 0) {
      const sampleIds = loadingListData.items.slice(0, 3).map(i => i.clientId);
      console.warn('[LoadingList] Filter failed. Target:', targetId, 'Samples:', sampleIds);
    }
    
    // If no items found, return all data (don't break the UI)
    if (filteredItems.length === 0) {
      return loadingListData;
    }

    // Recalculate summary for single client
    const totalCBM = filteredItems.reduce((sum, item) => sum + (item.goods.actualCBM || 0), 0);
    const totalWeight = filteredItems.reduce((sum, item) => sum + (item.goods.weight || 0), 0);
    const loadedItems = filteredItems.filter((item) => item.isLoaded).length;
    const loadedCBM = filteredItems
      .filter((item) => item.isLoaded)
      .reduce((sum, item) => sum + (item.goods.actualCBM || 0), 0);
    
    return {
      ...loadingListData,
      items: filteredItems,
      summary: {
        ...loadingListData.summary,
        totalItems: filteredItems.length,
        totalPackages: filteredItems.length,
        totalCBM,
        totalWeight,
        loadedItems,
        remainingItems: filteredItems.length - loadedItems,
        loadedCBM,
        remainingCBM: totalCBM - loadedCBM,
        capacityPercentage: (totalCBM / MAX_CBM) * 100,
      },
      isSingleClientView: true,
      singleClientName: filteredItems[0]?.clientName,
    };
  }, [loadingListData, selectedClientId]);

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
    if (!filteredLoadingListData) return;
    setIsGeneratingPDF(true);

    try {
      const { container, items, summary, isSingleClientView, singleClientName } = filteredLoadingListData;
      
      // Single client header banner for PDF
      const singleClientBannerHtml = isSingleClientView ? `
        <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 8px; padding: 12px; margin-bottom: 16px; text-align: center;">
          <div style="font-size: 14px; font-weight: 700; color: #166534;">📋 COPIE CLIENT INDIVIDUEL</div>
          <div style="font-size: 12px; color: #166534; margin-top: 4px;">Client: ${singleClientName}</div>
          <div style="font-size: 10px; color: #6b7280; margin-top: 2px;">Ce document ne contient que vos marchandises</div>
        </div>
      ` : '';

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

          <!-- CONSIGNEE & PICKUP INFO -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <div>
                <div style="font-size: 10px; color: #0369a1; text-transform: uppercase; margin-bottom: 4px;">📍 Point de Retrait</div>
                <div style="font-size: 13px; font-weight: 600; color: #0c4a6e;">${(container as any).consignee?.warehouseAddress || 'ChinaLink Express Warehouse - Bamako'}</div>
              </div>
              <div>
                <div style="font-size: 10px; color: #0369a1; text-transform: uppercase; margin-bottom: 4px;">👤 Consignataire</div>
                <div style="font-size: 13px; font-weight: 600; color: #0c4a6e;">${(container as any).consignee?.name || 'N/A'}</div>
                <div style="font-size: 12px; color: #0369a1;">📞 ${(container as any).consignee?.phone || 'N/A'}</div>
              </div>
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

          <!-- PAYMENT INFO & CONTACT -->
          <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin: 24px 0;">
            <div style="font-size: 14px; font-weight: 700; color: #92400e; margin-bottom: 8px; text-align: center;">
              💳 PAIEMENT EN AVANCE
            </div>
            <div style="font-size: 12px; color: #78350f; text-align: center; line-height: 1.6;">
              Pour effectuer un paiement anticipé ou régler votre solde,<br>
              veuillez contacter le consignataire:<br>
              <strong style="font-size: 14px; color: #92400e;">${(container as any).consignee?.name || 'N/A'}</strong><br>
              📞 <strong>${(container as any).consignee?.phone || 'N/A'}</strong>
            </div>
          </div>

          <div class="footer">
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p><strong>ChinaLink Express</strong> - Transport International</p>
            <p>Bamako, Mali | Tél: ${(container as any).consignee?.phone || '+223 XX XX XX XX'}</p>
          </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      // Share PDF using legacy API for SDK 55 compatibility
      const { sharePDFFromUri } = require('../../../../../../shared/lib/pdfShare');
      await sharePDFFromUri({
        uri,
        filename: `LoadingList_${container.virtualContainerNumber}_${Date.now()}.pdf`,
        dialogTitle: `Plan de Chargement - ${container.virtualContainerNumber}`,
      });

      setIsGeneratingPDF(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
      setIsGeneratingPDF(false);
    }
  }, [filteredLoadingListData]);

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
    // Single client filtering (for walk-in customers)
    filteredLoadingListData,
    selectedClientId,
    setSelectedClientId,
    weightDistribution,
    progressPercentage,
    handleToggleLoaded,
    handleMarkAllLoaded,
    handleResetLoading,
    handlePrint,
  };
};
