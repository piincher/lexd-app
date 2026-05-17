export interface Balance {
  totalUnits: number;
  status: 'success' | 'warning' | 'danger';
  daysRemaining?: number;
  expirationDateShort?: string | null;
  hasExpired?: boolean;
  hasExpiringSoon?: boolean;
}
