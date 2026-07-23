import React from 'react';
import { ConfirmDialog } from '@src/shared/ui/ConfirmDialog';
import type { GenerateMode } from '../hooks/useShippingMarkGenerationActions';

interface BulkGenerateModalProps {
  visible: boolean;
  mode: GenerateMode | null;
  count: number;
  onClose: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const BulkGenerateModal: React.FC<BulkGenerateModalProps> = ({
  visible, mode, count, onClose, onGenerate, isGenerating,
}) => {
  const isRegenerate = mode === 'regenerate';
  const plural = count > 1 ? 's' : '';

  return (
    <ConfirmDialog
      visible={visible}
      variant={isRegenerate ? 'danger' : 'primary'}
      onCancel={onClose}
      onConfirm={onGenerate}
      title={isRegenerate ? 'Régénérer les marques' : 'Générer les marques manquantes'}
      message={isRegenerate
        ? `Régénérer ${count} marque${plural} avec le nouveau design ? Les marques existantes seront écrasées et remplacées. Cette action est irréversible et se poursuit en arrière-plan.`
        : `Préparer les marques pour ${count} client${plural} ? Les marques existantes seront conservées et la génération continuera en arrière-plan.`}
      confirmText={isGenerating ? 'Programmation…' : isRegenerate ? 'Régénérer' : 'Générer'}
      cancelText="Annuler"
      loading={isGenerating}
    />
  );
};
