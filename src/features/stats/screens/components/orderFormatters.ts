const SHIPPING_ICON: Record<string, string> = {
  air: 'airplane-outline',
  sea: 'boat-outline',
};

export const getShippingIcon = (mode?: string): string =>
  SHIPPING_ICON[mode?.toLowerCase() ?? ''] || 'cube-outline';

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

export const formatAmount = (amount: number): string => {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M F`;
  return `${new Intl.NumberFormat('fr-FR').format(Math.round(num))} F`;
};

export const getStatusConfig = (status: string, colors: any) => {
  const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    Active: { label: 'Charge', color: colors.status.warning, bg: colors.feedback.warningBg },
    'In Transit': { label: 'En Transit', color: colors.status.info, bg: colors.feedback.infoBg },
    Delivered: { label: 'Livre', color: colors.status.success, bg: colors.feedback.successBg },
    Inactive: { label: 'Inactif', color: colors.text.secondary, bg: colors.background.paper },
  };
  return STATUS_MAP[status] || STATUS_MAP.Inactive;
};
