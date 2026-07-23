import { Platform } from 'react-native';
import { printErrorMessage } from '../printErrorMessage';

/** Build the shape expo-modules-core gives JS for a native `CodedException`. */
const codedError = (code: string, message: string) => Object.assign(new Error(message), { code });

const setPlatform = (os: 'android' | 'ios') => {
  Object.defineProperty(Platform, 'OS', { value: os, configurable: true });
};

describe('printErrorMessage', () => {
  const originalOS = Platform.OS;
  afterEach(() => setPlatform(originalOS as 'android' | 'ios'));

  it('translates an unreachable printer instead of leaking the host and port', () => {
    const message = printErrorMessage(
      codedError('ERR_PRINTER_CONNECTION', 'Could not reach printer at 192.168.1.50:9100'),
    );

    expect(message).toContain('Imprimante injoignable');
    expect(message).not.toContain('192.168.1.50');
  });

  it('translates an invalid endpoint and an oversized payload', () => {
    expect(printErrorMessage(codedError('ERR_INVALID_PRINTER_ENDPOINT', 'A valid printer host and port are required')))
      .toContain('Adresse ou port');
    expect(printErrorMessage(codedError('ERR_INVALID_ZPL', 'ZPL payload size is invalid: 0 bytes')))
      .toContain('Contenu d’impression invalide');
  });

  it('tells an Android operator on a stale build to install the native update', () => {
    setPlatform('android');

    const message = printErrorMessage(new Error('NATIVE_PRINTER_UNAVAILABLE'));

    expect(message).toContain('mise à jour native');
    expect(message).not.toContain('NATIVE_PRINTER_UNAVAILABLE');
  });

  it('points an iOS operator at the system print dialog', () => {
    setPlatform('ios');

    const message = printErrorMessage(new Error('NATIVE_PRINTER_UNAVAILABLE'));

    expect(message).toContain('dialogue d’impression système');
    expect(message).not.toContain('NATIVE_PRINTER_UNAVAILABLE');
  });

  it('preserves an already-actionable message and falls back for non-errors', () => {
    const warning = 'Étiquettes transmises, mais confirmation serveur impossible.';

    expect(printErrorMessage(new Error(warning))).toBe(warning);
    expect(printErrorMessage(undefined)).toBe('Échec de l’impression.');
    expect(printErrorMessage(undefined, 'Action impossible.')).toBe('Action impossible.');
  });
});
