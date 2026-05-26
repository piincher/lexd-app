import { Alert } from 'react-native';
import type { DuplicateCandidate } from '../../../types';

export const confirmDuplicateCandidates = (candidates: DuplicateCandidate[]) =>
  new Promise<boolean>((resolve) => {
    const preview = candidates
      .slice(0, 3)
      .map((item) => `• ${item.goodsId || item._id}${item.expressTrackingNumber ? ` (${item.expressTrackingNumber})` : ''}`)
      .join('\n');

    Alert.alert(
      'Doublon possible',
      `${preview}\n\nVoulez-vous quand même enregistrer cette marchandise ?`,
      [
        { text: 'Annuler', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Enregistrer quand même', style: 'destructive', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
