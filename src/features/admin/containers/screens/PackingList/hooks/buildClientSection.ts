import { ClientGoodsGroup } from '../../../types/packingList';
import { Goods } from '../../../../goods/types';

export const buildClientSection = (client: ClientGoodsGroup): string => {
  const balance = client.summary.balanceDue || 0;
  const isPaid = balance <= 0;
  const isPartial = !isPaid && (client.summary.totalPaid || 0) > 0;
  const statusColor = isPaid ? '#10B981' : isPartial ? '#F59E0B' : '#EF4444';
  const statusText = isPaid ? 'PAYÉ' : isPartial ? 'PARTIELLEMENT PAYÉ' : 'IMPAYÉ';

  const goodsRows = client.goods
    .map(
      (item: Goods, index: number) => `
      <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
        <td style="padding: 8px 12px; font-size: 12px; color: #00664B; font-weight: 600;">${index + 1}</td>
        <td style="padding: 8px 12px; font-size: 11px; color: #374151; font-family: monospace;">${item.goodsId}</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #4b5563;">${item.description || '-'}</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: center; font-weight: 600;">${item.quantity || 1}</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.actualCBM || 0).toFixed(2)}</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.weight || 0).toFixed(0)} kg</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.unitPrice || 0).toLocaleString()} FCFA</td>
        <td style="padding: 8px 12px; font-size: 12px; color: #024130; text-align: right; font-weight: 700;">${(item.totalCost || 0).toLocaleString()} FCFA</td>
      </tr>
    `
    )
    .join('');

  return `
    <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #EDF7F3, #ffffff); padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="margin: 0; color: #024130; font-size: 16px;">${client.clientName}</h3>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">📞 ${client.clientPhone}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: bold; color: #00664B;">${client.goods.length}</div>
            <div style="font-size: 11px; color: #6b7280;">colis</div>
          </div>
          <div style="text-align: right; margin-left: 12px;">
            <div style="font-size: 18px; font-weight: bold; color: #00664B;">${client.summary.totalQuantity || client.summary.totalItems || 0}</div>
            <div style="font-size: 11px; color: #6b7280;">articles</div>
          </div>
        </div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #A9D8C7; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          <div style="text-align: center; padding: 8px; background: #EDF7F3; border-radius: 6px;">
            <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">Montant Total</div>
            <div style="font-size: 14px; font-weight: 700; color: #024130;">${(client.summary.totalCost || 0).toLocaleString()} FCFA</div>
          </div>
          <div style="text-align: center; padding: 8px; background: #EDF7F3; border-radius: 6px;">
            <div style="font-size: 10px; color: #6b7280; text-transform: uppercase;">Déjà Payé</div>
            <div style="font-size: 14px; font-weight: 700; color: #059669;">${(client.summary.totalPaid || 0).toLocaleString()} FCFA</div>
          </div>
          <div style="text-align: center; padding: 8px; background: ${isPaid ? '#EDF7F3' : '#fef2f2'}; border-radius: 6px;">
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
            <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">N°</th>
            <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">ID</th>
            <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">Description</th>
            <th style="padding: 8px 12px; text-align: center; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">Qté</th>
            <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">CBM</th>
            <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">Poids</th>
            <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">Prix/m³</th>
            <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #024130; border-bottom: 1px solid #e5e7eb;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${goodsRows}
        </tbody>
      </table>
      <div style="background: #EDF7F3; padding: 12px 16px; border-top: 2px solid #A9D8C7;">
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
          <span style="color: #024130; font-weight: 600;">Volume & Poids:</span>
          <span style="color: #024130; font-weight: 700;">${client.summary.totalQuantity || client.summary.totalItems || 0} articles | ${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; padding-top: 8px; border-top: 1px dashed #A9D8C7;">
          <span style="color: #024130; font-weight: 600;">TOTAL À PAYER:</span>
          <span style="color: #024130; font-weight: 800; font-size: 16px;">${(client.summary.totalCost || 0).toLocaleString()} FCFA</span>
        </div>
      </div>
    </div>`;
};
