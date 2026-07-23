import { requireOptionalNativeModule } from 'expo-modules-core';

export interface ZplPrinterResult {
  bytesSent: number;
  durationMs: number;
}

interface LexdZplPrinterModule {
  testConnection(host: string, port: number, timeoutMs: number): Promise<ZplPrinterResult>;
  sendZpl(host: string, port: number, zpl: string, timeoutMs: number): Promise<ZplPrinterResult>;
}

export default requireOptionalNativeModule<LexdZplPrinterModule>('LexdZplPrinter');
