import { useState, useRef, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert, Share } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useGetContainerById } from '../../../hooks/useContainers';
import { Container, SHIPPING_MODE_LABELS, SHIPPING_LINE_LABELS } from '../../../types';
import { Goods } from '../../../../goods/types';
import { AdminPackingListData, ClientGoodsGroup, ContainerSummary, getClientColor } from '../../../types/packingList';

export const MAX_CBM = 67;

export type AdminV2StackParamList = {
  ContainerDetail: { containerId: string };
  PackingList: { containerId: string };
  LoadingList: { containerId: string };
};

export type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const usePackingListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { containerId } = route.params as { containerId: string };
  const documentRef = useRef<View>(null);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [allExpanded, setAllExpanded] = useState(true);

  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;

  const packingListData: AdminPackingListData | null = useMemo(() => {
    if (!container) return null;

    const goodsIds = (container as any).goodsIds;
    const goodsList: Goods[] = Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object'
      ? (goodsIds as Goods[])
      : (container.goods || []);

    if (goodsList.length === 0) {
      return {
        container,
        clients: [],
        summary: {
          totalCBM: 0,
          totalWeight: 0,
          totalItems: 0,
          totalPackages: 0,
          capacityPercentage: 0,
          remainingCBM: MAX_CBM,
          maxCBM: MAX_CBM,
        },
        generatedAt: new Date().toISOString(),
        generatedBy: 'Admin',
      };
    }

    const clientMap = new Map<string, ClientGoodsGroup>();

    goodsList.forEach((goods) => {
      const client = typeof goods.clientId === 'object' ? goods.clientId : null;
      const clientId = client?._id || (goods.clientId as string) || 'unknown';
      const clientName = client ? `${client.firstName} ${client.lastName}` : 'Client Inconnu';
      const clientPhone = client?.phoneNumber || 'N/A';

      if (!clientMap.has(clientId)) {
        clientMap.set(clientId, {
          clientId,
          clientName,
          clientPhone,
          goods: [],
          summary: {
            totalCBM: 0,
            totalWeight: 0,
            totalItems: 0,
            totalQuantity: 0,
          },
        });
      }

      const group = clientMap.get(clientId)!;
      group.goods.push(goods);
      group.summary.totalCBM += goods.actualCBM || 0;
      group.summary.totalWeight += goods.weight || 0;
      group.summary.totalItems += 1;
      group.summary.totalQuantity += goods.quantity || 1;
    });

    const clients = Array.from(clientMap.values());

    const summary: ContainerSummary = {
      totalCBM: container.totalCBM || 0,
      totalWeight: clients.reduce((sum, c) => sum + c.summary.totalWeight, 0),
      totalItems: goodsList.length,
      totalPackages: clients.reduce((sum, c) => sum + c.summary.totalQuantity, 0),
      capacityPercentage: ((container.totalCBM || 0) / MAX_CBM) * 100,
      remainingCBM: Math.max(MAX_CBM - (container.totalCBM || 0), 0),
      maxCBM: MAX_CBM,
    };

    return {
      container,
      clients,
      summary,
      generatedAt: new Date().toISOString(),
      generatedBy: 'Admin',
    };
  }, [container]);

  const handlePrint = useCallback(async () => {
    if (!packingListData) return;
    setIsGeneratingPDF(true);

    try {
      const { container, clients, summary } = packingListData;

      const clientRowsHtml = clients.map((client, cIndex) => `
        <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f0fdf4, #ffffff); padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="margin: 0; color: #166534; font-size: 16px;">${client.clientName}</h3>
                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">📞 ${client.clientPhone}</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${client.goods.length}</div>
                <div style="font-size: 11px; color: #6b7280;">colis</div>
              </div>
            </div>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">N°</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">ID</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">Description</th>
                <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">CBM</th>
                <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">Poids</th>
              </tr>
            </thead>
            <tbody>
              ${client.goods.map((item, index) => `
                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                  <td style="padding: 8px 12px; font-size: 12px; color: #16a34a; font-weight: 600;">${index + 1}</td>
                  <td style="padding: 8px 12px; font-size: 11px; color: #374151; font-family: monospace;">${item.goodsId}</td>
                  <td style="padding: 8px 12px; font-size: 12px; color: #4b5563;">${item.description || '-'}</td>
                  <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.actualCBM || 0).toFixed(2)}</td>
                  <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.weight || 0).toFixed(0)} kg</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="background: #f0fdf4; padding: 10px 16px; border-top: 2px solid #bbf7d0;">
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span style="color: #166534; font-weight: 600;">Sous-total Client:</span>
              <span style="color: #166534; font-weight: 700;">${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg</span>
            </div>
          </div>
        </div>
      `).join('');

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Liste de Colisage - ${container.virtualContainerNumber}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; color: #1f2937; }
            .header { text-align: center; margin-bottom: 30px; padding: 24px; background: linear-gradient(135deg, #16a34a, #166534); border-radius: 12px; color: white; }
            .header h1 { margin: 0 0 8px 0; font-size: 24px; letter-spacing: 2px; }
            .header p { margin: 0; opacity: 0.9; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 30px; }
            .info-item { background: #f9fafb; padding: 12px 16px; border-radius: 8px; }
            .info-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .info-value { font-size: 14px; font-weight: 600; color: #374151; }
            .totals { background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 20px; border-radius: 12px; margin-top: 30px; border: 2px solid #bbf7d0; }
            .totals-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .totals-label { font-size: 14px; color: #166534; }
            .totals-value { font-size: 14px; font-weight: 700; color: #166534; }
            .footer { margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .footer p { margin: 4px 0; font-size: 12px; color: #6b7280; }
            .signature-section { margin-top: 40px; display: flex; justify-content: space-between; }
            .signature-box { width: 45%; text-align: center; }
            .signature-line { border-bottom: 1px solid #d1d5db; height: 60px; margin-bottom: 8px; }
            .signature-label { font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LISTE DE COLISAGE</h1>
            <p>${container.virtualContainerNumber}</p>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Route</div>
              <div class="info-value">Chine → Bamako</div>
            </div>
            <div class="info-item">
              <div class="info-label">Mode</div>
              <div class="info-value">${container.shippingMode}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Compagnie</div>
              <div class="info-value">${container.shippingLine}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Date</div>
              <div class="info-value">${new Date().toLocaleDateString('fr-FR')}</div>
            </div>
          </div>

          <h2 style="color: #166534; font-size: 18px; margin-bottom: 16px;">📦 Marchandises par Client</h2>
          ${clientRowsHtml}

          <div class="totals">
            <div class="totals-row">
              <span class="totals-label">Total Marchandises:</span>
              <span class="totals-value">${summary.totalItems} colis (${summary.totalPackages} articles)</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">Volume Total:</span>
              <span class="totals-value">${summary.totalCBM.toFixed(2)} m³ (${summary.capacityPercentage.toFixed(1)}% utilisé)</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">Poids Total:</span>
              <span class="totals-value">${summary.totalWeight.toFixed(0)} kg</span>
            </div>
          </div>

          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Signature du Client</div>
            </div>
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Signature Admin</div>
            </div>
          </div>

          <div class="footer">
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p><strong>ChinaLink Express</strong> - Transport International</p>
            <p>Bamako, Mali | Tél: +223 XX XX XX XX</p>
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
          dialogTitle: `Liste de Colisage - ${container.virtualContainerNumber}`,
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
  }, [packingListData]);

  // Handler: Share packing list
  const handleShare = useCallback(async () => {
    if (!packingListData) return;

    const { container, clients, summary } = packingListData;

    const lines: string[] = [];
    lines.push('╔════════════════════════════════════════════════╗');
    lines.push('║         CHINALINK EXPRESS - LISTE DE COLISAGE  ║');
    lines.push('╚════════════════════════════════════════════════╝');
    lines.push('');
    lines.push(`📦 Container: ${container.virtualContainerNumber}`);
    lines.push(`🚢 Route: Chine → Bamako`);
    lines.push(`🛳️ Mode: ${SHIPPING_MODE_LABELS[container.shippingMode]}`);
    lines.push(`🏢 Compagnie: ${SHIPPING_LINE_LABELS[container.shippingLine]}`);
    lines.push(`📅 Date: ${new Date().toLocaleDateString('fr-FR')}`);
    lines.push('');
    lines.push('══════════════════════════════════════════════════');
    lines.push('                    MARCHANDISES                  ');
    lines.push('══════════════════════════════════════════════════');
    lines.push('');

    clients.forEach((client, clientIndex) => {
      lines.push(`👤 CLIENT ${clientIndex + 1}: ${client.clientName}`);
      lines.push(`   📞 ${client.clientPhone}`);
      lines.push('   ──────────────────────────────────────────────');
      lines.push('   N° | ID         | Description      | CBM  | Poids');
      lines.push('   ──────────────────────────────────────────────');

      client.goods.forEach((item, index) => {
        const id = item.goodsId.padEnd(10).substring(0, 10);
        const desc = (item.description || '-').padEnd(16).substring(0, 16);
        lines.push(`   ${(index + 1).toString().padStart(2)} | ${id} | ${desc} | ${(item.actualCBM || 0).toFixed(2)} | ${(item.weight || 0).toFixed(0)}kg`);
      });

      lines.push('   ──────────────────────────────────────────────');
      lines.push(`   Sous-total: ${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg | ${client.summary.totalItems} colis`);
      lines.push('');
    });

    lines.push('══════════════════════════════════════════════════');
    lines.push('                      TOTAUX                      ');
    lines.push('══════════════════════════════════════════════════');
    lines.push(`📦 Total Marchandises: ${summary.totalItems}`);
    lines.push(`📐 Volume Total: ${summary.totalCBM.toFixed(2)} m³`);
    lines.push(`⚖️ Poids Total: ${summary.totalWeight.toFixed(0)} kg`);
    lines.push(`📊 Utilisation: ${summary.capacityPercentage.toFixed(1)}%`);
    lines.push('');
    lines.push('══════════════════════════════════════════════════');
    lines.push('    ChinaLink Express - Transport International   ');
    lines.push('        Tél: +223 XX XX XX XX | Bamako, Mali      ');
    lines.push('══════════════════════════════════════════════════');

    try {
      await Share.share({
        message: lines.join('\n'),
        title: `Liste de Colisage - ${container.virtualContainerNumber}`,
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager la liste');
    }
  }, [packingListData]);

  const handleToggleAll = useCallback(() => {
    setAllExpanded((prev) => !prev);
  }, []);

  const handleGoToLoadingList = useCallback(() => {
    navigation.navigate('LoadingList', { containerId });
  }, [navigation, containerId]);

  const formatDate = useCallback((date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  return {
    containerId,
    container,
    navigation,
    documentRef,
    isContainerLoading,
    isGeneratingPDF,
    setIsGeneratingPDF,
    allExpanded,
    setAllExpanded,
    packingListData,
    handlePrint,
    handleShare,
    handleToggleAll,
    handleGoToLoadingList,
    formatDate,
  };
};
