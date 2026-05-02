import { File, Paths } from 'expo-file-system';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';

interface PackingListData {
  containerNumber: string;
  generatedAt?: string;
  shippingLineLabel: string;
  route: { origin: string; destination: string };
  consignee: { name: string; phone: string; warehouseAddress: string };
  tracking: { statusLabel: string; estimatedArrival?: string; loadingCompletedAt?: string; dakarPortArrivalAt?: string };
  schedule?: { loadDate?: string | null; dakarPortArrivalAt?: string | null };
  signature?: { signed?: boolean; signedBy?: string; signerName?: string; signedAt?: string; signatureLabel?: string };
  items: { goodsId: string; description: string; actualCBM: number; weight: number; quantity?: number }[];
  summary: { totalItems: number; totalCBM: number; totalWeight: number; totalQuantity?: number };
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(',')[1];
      if (base64) {
        resolve(base64);
        return;
      }
      reject(new Error('Failed to convert to base64'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const savePDF = async (blob: Blob, filename: string): Promise<string> => {
  const destFile = new File(Paths.cache, filename);
  const base64Data = await blobToBase64(blob);
  await destFile.write(base64Data, { encoding: 'base64' });
  return destFile.uri;
};

export const downloadWeb = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const generateShareText = (packingList: PackingListData): string => {
  const lines: string[] = [];
  lines.push('═══════════════════════════════════════');
  lines.push('       LISTE DE COLISAGE CLIENT');
  lines.push('═══════════════════════════════════════');
  lines.push('');
  lines.push(`Container: ${packingList.containerNumber}`);
  lines.push(`Mode: ${packingList.shippingLineLabel}`);
  lines.push(`Route: ${packingList.route.origin} → Dakar → ${packingList.route.destination}`);
  lines.push(`Date: ${format(new Date(packingList.generatedAt || new Date()), 'dd MMMM yyyy', { locale: fr })}`);
  const loadDate = packingList.schedule?.loadDate || packingList.tracking.loadingCompletedAt;
  const dakarArrival = packingList.schedule?.dakarPortArrivalAt || packingList.tracking.dakarPortArrivalAt || packingList.tracking.estimatedArrival;
  if (loadDate) {
    lines.push(`Date de chargement: ${format(new Date(loadDate), 'dd MMMM yyyy HH:mm', { locale: fr })}`);
  }
  if (dakarArrival) {
    lines.push(`Arrivée estimée au port de Dakar: ${format(new Date(dakarArrival), 'dd MMMM yyyy HH:mm', { locale: fr })}`);
  }
  lines.push('');
  lines.push('── POINT DE RETRAIT ───────────────────');
  lines.push('Entrepôt: ChinaLink Express Warehouse - Bamako');
  lines.push('');
  lines.push('── DESTINATAIRE ───────────────────────');
  lines.push(`Nom: ${packingList.consignee.name}`);
  lines.push(`Téléphone: ${packingList.consignee.phone}`);
  lines.push(`Adresse: ${packingList.consignee.warehouseAddress}`);
  lines.push('');
  lines.push('── DOCUMENTS REQUIS ───────────────────');
  lines.push("• Pièce d'identité");
  lines.push('• Reçu de paiement');
  lines.push('');
  lines.push('── MARCHANDISES ───────────────────────');
  lines.push('N°  ID           Description          Qté  CBM    Poids');
  lines.push('──  ───────────  ───────────────────  ───  ─────  ──────');

  packingList.items.forEach((item, index) => {
    const id = item.goodsId.slice(-8).padEnd(11);
    const desc = (item.description || '-').slice(0, 20).padEnd(20);
    const qty = (item.quantity || 1).toString().padStart(3);
    const cbm = item.actualCBM.toFixed(2).padStart(5);
    const weight = `${item.weight || 0}kg`.padStart(6);
    lines.push(`${(index + 1).toString().padStart(2)}  ${id}  ${desc}  ${qty}  ${cbm}  ${weight}`);
  });

  lines.push('');
  lines.push('── TOTAUX ─────────────────────────────');
  lines.push(`Total Marchandises: ${packingList.summary.totalItems} colis`);
  lines.push(`Total Articles: ${packingList.summary.totalQuantity || packingList.items.reduce((sum, item) => sum + (item.quantity || 1), 0)}`);
  lines.push(`Volume Total: ${packingList.summary.totalCBM.toFixed(2)} m³`);
  lines.push(`Poids Total: ${packingList.summary.totalWeight.toFixed(0)} kg`);
  lines.push('');
  lines.push('── STATUT ─────────────────────────────');
  lines.push(`Statut: ${packingList.tracking.statusLabel}`);
  if (dakarArrival) {
    lines.push(`Arrivée Dakar: ${format(new Date(dakarArrival), 'dd MMMM yyyy HH:mm', { locale: fr })}`);
  }
  if (packingList.signature?.signed) {
    lines.push('');
    lines.push('── SIGNATURE ──────────────────────────');
    lines.push(packingList.signature.signatureLabel || `Signé par ${packingList.signature.signedBy || 'ChinaLink Express'}`);
    lines.push(`Signataire: ${packingList.signature.signerName || 'Service Logistique'}`);
    if (packingList.signature.signedAt) {
      lines.push(`Date signature: ${format(new Date(packingList.signature.signedAt), 'dd MMMM yyyy HH:mm', { locale: fr })}`);
    }
  }
  lines.push('');
  lines.push('═══════════════════════════════════════');
  lines.push('ChinaLink Express - Transport International');
  lines.push('Route: Chine → Dakar (Sénégal) → Bamako (Mali)');
  lines.push('═══════════════════════════════════════');

  return lines.join('\n');
};
