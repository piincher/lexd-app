import { PackingListContainer, ClientGoodsGroup, ContainerSummary } from '../../../types/packingList';
import { SHIPPING_MODE_LABELS, SHIPPING_LINE_LABELS } from '../../../types';

export const buildPackingListShareText = (
  container: PackingListContainer,
  clients: ClientGoodsGroup[],
  summary: ContainerSummary,
  isSingleClientView?: boolean,
  singleClientName?: string
): string => {
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
  lines.push(`🛳️ Mode: ${container.shippingModeLabel || SHIPPING_MODE_LABELS[container.shippingMode as 'SEA' | 'AIR'] || container.shippingMode}`);
  lines.push(`🏢 Compagnie: ${container.shippingLineLabel || SHIPPING_LINE_LABELS[container.shippingLine as 'MSC' | 'MAERSK' | 'CMA_CGM' | 'HAPAG_LLOYD' | 'ETHIOPIAN_AIRLINES' | 'AIR_STANDARD'] || container.shippingLine}`);
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
    lines.push('   N° | ID         | Desc         | Qté | CBM  | Poids | Prix/m³ | Total');
    lines.push('   ────────────────────────────────────────────────────────');

    client.goods.forEach((item, index) => {
      const id = item.goodsId.padEnd(10).substring(0, 10);
      const desc = (item.description || '-').padEnd(12).substring(0, 12);
      const qty = (item.quantity || 1).toString().padStart(3);
      const cbm = (item.actualCBM || 0).toFixed(2).padStart(5);
      const weight = (item.weight || 0).toFixed(0).padStart(5);
      const unitPrice = ((item.unitPrice || 0).toLocaleString() + 'F').padStart(7);
      const total = ((item.totalCost || 0).toLocaleString() + 'F').padStart(7);
      lines.push(`   ${(index + 1).toString().padStart(2)} | ${id} | ${desc} | ${qty} | ${cbm} | ${weight}kg | ${unitPrice} | ${total}`);
    });

    lines.push('   ────────────────────────────────────────────────────────');
    lines.push(`   Sous-total: ${client.summary.totalQuantity || client.summary.totalItems || 0} articles | ${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg | ${client.summary.totalItems} colis`);
    lines.push(`   TOTAL À PAYER: ${(client.summary.totalCost || 0).toLocaleString()} FCFA`);
    lines.push('');
  });

  const grandTotalText = clients.reduce((sum, c) => sum + (c.summary.totalCost || 0), 0);
  const grandPaidText = clients.reduce((sum, c) => sum + (c.summary.totalPaid || 0), 0);
  const grandBalanceText = clients.reduce((sum, c) => sum + (c.summary.balanceDue || 0), 0);

  lines.push('══════════════════════════════════════════════════');
  lines.push('                      TOTAUX                      ');
  lines.push('══════════════════════════════════════════════════');
  lines.push(`📦 Total Marchandises: ${summary.totalItems} colis (${summary.totalQuantity || summary.totalPackages || 0} articles)`);
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

  return lines.join('\n');
};
