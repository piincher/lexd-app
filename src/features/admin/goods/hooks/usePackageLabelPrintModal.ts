import { useEffect, useMemo, useState } from 'react';
import {
  useGoodsPackageLabels,
  usePrintPackageLabels,
  useWarehousePrinters,
} from '@src/entities/goodsPackage';

export const usePackageLabelPrintModal = (goodsId?: string, visible = false) => {
  const packageQuery = useGoodsPackageLabels(goodsId, visible);
  const printerQuery = useWarehousePrinters(visible);
  const printMutation = usePrintPackageLabels();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [printerId, setPrinterId] = useState('');
  const [reprintReason, setReprintReason] = useState('');
  const packages = useMemo(() => packageQuery.data?.packages || [], [packageQuery.data?.packages]);
  const printers = useMemo(() => printerQuery.data?.printers || [], [printerQuery.data?.printers]);
  const activeIds = useMemo(() => packages.flatMap((item) => item.label?.status === 'ACTIVE' ? [item.label.labelId] : []), [packages]);

  useEffect(() => {
    if (visible && activeIds.length) setSelectedIds(activeIds);
  }, [visible, activeIds]);

  useEffect(() => {
    if (!printerId && printers.length) {
      setPrinterId((printers.find((printer) => printer.isDefault) || printers[0])._id);
    }
  }, [printerId, printers]);

  const toggle = (labelId: string) => setSelectedIds((current) =>
    current.includes(labelId) ? current.filter((id) => id !== labelId) : [...current, labelId]);
  const selectedPackages = packages.filter((item) => item.label && selectedIds.includes(item.label.labelId));
  const needsReason = selectedPackages.some((item) => (item.label?.printCount || 0) > 0);
  const canPrint = selectedIds.length > 0 && !!printerId && (!needsReason || reprintReason.trim().length >= 3);

  const print = async () => printMutation.mutateAsync({
    labelIds: selectedIds,
    printerId,
    reprintReason: needsReason ? reprintReason.trim() : undefined,
  });

  return {
    packages, printers, selectedIds, printerId, reprintReason, needsReason, canPrint,
    isLoading: packageQuery.isLoading || printerQuery.isLoading,
    isError: packageQuery.isError || printerQuery.isError,
    isPrinting: printMutation.isPending,
    error: printMutation.error,
    setPrinterId, setReprintReason, toggle, selectAll: () => setSelectedIds(activeIds), print,
    retry: () => { packageQuery.refetch(); printerQuery.refetch(); },
  };
};
