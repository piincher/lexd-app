import { useRef, useState } from 'react';
import { useAssignPackageScan } from '../hooks';
import type { PackageScanResult, PackageTargetType } from '../types';

export type ScanFeedback = { tone: 'success' | 'error' | 'info'; message: string } | null;

const errorMessages: Record<string, string> = {
  SHIPPING_MODE_MISMATCH: 'Ce colis utilise un autre mode de transport.',
  MIXED_CONTAINER_NOT_ALLOWED: 'Un autre colis de cette marchandise est déjà dans un autre conteneur.',
  MIXED_AWB_NOT_ALLOWED: 'Un autre colis de cette marchandise est déjà sur une autre LTA/AWB.',
  PACKAGE_ALREADY_ASSIGNED: 'Ce colis est déjà affecté à une autre destination.',
  LABEL_REVOKED: 'Cette étiquette a été remplacée. Utilisez la nouvelle étiquette.',
  PACKAGE_SCAN_REQUIRED: 'Scannez l’étiquette du colis physique, pas le code général de la marchandise.',
  TARGET_CLOSED: 'Cette destination est fermée et ne peut plus recevoir de colis.',
};

const operationKey = () => `scan-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

export const usePackageAssignmentScanner = (targetType: PackageTargetType, targetId: string) => {
  const mutation = useAssignPackageScan();
  const lock = useRef(false);
  const lastScan = useRef({ code: '', at: 0 });
  const [feedback, setFeedback] = useState<ScanFeedback>(null);
  const [assignedCount, setAssignedCount] = useState(0);
  const [lastResult, setLastResult] = useState<PackageScanResult | null>(null);

  const scan = async (code: string) => {
    const normalized = code.trim();
    if (lock.current || !normalized) return;
    if (lastScan.current.code === normalized && Date.now() - lastScan.current.at < 2_500) return;
    lock.current = true;
    lastScan.current = { code: normalized, at: Date.now() };
    try {
      const result = await mutation.mutateAsync({ code: normalized, targetType, targetId, idempotencyKey: operationKey() });
      setLastResult(result);
      const added = result.event?.result === 'ASSIGNED';
      if (added) setAssignedCount((count) => count + 1);
      setFeedback({ tone: added ? 'success' : 'info', message: added ? `Ajouté : ${result.package.packageCode}` : `Déjà affecté : ${result.package.packageCode}` });
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
      const message = errorMessages[code] || (error instanceof Error ? error.message : 'Code invalide ou colis introuvable.');
      setFeedback({ tone: 'error', message });
    } finally {
      setTimeout(() => { lock.current = false; }, 1_000);
    }
  };

  const reset = () => { setFeedback(null); setAssignedCount(0); setLastResult(null); lock.current = false; lastScan.current = { code: '', at: 0 }; };
  return { scan, reset, feedback, assignedCount, lastResult, isPending: mutation.isPending };
};
