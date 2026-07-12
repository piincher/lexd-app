import { useCallback, useEffect, useRef, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import type {
  BulkGenerateShippingMarksPayload,
  ShippingMarkGenerationJob,
} from '../api/shippingMarkAdminApi';

interface GenerationActionsOptions {
  selected: Set<string>;
  total: number;
  searchQuery?: string;
  generationJob?: ShippingMarkGenerationJob;
  generateBulk: (payload: BulkGenerateShippingMarksPayload) => Promise<ShippingMarkGenerationJob>;
  clearSelection: () => void;
}

export const useShippingMarkGenerationActions = ({
  selected, total, searchQuery, generationJob, generateBulk, clearSelection,
}: GenerationActionsOptions) => {
  const [visible, setVisible] = useState(false);
  const notifiedJob = useRef<string | null>(null);
  const count = selected.size || total;

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const start = useCallback(async () => {
    const payload = selected.size
      ? { userIds: Array.from(selected), force: false }
      : { all: true, q: searchQuery, force: false };
    try {
      const job = await generateBulk(payload);
      showMessage({
        message: 'Génération programmée',
        description: `${job.total} marque${job.total > 1 ? 's' : ''} à préparer en arrière-plan.`,
        type: 'success',
      });
      close();
      clearSelection();
    } catch (error) {
      showMessage({
        message: 'Génération impossible',
        description: error instanceof Error ? error.message : 'Réessayez dans quelques instants.',
        type: 'danger',
      });
    }
  }, [clearSelection, close, generateBulk, searchQuery, selected]);

  useEffect(() => {
    if (!generationJob || notifiedJob.current === generationJob.id) return;
    if (!['COMPLETED', 'PARTIAL', 'FAILED'].includes(generationJob.status)) return;
    notifiedJob.current = generationJob.id;
    showMessage({
      message: generationJob.status === 'COMPLETED' ? 'Marques prêtes' : 'Génération terminée avec anomalies',
      description: `${generationJob.generated}/${generationJob.total} générées · ${generationJob.failed} échec(s).`,
      type: generationJob.status === 'COMPLETED' ? 'success' : 'warning',
    });
  }, [generationJob]);

  return { visible, count, open, close, start };
};
