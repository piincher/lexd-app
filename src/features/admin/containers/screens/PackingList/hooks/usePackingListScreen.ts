import { useState, useRef, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert, Share } from 'react-native';
import * as Print from 'expo-print';
import { useGetPackingList } from '../../../hooks/useContainers';
import { SHIPPING_MODE_LABELS, SHIPPING_LINE_LABELS } from '../../../types';
import { AdminPackingListData, ClientGoodsGroup, getClientColor } from '../../../types/packingList';

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
  const params = route.params as { containerId: string; clientId?: string } | undefined;
  const containerId = params?.containerId;
  const initialClientId = params?.clientId || null;
  const documentRef = useRef<View>(null);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [allExpanded, setAllExpanded] = useState(true);
  
  // State for client filtering (for walk-in customers)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(initialClientId);

  const { data: packingListResponse, isLoading: isContainerLoading } = useGetPackingList(containerId || '');
  const packingListData: AdminPackingListData | null = useMemo(() => {
    // API returns { success, data: { container, goods, summary }, message }
    const apiData = packingListResponse?.data;
    if (!apiData) return null;
    
    // Handle both direct data and nested data structure
    const packingData = apiData.data || apiData;
    
    if (!packingData || !packingData.summary) {
      console.warn('[PackingList] Invalid data structure:', packingData);
      return null;
    }
    
    // Transform API container format to our format
    const apiContainer = packingData.container;
    const container = {
      id: apiContainer.id,
      number: apiContainer.virtualContainerNumber || apiContainer.number,
      shippingLine: apiContainer.shippingLine,
      shippingLineLabel: apiContainer.shippingLine,
      shippingMode: apiContainer.shippingMode,
      status: apiContainer.status,
      statusLabel: apiContainer.status,
      consignee: apiContainer.consignee,
      route: apiContainer.route,
    };
    
    // Get goods list for fallback
    const goodsList = packingData.goods || [];
    
    // API may return pre-grouped clients array OR flat goods array
    let clients: ClientGoodsGroup[] = [];
    
    if (packingData.clients && packingData.clients.length > 0) {
      // Use pre-grouped clients from API (has phone numbers!)
      clients = packingData.clients.map((apiClient: any) => ({
        clientId: apiClient.clientId?.toString() || apiClient.clientId,
        clientName: apiClient.clientName,
        clientPhone: apiClient.clientPhone || 'N/A',
        clientEmail: apiClient.clientEmail,
        goods: apiClient.goods || [],
        summary: {
          totalCBM: apiClient.summary?.totalCBM || 0,
          totalWeight: apiClient.summary?.totalWeight || 0,
          totalItems: apiClient.summary?.totalItems || 0,
          totalQuantity: apiClient.summary?.totalQuantity || 0,
          totalCost: apiClient.summary?.totalCost || 0,
          totalPaid: apiClient.summary?.totalPaid || 0,
          balanceDue: apiClient.summary?.balanceDue || 0,
        },
      }));
    } else if (goodsList.length > 0) {
      // Fallback: group from flat goods array
      const clientMap = new Map<string, ClientGoodsGroup>();
      
      goodsList.forEach((goods: any) => {
        const client = goods.client || {};
        const clientName = client.name || 'Client Inconnu';
        const clientId = client.id || client._id || clientName;
        
        if (!clientMap.has(clientId)) {
          clientMap.set(clientId, {
            clientId,
            clientName,
            clientPhone: client.phone || client.phoneNumber || 'N/A',
            goods: [],
            summary: { totalCBM: 0, totalWeight: 0, totalItems: 0, totalQuantity: 0, totalCost: 0, totalPaid: 0, balanceDue: 0 },
          });
        }
        
        const group = clientMap.get(clientId)!;
        group.goods.push(goods);
        group.summary.totalCBM += goods.actualCBM || 0;
        group.summary.totalWeight += goods.weight || 0;
        group.summary.totalItems += 1;
        group.summary.totalQuantity += goods.quantity || 1;
        group.summary.totalCost += goods.totalCost || 0;
        group.summary.totalPaid += goods.amountPaid || 0;
        group.summary.balanceDue += Math.max(0, (goods.totalCost || 0) - (goods.amountPaid || 0));
      });
      
      clients = Array.from(clientMap.values());
    }
    
    // Transform summary with safe defaults
    const apiSummary = packingData.summary;
    const totalCBM = apiSummary.totalCBM || 0;
    const totalWeight = apiSummary.totalWeight || 0;
    const maxCBM = apiContainer.capacityCBM || 67;
    const capacityPercentage = apiSummary.utilizedCapacityPercentage || 
      (totalCBM > 0 ? (totalCBM / maxCBM) * 100 : 0);
    
    const summary = {
      totalCBM,
      totalWeight,
      totalItems: apiSummary.totalPieces || apiSummary.totalItems || goodsList.length,
      totalPackages: apiSummary.totalPieces || goodsList.length,
      totalQuantity: apiSummary.totalPieces || goodsList.length,
      capacityPercentage,
      remainingCBM: Math.max(0, maxCBM - totalCBM),
      maxCBM,
    };
    
    return {
      container,
      clients,
      summary,
      generatedAt: packingData.generatedAt,
      generatedBy: packingData.generatedBy,
    } as AdminPackingListData;
  }, [packingListResponse]);

  // Filter data for single client view (walk-in customers)
  const filteredPackingListData = useMemo(() => {
    if (!packingListData) return null;
    if (!selectedClientId) return packingListData; // Show all clients

    const filteredClients = packingListData.clients.filter(
      (c) => String(c.clientId) === String(selectedClientId)
    );
    
    if (filteredClients.length === 0) return packingListData;

    // Recalculate summary for single client
    const client = filteredClients[0];
    const singleClientSummary = {
      ...packingListData.summary,
      totalItems: client.summary.totalItems,
      totalPackages: client.summary.totalItems,
      totalQuantity: client.summary.totalQuantity,
      totalCBM: client.summary.totalCBM,
      totalWeight: client.summary.totalWeight,
    };

    return {
      ...packingListData,
      clients: filteredClients,
      summary: singleClientSummary,
      isSingleClientView: true,
      singleClientName: client.clientName,
    };
  }, [packingListData, selectedClientId]);

  const handlePrint = useCallback(async () => {
    if (!filteredPackingListData) return;
    setIsGeneratingPDF(true);

    try {
      const { container, clients, summary, isSingleClientView, singleClientName } = filteredPackingListData;

      // Calculate grand totals
      const grandTotal = clients.reduce((sum, c) => sum + (c.summary.totalCost || 0), 0);
      const grandPaid = clients.reduce((sum, c) => sum + (c.summary.totalPaid || 0), 0);
      const grandBalance = clients.reduce((sum, c) => sum + (c.summary.balanceDue || 0), 0);
      
      // Single client header banner for PDF
      const singleClientBannerHtml = isSingleClientView ? `
        <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 8px; padding: 12px; margin-bottom: 16px; text-align: center;">
          <div style="font-size: 14px; font-weight: 700; color: #166534;">📋 COPIE CLIENT INDIVIDUEL</div>
          <div style="font-size: 12px; color: #166534; margin-top: 4px;">Client: ${singleClientName}</div>
          <div style="font-size: 10px; color: #6b7280; margin-top: 2px;">Ce document ne contient que vos marchandises</div>
        </div>
      ` : '';
      
      const clientRowsHtml = clients.map((client, cIndex) => {
        const balance = client.summary.balanceDue || 0;
        const isPaid = balance <= 0;
        const isPartial = !isPaid && (client.summary.totalPaid || 0) > 0;
        const statusColor = isPaid ? '#10B981' : isPartial ? '#F59E0B' : '#EF4444';
        const statusText = isPaid ? 'PAYÉ' : isPartial ? 'PARTIELLEMENT PAYÉ' : 'IMPAYÉ';
        
        const goodsRows = client.goods.map((item: any, index: number) => `
          <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
            <td style="padding: 8px 12px; font-size: 12px; color: #16a34a; font-weight: 600;">${index + 1}</td>
            <td style="padding: 8px 12px; font-size: 11px; color: #374151; font-family: monospace;">${item.goodsId}</td>
            <td style="padding: 8px 12px; font-size: 12px; color: #4b5563;">${item.description || '-'}</td>
            <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.actualCBM || 0).toFixed(2)}</td>
            <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.weight || 0).toFixed(0)} kg</td>
            <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.unitPrice || 0).toLocaleString()} FCFA</td>
            <td style="padding: 8px 12px; font-size: 12px; color: #166534; text-align: right; font-weight: 700;">${(item.totalCost || 0).toLocaleString()} FCFA</td>
          </tr>
        `).join('');
        
        return `
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
            <!-- FINANCIAL INFO -->
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #bbf7d0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
              <div style="text-align: center; padding: 8px; background: #f0fdf4; border-radius: 6px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">Montant Total</div>
                <div style="font-size: 14px; font-weight: 700; color: #166534;">${(client.summary.totalCost || 0).toLocaleString()} FCFA</div>
              </div>
              <div style="text-align: center; padding: 8px; background: #f0fdf4; border-radius: 6px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">Déjà Payé</div>
                <div style="font-size: 14px; font-weight: 700; color: #059669;">${(client.summary.totalPaid || 0).toLocaleString()} FCFA</div>
              </div>
              <div style="text-align: center; padding: 8px; background: ${isPaid ? '#f0fdf4' : '#fef2f2'}; border-radius: 6px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">Solde</div>
                <div style="font-size: 14px; font-weight: 700; color: ${isPaid ? '#059669' : '#dc2626'};">${balance.toLocaleString()} FCFA</div>
              </div>
            </div>
            <div style="margin-top: 8px; text-align: center;">
              <span style="display: inline-block; padding: 4px 12px; background: ${statusColor}; color: white; font-size: 11px; font-weight: 700; border-radius: 12px; text-transform: uppercase;">${statusText}</span>
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
                <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">Prix/m³</th>
                <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${goodsRows}
            </tbody>
          </table>
          <div style="background: #f0fdf4; padding: 12px 16px; border-top: 2px solid #bbf7d0;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
              <span style="color: #166534; font-weight: 600;">Volume & Poids:</span>
              <span style="color: #166534; font-weight: 700;">${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px; padding-top: 8px; border-top: 1px dashed #bbf7d0;">
              <span style="color: #166534; font-weight: 600;">TOTAL À PAYER:</span>
              <span style="color: #166534; font-weight: 800; font-size: 16px;">${(client.summary.totalCost || 0).toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>`;
      }).join('');

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Liste de Colisage - ${container.virtualContainerNumber}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 30px; color: #1f2937; font-size: 12px; }
            .header { text-align: center; margin-bottom: 24px; padding: 20px; background: linear-gradient(135deg, #16a34a, #166534); border-radius: 12px; color: white; }
            .header h1 { margin: 0 0 8px 0; font-size: 22px; letter-spacing: 2px; }
            .header p { margin: 0; opacity: 0.9; font-size: 14px; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px; }
            .info-item { background: #f9fafb; padding: 10px 14px; border-radius: 8px; }
            .info-label { font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .info-value { font-size: 13px; font-weight: 600; color: #374151; }
            table { font-size: 11px; }
            th { font-size: 10px; padding: 6px 8px !important; }
            td { font-size: 11px; padding: 6px 8px !important; }
            .totals { background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 16px; border-radius: 12px; margin-top: 24px; border: 2px solid #bbf7d0; }
            .totals-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .totals-label { font-size: 13px; color: #166534; }
            .totals-value { font-size: 13px; font-weight: 700; color: #166534; }
            .footer { margin-top: 30px; text-align: center; padding-top: 16px; border-top: 1px solid #e5e7eb; }
            .footer p { margin: 4px 0; font-size: 11px; color: #6b7280; }
            .signature-section { margin-top: 30px; display: flex; justify-content: space-between; }
            .signature-box { width: 45%; text-align: center; }
            .signature-line { border-bottom: 1px solid #d1d5db; height: 50px; margin-bottom: 8px; }
            .signature-label { font-size: 11px; color: #6b7280; }
          </style>
        </head>
        <body>
          ${singleClientBannerHtml}
          <div class="header">
            <h1>LISTE DE COLISAGE</h1>
            <p>${container.number}</p>
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
              <div class="info-value">${container.shippingLineLabel || SHIPPING_LINE_LABELS[container.shippingLine] || container.shippingLine}</div>
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
                <div style="font-size: 13px; font-weight: 600; color: #0c4a6e;">${container.consignee?.warehouseAddress || 'ChinaLink Express Warehouse - Bamako'}</div>
              </div>
              <div>
                <div style="font-size: 10px; color: #0369a1; text-transform: uppercase; margin-bottom: 4px;">👤 Consignataire</div>
                <div style="font-size: 13px; font-weight: 600; color: #0c4a6e;">${container.consignee?.name || 'N/A'}</div>
                <div style="font-size: 12px; color: #0369a1;">📞 ${container.consignee?.phone || 'N/A'}</div>
              </div>
            </div>
          </div>

          <h2 style="color: #166534; font-size: 18px; margin-bottom: 16px;">📦 Marchandises par Client</h2>
          ${clientRowsHtml}

          <div class="totals">
            <div style="font-size: 16px; font-weight: 700; color: #166534; text-align: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 2px solid #bbf7d0;">
              RÉCAPITULATIF GÉNÉRAL
            </div>
            <div class="totals-row">
              <span class="totals-label">Total Marchandises:</span>
              <span class="totals-value">${summary.totalItems} colis (${summary.totalQuantity || summary.totalPackages || 0} articles)</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">Volume Total:</span>
              <span class="totals-value">${summary.totalCBM.toFixed(2)} m³${!isSingleClientView ? ` (${summary.capacityPercentage.toFixed(1)}% utilisé)` : ''}</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">Poids Total:</span>
              <span class="totals-value">${summary.totalWeight.toFixed(0)} kg</span>
            </div>
            <div style="margin-top: 12px; padding-top: 12px; border-top: 2px solid #bbf7d0;">
              <div class="totals-row">
                <span class="totals-label" style="font-size: 14px;">MONTANT TOTAL CONTAINER:</span>
                <span class="totals-value" style="font-size: 14px; color: #166534;">${grandTotal.toLocaleString()} FCFA</span>
              </div>
              <div class="totals-row">
                <span class="totals-label" style="font-size: 14px;">TOTAL DÉJÀ PAYÉ:</span>
                <span class="totals-value" style="font-size: 14px; color: #059669;">${grandPaid.toLocaleString()} FCFA</span>
              </div>
              <div class="totals-row" style="background: #fef2f2; padding: 8px; border-radius: 6px; margin-top: 8px;">
                <span class="totals-label" style="font-size: 15px; font-weight: 800; color: #dc2626;">SOLDE TOTAL À RECOUVRER:</span>
                <span class="totals-value" style="font-size: 16px; font-weight: 800; color: #dc2626;">${grandBalance.toLocaleString()} FCFA</span>
              </div>
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

          <!-- PAYMENT INFO & CONTACT -->
          <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin: 24px 0;">
            <div style="font-size: 14px; font-weight: 700; color: #92400e; margin-bottom: 8px; text-align: center;">
              💳 PAIEMENT EN AVANCE
            </div>
            <div style="font-size: 12px; color: #78350f; text-align: center; line-height: 1.6;">
              Pour effectuer un paiement anticipé ou régler votre solde,<br>
              veuillez contacter le consignataire:<br>
              <strong style="font-size: 14px; color: #92400e;">${container.consignee?.name || 'N/A'}</strong><br>
              📞 <strong>${container.consignee?.phone || 'N/A'}</strong>
            </div>
          </div>

          <div class="footer">
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p><strong>ChinaLink Express</strong> - Transport International</p>
            <p>Bamako, Mali | Tél: ${container.consignee?.phone || '+223 XX XX XX XX'}</p>
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
        filename: `PackingList_${container.number}_${Date.now()}.pdf`,
        dialogTitle: `Liste de Colisage - ${container.number}`,
      });

      setIsGeneratingPDF(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
      setIsGeneratingPDF(false);
    }
  }, [filteredPackingListData]);

  // Handler: Share packing list
  const handleShare = useCallback(async () => {
    if (!filteredPackingListData) return;

    const { container, clients, summary, isSingleClientView, singleClientName } = filteredPackingListData;

    const lines: string[] = [];
    lines.push('╔════════════════════════════════════════════════╗');
    lines.push('║         CHINALINK EXPRESS - LISTE DE COLISAGE  ║');
    lines.push('╚════════════════════════════════════════════════╝');
    if (isSingleClientView) {
      lines.push('');
      lines.push('📋 COPIE CLIENT INDIVIDUEL');
      lines.push(`👤 Client: ${singleClientName}`);
      lines.push('⚠️ Ce document ne contient que vos marchandises');
    }
    lines.push('');
    lines.push(`📦 Container: ${container.number}`);
    lines.push(`🚢 Route: Chine → Bamako`);
    lines.push(`🛳️ Mode: ${container.shippingModeLabel || SHIPPING_MODE_LABELS[container.shippingMode] || container.shippingMode}`);
    lines.push(`🏢 Compagnie: ${container.shippingLineLabel || SHIPPING_LINE_LABELS[container.shippingLine] || container.shippingLine}`);
    lines.push(`📅 Date: ${new Date().toLocaleDateString('fr-FR')}`);
    lines.push('');
    lines.push('── CONSIGNATAIRE & POINT DE RETRAIT ──────────────');
    lines.push(`👤 Consignataire: ${container.consignee?.name || 'N/A'}`);
    lines.push(`📞 Contact: ${container.consignee?.phone || 'N/A'}`);
    lines.push(`📍 Point de Retrait: ${container.consignee?.warehouseAddress || 'ChinaLink Express Warehouse - Bamako'}`);
    lines.push('');
    lines.push('══════════════════════════════════════════════════');
    lines.push('                    MARCHANDISES                  ');
    lines.push('══════════════════════════════════════════════════');
    lines.push('');

    clients.forEach((client, clientIndex) => {
      const balance = client.summary.balanceDue || 0;
      const isPaid = balance <= 0;
      const statusText = isPaid ? 'PAYÉ' : 'IMPAYÉ';
      
      lines.push(`👤 CLIENT ${clientIndex + 1}: ${client.clientName}`);
      lines.push(`   📞 ${client.clientPhone}`);
      lines.push(`   💰 Total: ${(client.summary.totalCost || 0).toLocaleString()} FCFA | Payé: ${(client.summary.totalPaid || 0).toLocaleString()} FCFA`);
      lines.push(`   ⚠️ SOLDE: ${balance.toLocaleString()} FCFA [${statusText}]`);
      lines.push('   ──────────────────────────────────────────────');
      lines.push('   N° | ID         | Desc         | CBM  | Poids | Prix/m³ | Total');
      lines.push('   ──────────────────────────────────────────────');

      client.goods.forEach((item, index) => {
        const id = item.goodsId.padEnd(10).substring(0, 10);
        const desc = (item.description || '-').padEnd(12).substring(0, 12);
        const cbm = (item.actualCBM || 0).toFixed(2).padStart(5);
        const weight = (item.weight || 0).toFixed(0).padStart(5);
        const unitPrice = ((item.unitPrice || 0).toLocaleString() + 'F').padStart(7);
        const total = ((item.totalCost || 0).toLocaleString() + 'F').padStart(7);
        lines.push(`   ${(index + 1).toString().padStart(2)} | ${id} | ${desc} | ${cbm} | ${weight}kg | ${unitPrice} | ${total}`);
      });

      lines.push('   ──────────────────────────────────────────────');
      lines.push(`   Sous-total: ${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg | ${client.summary.totalItems} colis`);
      lines.push(`   TOTAL À PAYER: ${(client.summary.totalCost || 0).toLocaleString()} FCFA`);
      lines.push('');
    });

    // Calculate grand totals for text
    const grandTotalText = clients.reduce((sum, c) => sum + (c.summary.totalCost || 0), 0);
    const grandPaidText = clients.reduce((sum, c) => sum + (c.summary.totalPaid || 0), 0);
    const grandBalanceText = clients.reduce((sum, c) => sum + (c.summary.balanceDue || 0), 0);
    
    lines.push('══════════════════════════════════════════════════');
    lines.push('                      TOTAUX                      ');
    lines.push('══════════════════════════════════════════════════');
    lines.push(`📦 Total Marchandises: ${summary.totalItems}`);
    lines.push(`📐 Volume Total: ${summary.totalCBM.toFixed(2)} m³`);
    lines.push(`⚖️ Poids Total: ${summary.totalWeight.toFixed(0)} kg`);
    if (!isSingleClientView) {
      lines.push(`📊 Utilisation: ${summary.capacityPercentage.toFixed(1)}%`);
    }
    lines.push('');
    lines.push('💰 MONTANT TOTAL CONTAINER: ' + grandTotalText.toLocaleString() + ' FCFA');
    lines.push('✅ TOTAL DÉJÀ PAYÉ: ' + grandPaidText.toLocaleString() + ' FCFA');
    lines.push('⚠️ SOLDE TOTAL À RECOUVRER: ' + grandBalanceText.toLocaleString() + ' FCFA');
    lines.push('');
    lines.push('── PAIEMENT EN AVANCE ────────────────────────────');
    lines.push('Pour effectuer un paiement anticipé ou régler votre solde,');
    lines.push('veuillez contacter le consignataire:');
    lines.push(`👤 ${container.consignee?.name || 'N/A'}`);
    lines.push(`📞 ${container.consignee?.phone || 'N/A'}`);
    lines.push('');
    lines.push('══════════════════════════════════════════════════');
    lines.push('    ChinaLink Express - Transport International   ');
    lines.push(`        Tél: ${container.consignee?.phone || '+223 XX XX XX XX'} | Bamako, Mali      `);
    lines.push('══════════════════════════════════════════════════');

    try {
      await Share.share({
        message: lines.join('\n'),
        title: `Liste de Colisage - ${container.number}`,
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager la liste');
    }
  }, [filteredPackingListData]);

  const handleToggleAll = useCallback(() => {
    setAllExpanded((prev) => !prev);
  }, []);

  const handleGoToLoadingList = useCallback(() => {
    if (containerId) {
      navigation.navigate('LoadingList', { containerId });
    }
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
    container: packingListData?.container,
    navigation,
    documentRef,
    isContainerLoading,
    isGeneratingPDF,
    setIsGeneratingPDF,
    allExpanded,
    setAllExpanded,
    packingListData,
    // Single client filtering (for walk-in customers)
    filteredPackingListData,
    selectedClientId,
    setSelectedClientId,
    handlePrint,
    handleShare,
    handleToggleAll,
    handleGoToLoadingList,
    formatDate,
  };
};
