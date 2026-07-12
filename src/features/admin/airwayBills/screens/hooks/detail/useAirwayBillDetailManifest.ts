import {
  useAirwayBillGoodsManifestDownload,
  useGetAirwayBillGoodsManifest,
} from '../../../hooks/airwayBills';

export const useAirwayBillDetailManifest = (airwayBillId?: string, awbNumber?: string) => {
  const {
    data: goodsManifestResponse,
    isLoading: isLoadingGoodsManifest,
    refetch: refetchGoodsManifest,
    error: goodsManifestError,
  } = useGetAirwayBillGoodsManifest(airwayBillId);
  const { download: handleDownloadGoodsManifest, isDownloading: isDownloadingGoodsManifest } =
    useAirwayBillGoodsManifestDownload(airwayBillId, awbNumber);

  return {
    goodsManifest: goodsManifestResponse?.data?.manifest,
    isLoadingGoodsManifest,
    goodsManifestError,
    refetchGoodsManifest,
    handleDownloadGoodsManifest,
    isDownloadingGoodsManifest,
  };
};
