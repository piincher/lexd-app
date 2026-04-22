/**
 * useCreateTicketForm Hook
 * Form state, validation, and submit logic for creating tickets
 */

import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';
import { hapticLight, hapticSuccess, hapticError } from '@src/shared/lib/haptics';
import { useCreateTicket, useUploadAttachment } from '../../hooks/useTickets';
import type { TicketType, TicketPriority } from '../../types';

const MAX_ATTACHMENTS = 5;

interface UseCreateTicketFormOptions {
  onSuccess?: () => void;
}

export const useCreateTicketForm = (options?: UseCreateTicketFormOptions) => {
  const [type, setType] = useState<TicketType | null>(null);
  const [priority, setPriority] = useState<TicketPriority>('MEDIUM');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateTicket();
  const uploadMutation = useUploadAttachment();

  const validate = useCallback((): boolean => {
    const next: Record<string, string> = {};
    if (!type) next.type = 'Veuillez sélectionner un type de demande';
    if (!subject.trim()) next.subject = 'Le sujet est requis';
    else if (subject.trim().length < 5) next.subject = 'Min. 5 caractères';
    if (!description.trim()) next.description = 'La description est requise';
    else if (description.trim().length < 20) next.description = 'Min. 20 caractères';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [type, subject, description]);

  const onSubmit = useCallback(async () => {
    if (!validate() || !type) return;
    try {
      await createMutation.mutateAsync({
        type,
        subject: subject.trim(),
        description: description.trim(),
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      hapticSuccess();
      showMessage({ message: 'Ticket créé avec succès', type: 'success', duration: 3000 });
      options?.onSuccess?.();
    } catch {
      hapticError();
      showMessage({ message: 'Erreur lors de la création', type: 'danger', duration: 3000 });
    }
  }, [validate, type, subject, description, attachments, createMutation]);

  const pickImage = useCallback(async () => {
    if (attachments.length >= MAX_ATTACHMENTS) {
      setErrors((prev) => ({ ...prev, attachments: `Maximum ${MAX_ATTACHMENTS} fichiers` }));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      try {
        const url = await uploadMutation.mutateAsync({
          file: { uri: asset.uri, name: asset.fileName || 'image.jpg', type: asset.mimeType || 'image/jpeg' },
        });
        setAttachments((prev) => [...prev, url]);
        hapticLight();
        setErrors((prev) => { const { attachments: _, ...rest } = prev; return rest; });
      } catch {
        showMessage({ message: "Impossible de télécharger l'image", type: 'danger', duration: 3000 });
      }
    }
  }, [attachments.length, uploadMutation]);

  const isSubmitting = createMutation.isPending || uploadMutation.isPending;

  return {
    form: { type, setType, priority, setPriority, subject, setSubject, description, setDescription, attachments, setAttachments },
    errors,
    isSubmitting,
    onSubmit,
    pickImage,
    isUploading: uploadMutation.isPending,
  };
};

export default useCreateTicketForm;
