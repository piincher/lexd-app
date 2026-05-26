import { PackingListContainer, ClientGoodsGroup, ContainerSummary } from '../../../types/packingList';
import { SHIPPING_MODE_LABELS, SHIPPING_LINE_LABELS } from '../../../types';

export const buildPackingListPDF = (
  container: PackingListContainer,
  clients: ClientGoodsGroup[],
  summary: ContainerSummary,
  isSingleClientView?: boolean,
  singleClientName?: string
): string => {
  const grandTotal = clients.reduce((sum, c) => sum + (c.summary.totalCost || 0), 0);
  const grandPaid = clients.reduce((sum, c) => sum + (c.summary.totalPaid || 0), 0);
  const grandBalance = clients.reduce((sum, c) => sum + (c.summary.balanceDue || 0), 0);

  const singleClientBannerHtml = isSingleClientView ? `
    <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 8px; padding: 12px; margin-bottom: 16px; text-align: center;">
      <div style="font-size: 14px; font-weight: 700; color: #166534;">📋 COPIE CLIENT INDIVIDUEL</div>
      <div style="font-size: 12px; color: #166534; margin-top: 4px;">Client: ${singleClientName}</div>
      <div style="font-size: 10px; color: #6b7280; margin-top: 2px;">Ce document ne contient que vos marchandises</div>
    </div>
  ` : '';

  const clientRowsHtml = clients.map((client) => {
    const balance = client.summary.balanceDue || 0;
    const isPaid = balance <= 0;
    const isPartial = !isPaid && (client.summary.totalPaid || 0) > 0;
    const statusColor = isPaid ? '#10B981' : isPartial ? '#F59E0B' : '#EF4444';
    const statusText = isPaid ? 'PAYÉ' : isPartial ? 'PARTIELLEMENT PAYÉ' : 'IMPAYÉ';

    const goodsRows = client.goods.map((item: ClientGoodsGroup['goods'][number], index: number) => `
      <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
        <td style="padding: 8px 12px; font-size: 12px; color: #16a34a; font-weight: 600;">${index + 1}</td>
        <td style="padding: 8px 12px; font-size: 11px; color: #374151; font-family: monospace;">${item.goodsId}</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #4b5563;">${item.description || '-'}</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: center; font-weight: 600;">${item.quantity || 1}</td>
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
          <div style="text-align: right; margin-left: 12px;">
            <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${client.summary.totalQuantity || client.summary.totalItems || 0}</div>
            <div style="font-size: 11px; color: #6b7280;">articles</div>
          </div>
        </div>
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
            <th style="padding: 8px 12px; text-align: center; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">Qté</th>
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
          <span style="color: #166534; font-weight: 700;">${client.summary.totalQuantity || client.summary.totalItems || 0} articles | ${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; padding-top: 8px; border-top: 1px dashed #bbf7d0;">
          <span style="color: #166534; font-weight: 600;">TOTAL À PAYER:</span>
          <span style="color: #166534; font-weight: 800; font-size: 16px;">${(client.summary.totalCost || 0).toLocaleString()} FCFA</span>
        </div>
      </div>
    </div>`;
  }).join('');

  return `
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
          <div class="info-value">${SHIPPING_MODE_LABELS[container.shippingMode as 'SEA' | 'AIR'] || container.shippingMode}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Compagnie</div>
          <div class="info-value">${container.shippingLineLabel || SHIPPING_LINE_LABELS[container.shippingLine as 'MSC' | 'MAERSK' | 'CMA_CGM' | 'HAPAG_LLOYD' | 'ETHIOPIAN_AIRLINES' | 'AIR_STANDARD'] || container.shippingLine}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Date</div>
          <div class="info-value">${new Date().toLocaleDateString('fr-FR')}</div>
        </div>
      </div>

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
};
