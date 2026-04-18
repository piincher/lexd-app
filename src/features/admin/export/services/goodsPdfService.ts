/**
 * Goods PDF Service
 *
 * Generates a PDF report for goods filtered by date range
 */

import * as Print from 'expo-print';
import { sharePDFFromUri } from '@src/shared/lib/pdfShare';
import { ClientInfo } from '@src/shared/types/goods';
import { format } from 'date-fns/format';

const isClientInfo = (clientId: string | ClientInfo): clientId is ClientInfo =>
  typeof clientId === 'object' && clientId !== null && 'firstName' in clientId;

export const generateGoodsPdf = async (
  goods: any[],
  startDate: string,
  endDate: string
): Promise<void> => {
  const rows = goods
    .map((item, index) => {
      const clientName = isClientInfo(item.clientId)
        ? `${item.clientId.firstName} ${item.clientId.lastName}`
        : '-';
      const clientPhone = isClientInfo(item.clientId) ? item.clientId.phoneNumber : '-';
      return `
      <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
        <td style="padding: 8px 10px; font-size: 11px; color: #374151; text-align: center;">${index + 1}</td>
        <td style="padding: 8px 10px; font-size: 11px; color: #374151; font-family: monospace;">${item.goodsId}</td>
        <td style="padding: 8px 10px; font-size: 11px; color: #4b5563;">${clientName}</td>
        <td style="padding: 8px 10px; font-size: 11px; color: #4b5563;">${clientPhone}</td>
        <td style="padding: 8px 10px; font-size: 11px; color: #374151; text-align: right;">${(item.weight || 0).toFixed(2)}</td>
        <td style="padding: 8px 10px; font-size: 11px; color: #374151; text-align: right;">${(item.actualCBM || 0).toFixed(3)}</td>
        <td style="padding: 8px 10px; font-size: 11px; color: #374151; text-align: center;">${item.quantity || 0}</td>
        <td style="padding: 8px 10px; font-size: 11px; color: #374151; text-align: right;">${(item.unitPrice || 0).toLocaleString()}</td>
        <td style="padding: 8px 10px; font-size: 10px; color: #6b7280; font-family: monospace;">${item._id}</td>
      </tr>
    `;
    })
    .join('');

  const totalWeight = goods.reduce((sum, g) => sum + (g.weight || 0), 0);
  const totalCBM = goods.reduce((sum, g) => sum + (g.actualCBM || 0), 0);
  const totalQuantity = goods.reduce((sum, g) => sum + (g.quantity || 0), 0);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Export Marchandises</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 24px; color: #1f2937; font-size: 12px; }
        .header { text-align: center; margin-bottom: 20px; padding: 16px; background: linear-gradient(135deg, #4f46e5, #4338ca); border-radius: 10px; color: white; }
        .header h1 { margin: 0 0 4px 0; font-size: 18px; }
        .header p { margin: 0; opacity: 0.9; font-size: 12px; }
        .meta { margin-bottom: 16px; font-size: 12px; color: #4b5563; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #e0e7ff; padding: 8px 10px; text-align: left; font-size: 10px; color: #3730a3; text-transform: uppercase; letter-spacing: 0.3px; border-bottom: 1px solid #c7d2fe; }
        td { border-bottom: 1px solid #e5e7eb; }
        .totals { background: #eef2ff; padding: 12px; border-radius: 8px; margin-top: 16px; border: 1px solid #c7d2fe; }
        .footer { margin-top: 20px; text-align: center; font-size: 10px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>EXPORT MARCHANDISES</h1>
        <p>ChinaLink Express</p>
      </div>
      <div class="meta">
        <strong>Période :</strong> ${format(new Date(startDate), 'dd/MM/yyyy')} – ${format(new Date(endDate), 'dd/MM/yyyy')}<br>
        <strong>Nombre de marchandises :</strong> ${goods.length}
      </div>
      <table>
        <thead>
          <tr>
            <th style="text-align: center; width: 30px;">N°</th>
            <th style="width: 90px;">N° Express</th>
            <th style="width: 110px;">Client</th>
            <th style="width: 90px;">Téléphone</th>
            <th style="text-align: right; width: 60px;">Poids</th>
            <th style="text-align: right; width: 50px;">CBM</th>
            <th style="text-align: center; width: 40px;">Qté</th>
            <th style="text-align: right; width: 70px;">Prix U.</th>
            <th style="width: 100px;">ID Système</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <div class="totals">
        <div style="display: flex; justify-content: space-between; font-size: 12px;">
          <span><strong>Total Poids:</strong> ${totalWeight.toFixed(2)} kg</span>
          <span><strong>Total CBM:</strong> ${totalCBM.toFixed(3)} m³</span>
          <span><strong>Total Quantité:</strong> ${totalQuantity}</span>
        </div>
      </div>
      <div class="footer">
        Document généré le ${format(new Date(), 'dd/MM/yyyy à HH:mm')}
      </div>
    </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html, base64: false });

  await sharePDFFromUri({
    uri,
    filename: `Export_Marchandises_${format(new Date(startDate), 'yyyy-MM-dd')}_${format(new Date(endDate), 'yyyy-MM-dd')}.pdf`,
    dialogTitle: 'Exporter les marchandises en PDF',
  });
};
