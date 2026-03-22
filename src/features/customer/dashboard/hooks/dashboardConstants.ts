/**
 * Dashboard Constants
 * Default values and helper functions for dashboard
 */

import { QuickAction, DashboardStats } from '../types';

export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { id: 'view-goods', label: 'Voir mes marchandises', icon: 'package-variant-closed', route: 'MyGoods' },
  { id: 'view-containers', label: 'Mes containers', icon: 'container', route: 'MyContainers' },
  { id: 'contact-support', label: 'Contacter support', icon: 'chat', route: 'SelectAdminToChatWith' },
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
