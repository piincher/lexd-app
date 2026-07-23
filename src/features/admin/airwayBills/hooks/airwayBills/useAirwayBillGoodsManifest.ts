import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { airwayBillService } from '../../services/AirwayBillService';
import { ApiClientError } from '@src/api/client';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { downloadApiPdf, sharePDFGeneric } from '@src/shared/lib/pdfShare';
import { airwayBillQueryKeys } from './queryKeys';

type ManifestResponse = Awaited<ReturnType<typeof airwayBillService.getGoodsManifest>>;

const BASE_URL = '/airway-bills';

const safeFilename = (awbNumber?: string) =>
  `AWB-${awbNumber || 'manifest'}-goods-manifest.pdf`.replace(/[^\w.-]+/g, '_');

export const useGetAirwayBillGoodsManifest = (
  id: string | undefined,
  options?: UseQueryOptions<ManifestResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.goodsManifest(id || ''),
    queryFn: () => airwayBillService.getGoodsManifest(id!),
    enabled: !!id,
    staleTime: DEFAULT_STALE_TIME,
    ...options,
  });
};

export const useAirwayBillGoodsManifestDownload = (id: string | undefined, awbNumber?: string) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = useCallback(async () => {
    if (!id || isDownloading) return;
    setIsDownloading(true);
    try {
      const filename = safeFilename(awbNumber);
      const fileUri = await downloadApiPdf(`${BASE_URL}/${id}/goods-manifest/export`, filename);
      if (fileUri) {
        await sharePDFGeneric({ fileUri, filename, message: 'Manifeste marchandises AWB' });
      }
    } catch (error) {
      Alert.alert(
        'Téléchargement impossible',
        error instanceof Error ? error.message : 'Veuillez réessayer dans un instant.'
      );
    } finally {
      setIsDownloading(false);
    }
  }, [awbNumber, id, isDownloading]);

  return { download, isDownloading };
};
