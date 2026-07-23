import { Platform } from 'react-native';
import * as Print from 'expo-print';
import ZplPrinter from 'lexd-zpl-printer';
import type { LabelPrintDocument, LabelPrintJob, WarehousePrinter } from '../types';

const escapeHtml = (value: unknown) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const renderPage = ({ preview, qrSvg }: LabelPrintDocument) => `
  <section class="label">
    <div class="copy">
      <header>LEXD <b>${escapeHtml(preview.shippingMode)}</b></header>
      <h1>${escapeHtml(preview.goodsCode)}</h1>
      <h2>${escapeHtml(preview.packageCode)} · ${preview.packageSequence}/${preview.packageCount}</h2>
      <p><strong>CLIENT:</strong> ${escapeHtml(preview.clientMark)}</p>
      <p><strong>CONTENU:</strong> ${escapeHtml(preview.description)}</p>
      <p><strong>QTÉ:</strong> ${preview.quantity} &nbsp; <strong>POIDS:</strong> ${escapeHtml(preview.weightText)}</p>
      <p><strong>EMPLACEMENT:</strong> ${escapeHtml(preview.warehouseLocation)}</p>
    </div>
    <div class="qr">${qrSvg}<small>V${preview.labelVersion}</small></div>
  </section>`;

const renderHtml = (job: LabelPrintJob) => {
  const pages = Array.from({ length: job.copies }, () => job.documents.map(renderPage).join('')).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @page { size: 102mm 51mm; margin: 0; }
    * { box-sizing: border-box; } body { margin: 0; font-family: Arial, sans-serif; color: #000; }
    .label { width: 102mm; height: 51mm; padding: 3mm; display: flex; page-break-after: always; overflow: hidden; }
    .copy { width: 70%; } header { font-size: 13pt; border-bottom: 1px solid #000; padding-bottom: 1mm; }
    header b { float: right; border: 1px solid #000; padding: 1px 7px; } h1 { font-size: 16pt; margin: 1.5mm 0 0; }
    h2 { font-size: 12pt; margin: .5mm 0 1.5mm; } p { font-size: 9.5pt; line-height: 1.25; margin: .7mm 0; }
    .qr { width: 30%; display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .qr svg { width: 27mm; height: 27mm; } small { font-size: 7pt; }
  </style></head><body>${pages}</body></html>`;
};

export const testNetworkPrinter = async (printer: WarehousePrinter) => {
  if (Platform.OS !== 'android' || !ZplPrinter) throw new Error('NATIVE_PRINTER_UNAVAILABLE');
  return ZplPrinter.testConnection(printer.host, printer.port, 5_000);
};

export const sendLabelPrintJob = async (job: LabelPrintJob) => {
  if (Platform.OS === 'android') {
    if (!ZplPrinter) throw new Error('NATIVE_PRINTER_UNAVAILABLE');
    const zpl = Array.from({ length: job.copies }, () => job.documents.map((item) => item.zpl).join('\n')).join('\n');
    return ZplPrinter.sendZpl(job.printerId.host, job.printerId.port, zpl, 15_000);
  }

  await Print.printAsync({ html: renderHtml(job) });
  return { bytesSent: 0, durationMs: 0 };
};
