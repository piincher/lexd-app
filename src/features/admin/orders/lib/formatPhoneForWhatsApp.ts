export const formatPhoneForWhatsApp = (phone: string): string => {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-().+]/g, '');
  if (cleaned.startsWith('00')) cleaned = cleaned.substring(2);
  if (!cleaned.startsWith('223') && cleaned.length === 8) {
    cleaned = '223' + cleaned;
  }
  return cleaned;
};
