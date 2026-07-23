import * as Print from 'expo-print';
import { SHIPPING_LINE_LABELS as SHARED_SHIPPING_LINE_LABELS } from '@src/shared/constants/shippingLines';
import { AdminLoadingListData } from '../types/packingList';
import type { ConsigneeInfo } from '../types/destination';
import type { Route } from '../types/route';
import { sharePDFFromUri } from '../../../../shared/lib/pdfShare';

const SHIPPING_MODE_LABELS: Record<string, string> = { sea: 'Maritime', SEA: 'Maritime', air: 'Aérien', AIR: 'Aérien', land: 'Terrestre', LAND: 'Terrestre' };
const SHIPPING_LINE_LABELS: Record<string, string> = {
  ...SHARED_SHIPPING_LINE_LABELS,
  cosco: 'COSCO', maersk: 'Maersk', msc: 'MSC', 'cma-cgm': 'CMA CGM',
  evergreen: 'Evergreen', one: 'ONE', 'hapag-lloyd': 'Hapag-Lloyd', other: 'Autre',
  COSCO: 'COSCO', ONE: 'ONE', OTHER: 'Autre',
};
const COMPANY_PHONE = '+223-76696177';

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatLocation = (value: unknown, fallback: string) => {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  const location = value as { city?: string; country?: string; name?: string };
  return location.city || location.name || location.country || fallback;
};

const getConsigneeInfo = (container: AdminLoadingListData['container']) => {
  const legacyContainer = container as unknown as {
    consignee?: ConsigneeInfo;
    consigneeId?: unknown;
  };
  const populatedConsignee =
    typeof legacyContainer.consigneeId === 'object' && legacyContainer.consigneeId !== null
      ? legacyContainer.consigneeId as ConsigneeInfo
      : null;
  const raw = legacyContainer.consignee || populatedConsignee;

  return {
    name: raw?.name || 'LEXD Bamako',
    phone: raw?.phone || COMPANY_PHONE,
    warehouseAddress: raw?.warehouseAddress || 'LEXD Warehouse - Bamako',
  };
};

const getRouteLabel = (container: AdminLoadingListData['container']) => {
  const legacyContainer = container as unknown as { route?: Route; routeId?: unknown };
  const populatedRoute =
    typeof legacyContainer.routeId === 'object' && legacyContainer.routeId !== null
      ? legacyContainer.routeId as Route
      : null;
  const route = legacyContainer.route || populatedRoute;
  const origin = formatLocation(route?.origin, 'Chine');
  const destination = formatLocation(route?.destination, 'Bamako');
  return `${origin} → ${destination}`;
};

function generateItemsHtml(items: AdminLoadingListData['items']) {
  return items.map((item) => `
    <tr style="background: ${item.isLoaded ? '#EDF7F3' : '#ffffff'}; border-left: 4px solid ${item.clientColor};">
      <td style="padding: 10px 12px; font-size: 14px; font-weight: 700; color: #024130;">${item.sequenceNumber}</td>
      <td style="padding: 10px 12px; font-size: 12px; color: #374151; font-family: monospace;">${escapeHtml(item.goods.goodsId)}</td>
      <td style="padding: 10px 12px; font-size: 12px; color: #4b5563;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <div style="width: 8px; height: 8px; border-radius: 50%; background: ${item.clientColor};"></div>
          <span>${escapeHtml(item.clientName)}</span>
        </div>
      </td>
      <td style="padding: 10px 12px; font-size: 12px; color: #4b5563;">${escapeHtml(item.goods.description || '-')}</td>
      <td style="padding: 10px 12px; font-size: 12px; color: #374151; text-align: center; font-weight: 700;">${item.goods.quantity || 1}</td>
      <td style="padding: 10px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 600;">${(item.goods.actualCBM || 0).toFixed(2)} m³</td>
      <td style="padding: 10px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 600;">${(item.goods.weight || 0).toFixed(0)} kg</td>
      <td style="padding: 10px 12px; text-align: center;">
        <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: ${item.isLoaded ? '#d1fae5' : '#f3f4f6'}; color: ${item.isLoaded ? '#059669' : '#6b7280'};">
          ${item.isLoaded ? '✓ CHARGÉ' : 'En attente'}
        </span>
      </td>
    </tr>
  `).join('');
}

