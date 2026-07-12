/**
 * Shared hook to download an airway bill goods manifest PDF.
 *
 * Used by both the admin AWB detail screen and the customer AWB tracking screen.
 * The backend filters the PDF contents based on the authenticated user's role.
 */

import { useMutation } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { downloadAirwayBillGoodsPDF } from '@src/shared/api/airwayBillPdf';
import { savePDFToCache, downloadPDFOnWeb, sharePDFGeneric } from '@src/shared/lib/pdfShare';

interface UseDownloadAirwayBillGoodsPDFOptions {
  filename?: string;
  share?: boolean;
}

export const useDownloadAirwayBillGoodsPDF = (options: UseDownloadAirwayBillGoodsPDFOptions = {}) => {
  const { share = true } = options;

  return useMutation({
    mutationFn: async ({ airwayBillId, filename }: { airwayBillId: string; filename: string }) => {
      const blob = await downloadAirwayBillGoodsPDF(airwayBillId);

      if (Platform.OS === 'web') {
        downloadPDFOnWeb(blob, filename);
        return { uri: null, filename };
      }

      const fileUri = await savePDFToCache(blob, filename);

      if (share) {
        await sharePDFGeneric({ fileUri, filename });
      }

      return { uri: fileUri, filename };
    },
  });
};

export default useDownloadAirwayBillGoodsPDF;
