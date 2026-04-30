export const WAVE_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.wave.wallet';

export const DEFAULT_COUNTRY_CODE = '+223';

export interface Instruction {
  icon: string;
  text: string;
}

export const WAVE_PAYMENT_INSTRUCTIONS: Instruction[] = [
  {
    icon: 'qrcode-scan',
    text: "Scan the QR code above with your Wave app, OR tap 'Open Wave App'",
  },
  {
    icon: 'check-circle',
    text: 'Confirm the payment amount in your Wave app',
  },
  {
    icon: 'lock',
    text: 'Enter your Wave PIN to authorize the payment',
  },
  {
    icon: 'checkbox-marked-circle',
    text: 'Wait for the confirmation screen',
  },
];
