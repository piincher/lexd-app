export interface Balance {
  totalUnits: number;
  totalRequestedUnits?: number;
  status: 'success' | 'warning' | 'danger';
  daysRemaining?: number;
  expirationDateShort?: string | null;
  hasExpired?: boolean;
  hasExpiringSoon?: boolean;
  expiredCount?: number;
}
