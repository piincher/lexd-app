import { Platform } from 'react-native';

/**
 * Maps printer transport failures to messages a warehouse operator can act on.
 *
 * The native module raises Expo `CodedException`s (surfaced in JS as `error.code`)
 * and the transport layer raises `NATIVE_PRINTER_UNAVAILABLE` when the native
 * module is absent — which happens on iOS, and on any Android build that received
 * the JS bundle over OTA without the matching native binary. Printing is operated
 * in French on the warehouse floor, so raw codes must never reach the screen.
 */
const CODED_MESSAGES: Record<string, string> = {
  ERR_PRINTER_CONNECTION:
    'Imprimante injoignable. Vérifiez qu’elle est allumée, connectée au réseau de l’entrepôt, et que son adresse IP est correcte.',
  ERR_INVALID_PRINTER_ENDPOINT:
    'Adresse ou port de l’imprimante invalide. Corrigez la configuration de l’imprimante.',
  ERR_INVALID_ZPL:
    'Contenu d’impression invalide. Réduisez le nombre d’étiquettes sélectionnées, puis réessayez.',
};

const UNAVAILABLE_ANDROID =
  'Cette version de l’application ne peut pas imprimer. Installez la dernière version Android : l’impression exige une mise à jour native.';
const UNAVAILABLE_OTHER =
  'L’envoi direct à l’imprimante réseau n’est disponible que sur Android. Sur iPhone, utilisez le dialogue d’impression système.';

export const printErrorMessage = (error: unknown, fallback = 'Échec de l’impression.'): string => {
  if (!(error instanceof Error)) return fallback;

  const coded = CODED_MESSAGES[(error as { code?: string }).code ?? ''];
  if (coded) return coded;

  if (error.message === 'NATIVE_PRINTER_UNAVAILABLE') {
    return Platform.OS === 'android' ? UNAVAILABLE_ANDROID : UNAVAILABLE_OTHER;
  }

  return error.message || fallback;
};