export async function generateLoadingListPDF(
  data: AdminLoadingListData & { isSingleClientView?: boolean; singleClientName?: string }
) {
  const { container, items, summary } = data;
  const consignee = getConsigneeInfo(container);
  const routeLabel = getRouteLabel(container);
  const itemsHtml = generateItemsHtml(items);

  const html = `<!DOCTYPE html>
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
    .progress-title { font-size: 16px; font-weight: 700; color: #93370D; }
    .progress-value { font-size: 24px; font-weight: 800; color: #d97706; }
    .progress-bar { height: 24px; background: #fef3c7; border-radius: 12px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, #d97706, #f59e0b); border-radius: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { background: #fffbeb; padding: 12px; text-align: left; font-size: 11px; color: #93370D; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #fcd34d; }
    td { border-bottom: 1px solid #e5e7eb; }
    .footer { margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; }
    .footer p { margin: 4px 0; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📋 PLAN DE CHARGEMENT</h1>
    <p>${escapeHtml(container.virtualContainerNumber)}</p>
  </div>
  <div class="info-grid">
    <div class="info-item"><div class="info-label">Route</div><div class="info-value">${escapeHtml(routeLabel)}</div></div>
    <div class="info-item"><div class="info-label">Mode</div><div class="info-value">${SHIPPING_MODE_LABELS[container.shippingMode] || container.shippingMode}</div></div>
    <div class="info-item"><div class="info-label">Compagnie</div><div class="info-value">${SHIPPING_LINE_LABELS[container.shippingLine] || container.shippingLine}</div></div>
    <div class="info-item"><div class="info-label">Date</div><div class="info-value">${new Date().toLocaleDateString('fr-FR')}</div></div>
  </div>
  <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
      <div>
        <div style="font-size: 10px; color: #0369a1; text-transform: uppercase; margin-bottom: 4px;">📍 Point de Retrait</div>
        <div style="font-size: 13px; font-weight: 600; color: #0c4a6e;">${escapeHtml(consignee.warehouseAddress)}</div>
      </div>
      <div>
        <div style="font-size: 10px; color: #0369a1; text-transform: uppercase; margin-bottom: 4px;">👤 Consignataire</div>
        <div style="font-size: 13px; font-weight: 600; color: #0c4a6e;">${escapeHtml(consignee.name)}</div>
        <div style="font-size: 12px; color: #0369a1;">📞 ${escapeHtml(consignee.phone)}</div>
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
    <div style="margin-top: 12px; display: flex; justify-content: space-between; font-size: 13px; color: #93370D;">
      <span>Chargé: ${summary.loadedCBM.toFixed(2)} m³</span>
      <span>Restant: ${summary.remainingCBM.toFixed(2)} m³</span>
    </div>
  </div>
  <h2 style="color: #93370D; font-size: 18px; margin-bottom: 16px;">🚛 Séquence de Chargement</h2>
  <p style="color: #6b7280; font-size: 12px; margin-bottom: 16px;">Ordre: Du plus lourd au plus léger pour une meilleure stabilité</p>
  <table>
    <thead>
      <tr>
        <th style="width: 50px;">N°</th>
        <th style="width: 100px;">ID</th>
        <th style="width: 120px;">Client</th>
        <th>Description</th>
        <th style="width: 55px; text-align: center;">Qté</th>
        <th style="width: 80px; text-align: right;">CBM</th>
        <th style="width: 80px; text-align: right;">Poids</th>
        <th style="width: 100px; text-align: center;">Statut</th>
      </tr>
    </thead>
    <tbody>${itemsHtml}</tbody>
  </table>
  <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <div style="font-size: 14px; font-weight: 700; color: #93370D; margin-bottom: 8px; text-align: center;">💳 PAIEMENT EN AVANCE</div>
    <div style="font-size: 12px; color: #78350f; text-align: center; line-height: 1.6;">
      Pour effectuer un paiement anticipé ou régler votre solde,<br>
      veuillez contacter le consignataire:<br>
      <strong style="font-size: 14px; color: #93370D;">${escapeHtml(consignee.name)}</strong><br>
      📞 <strong>${escapeHtml(consignee.phone)}</strong>
    </div>
  </div>
  <div class="footer">
    <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
    <p><strong>LEXD</strong> - Transport International</p>
    <p>Bamako, Mali | Tél: ${COMPANY_PHONE}</p>
  </div>
</body>
</html>`;

  const { uri } = await Print.printToFileAsync({ html, base64: false });

  await sharePDFFromUri({
    uri,
    filename: `LoadingList_${container.virtualContainerNumber}_${Date.now()}.pdf`,
    dialogTitle: `Plan de Chargement - ${container.virtualContainerNumber}`,
  });
}
