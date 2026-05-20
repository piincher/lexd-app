/**
 * Dashboard Constants
 * Default values and helper functions for dashboard
 */

import { QuickAction, DashboardStats } from '../types';
import type {
  ActiveWorkSummary,
  RewardSummary,
  ShippingSummary,
  VipProgress,
} from '@src/shared/types/dashboard';

export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { id: 'view-goods', label: 'Mes marchandises', icon: 'package-variant-closed', route: 'MyGoods' },
  { id: 'view-containers', label: 'Mes expéditions', icon: 'airplane-takeoff', route: 'MyContainers' },
  // { id: 'payment-history', label: 'Historique', icon: 'receipt', route: 'MyPaymentHistory' },
  { id: 'support', label: 'Support', icon: 'chatbubble-ellipses', route: 'TicketList' },
];

export const DEFAULT_STATS: DashboardStats = {
  totalGoods: 0,
  goodsByStatus: {},
  totalContainers: 0,
  activeContainers: 0,
  totalSpent: 0,
  totalPaid: 0,
  balanceDue: 0,
};

export const DEFAULT_SHIPPING_SUMMARY: ShippingSummary = {
  totalCBM: 0,
  totalKg: 0,
  deliveredCBM: 0,
  deliveredKg: 0,
  shipmentCount: 0,
  deliveredCount: 0,
  currentMonthCBM: 0,
  currentMonthKg: 0,
  currentMonthSpend: 0,
  currentMonthShipmentCount: 0,
  currentMonthDeliveredCount: 0,
  totalSpent: 0,
  totalPaid: 0,
  balanceDue: 0,
  averageShipmentValue: 0,
};

export const DEFAULT_ACTIVE_WORK: ActiveWorkSummary = {
  warehouseGoods: 0,
  inTransitGoods: 0,
  arrivedGoods: 0,
  readyForPickupGoods: 0,
  unpaidGoods: 0,
  pendingPayments: 0,
  pendingActions: 0,
};

export const DEFAULT_REWARD_SUMMARY: RewardSummary = {
  rewardPoints: 0,
  pointValueFCFA: 50,
  rewardValueFCFA: 0,
};

export const DEFAULT_VIP_PROGRESS: VipProgress = {
  currentTier: {
    id: 'beginner',
    name: 'Débutant',
    description: 'Bienvenue chez ChinaLink Express',
    requiredCBM: 0,
  },
  nextTier: null,
  metric: 'CBM',
  deliveredCBM: 0,
  deliveredKg: 0,
  progressPercent: 0,
  remainingCBM: 0,
  rewardPoints: 0,
  rewardValueFCFA: 0,
};

export const getWelcomeMessage = (name: string): string => {
  const hour = new Date().getHours();
  const firstName = name?.split(' ')[0] || 'Client';
  if (hour < 12) return `Bonjour, ${firstName} ☀️`;
  if (hour < 18) return `Bon après-midi, ${firstName} 👋`;
  return `Bonsoir, ${firstName} 🌙`;
};
