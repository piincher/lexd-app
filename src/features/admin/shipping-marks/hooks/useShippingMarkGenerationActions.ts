import { useCallback, useEffect, useRef, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import type {
  BulkGenerateShippingMarksPayload,
  ShippingMarkGenerationJob,
} from '../api/shippingMarkAdminApi';

export type GenerateMode = 'missing' | 'regenerate';

const TERMINAL = ['COMPLETED', 'PARTIAL', 'FAILED'];

interface GenerationActionsOptions {
  selected: Set<string>;
  total: number;
  searchQuery?: string;
  generationJob?: ShippingMarkGenerationJob;
  isGeneratingBulk: boolean;
  generateBulk: (payload: BulkGenerateShippingMarksPayload) => Promise<ShippingMarkGenerationJob>;
  clearSelection: () => void;
}

export const useShippingMarkGenerationActions = ({
  selected, total, searchQuery, generationJob, isGeneratingBulk, generateBulk, clearSelection,
}: GenerationActionsOptions) => {
  const [mode, setMode] = useState<GenerateMode | null>(null);
  const [runningMode, setRunningMode] = useState<GenerateMode | null>(null);
  const notifiedJob = useRef<string | null>(null);
  const count = selected.size || total;

  const openMissing = useCallback(() => setMode('missing'), []);
  const openRegenerate = useCallback(() => setMode('regenerate'), []);
  const close = useCallback(() => setMode(null), []);

  const start = useCallback(async () => {
    const currentMode: GenerateMode = mode ?? 'missing';
    const force = currentMode === 'regenerate';
    // Optimistically mark which action owns the in-flight job so the matching
    // button (and only it) shows progress.
    setRunningMode(currentMode);
    const payload = selected.size
      ? { userIds: Array.from(selected), force }
      : { all: true, q: searchQuery, force };
    try {
      const job = await generateBulk(payload);
      showMessage({
        message: force ? 'Régénération programmée' : 'Génération programmée',
        description: force
          ? `${job.total} marque${job.total > 1 ? 's' : ''} à régénérer avec le nouveau design.`
          : `${job.total} marque${job.total > 1 ? 's' : ''} à préparer en arrière-plan.`,
        type: 'success',
      });
      close();
      clearSelection();
    } catch (error) {
      setRunningMode(null);
      showMessage({
        message: force ? 'Régénération impossible' : 'Génération impossible',
        description: error instanceof Error ? error.message : 'Réessayez dans quelques instants.',
        type: 'danger',
      });
    }
  }, [clearSelection, close, generateBulk, mode, searchQuery, selected]);

  // Keep runningMode in sync with the live job: derive it from job.force when we
  // don't already know it (e.g. app reloaded mid-job), and clear it once done.
  useEffect(() => {
    if (!generationJob) return;
    if (TERMINAL.includes(generationJob.status)) {
      setRunningMode(null);
      return;
    }
    setRunningMode((prev) => prev ?? (generationJob.force ? 'regenerate' : 'missing'));
  }, [generationJob]);

  useEffect(() => {
    if (!generationJob || notifiedJob.current === generationJob.id) return;
    if (!TERMINAL.includes(generationJob.status)) return;
    notifiedJob.current = generationJob.id;
    const label = generationJob.force ? 'Régénération' : 'Génération';
    showMessage({
      message: generationJob.status === 'COMPLETED'
        ? 'Marques prêtes'
        : `${label} terminée avec anomalies`,
      description: `${generationJob.generated}/${generationJob.total} générées · ${generationJob.failed} échec(s).`,
      type: generationJob.status === 'COMPLETED' ? 'success' : 'warning',
    });
  }, [generationJob]);

  const missingLoading = isGeneratingBulk && runningMode !== 'regenerate';
  const regenerateLoading = isGeneratingBulk && runningMode === 'regenerate';

  return {
    mode,
    visible: mode !== null,
    count,
    openMissing,
    openRegenerate,
    close,
    start,
    missingLoading,
    regenerateLoading,
  };
};
