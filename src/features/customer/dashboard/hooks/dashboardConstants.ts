/**
 * Dashboard Constants
 * Default values and helper functions for dashboard
 */

import { QuickAction, DashboardStats } from '../types';

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

export const getWelcomeMessage = (name: string): string => {
  const hour = new Date().getHours();
  const firstName = name?.split(' ')[0] || 'Client';
  if (hour < 12) return `Bonjour, ${firstName} ☀️`;
  if (hour < 18) return `Bon après-midi, ${firstName} 👋`;
  return `Bonsoir, ${firstName} 🌙`;
};
