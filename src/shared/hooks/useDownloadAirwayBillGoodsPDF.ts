/**
 * Shared hook to download an airway bill goods manifest PDF.
 *
 * Used by both the admin AWB detail screen and the customer AWB tracking screen.
 * The backend filters the PDF contents based on the authenticated user's role.
 */

import { useMutation } from '@tanstack/react-query';
import { downloadApiPdf, sharePDFGeneric } from '@src/shared/lib/pdfShare';

interface UseDownloadAirwayBillGoodsPDFOptions {
  filename?: string;
  share?: boolean;
}

const safeFilename = (awbNumber?: string) =>
  `AWB-${awbNumber || 'manifest'}-goods-manifest.pdf`.replace(/[^\w.-]+/g, '_');

export const useDownloadAirwayBillGoodsPDF = (options: UseDownloadAirwayBillGoodsPDFOptions = {}) => {
  const { share = true } = options;

  return useMutation({
    mutationFn: async ({ airwayBillId, filename }: { airwayBillId: string; filename?: string }) => {
      const apiPath = `/airway-bills/${airwayBillId}/goods-manifest/export`;
      const finalFilename = filename || safeFilename(airwayBillId);
      const fileUri = await downloadApiPdf(apiPath, finalFilename);

      if (share && fileUri) {
        await sharePDFGeneric({ fileUri, filename: finalFilename, message: 'Manifeste marchandises AWB' });
      }

      return { uri: fileUri, filename: finalFilename };
    },
  });
};

export default useDownloadAirwayBillGoodsPDF;
