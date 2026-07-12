import React from 'react';
import { ConfirmDialog } from '@src/shared/ui/ConfirmDialog';

interface BulkGenerateModalProps {
  visible: boolean;
  count: number;
  onClose: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const BulkGenerateModal: React.FC<BulkGenerateModalProps> = ({
  visible, count, onClose, onGenerate, isGenerating,
}) => {
  return (
    <ConfirmDialog
      visible={visible}
      onCancel={onClose}
      onConfirm={onGenerate}
      title="Générer les marques manquantes"
      message={`Préparer les marques pour ${count} client${count > 1 ? 's' : ''} ? Les marques existantes seront conservées et la génération continuera en arrière-plan.`}
      confirmText={isGenerating ? 'Programmation…' : 'Générer'}
      cancelText="Annuler"
      loading={isGenerating}
    />
  );
};
