import type { Container } from '../../types';
import type { Goods } from '../../../goods/types';
import type { ContainerClientDirectory, ContainerHealth, ContainerIssue } from './containerAssistTypes';
import {
  isDamaged,
  isUnidentified,
  isUnpaid,
  missingLocation,
  missingPhone,
  missingPhoto,
  missingQr,
} from './containerGoodsSignals';

const ADVANCED_EMPTY_STATUSES = new Set([
  'LOADING',
  'LOADED',
  'GATE_IN_FULL',
  'LOADED_ON_VESSEL',
  'IN_TRANSIT',
  'ARRIVED',
  'DISCHARGED',
  'READY_FOR_PICKUP',
  'DELIVERED',
]);

export const buildContainerIssues = (
  container: Container | undefined,
  goodsList: Goods[],
  health: ContainerHealth,
  directory?: ContainerClientDirectory,
): ContainerIssue[] => {
  const issues: ContainerIssue[] = [];
  const push = (id: string, title: string, count: number, detail: string, severity: ContainerIssue['severity']) => {
    if (count > 0) issues.push({ id, title, count, detail, severity });
  };

  if (health.capacityPercentage >= 100) {
    issues.push({ id: 'over-capacity', title: 'Capacité dépassée', count: 1, detail: `${health.capacityPercentage.toFixed(0)}% utilisé`, severity: 'error' });
  } else if (health.capacityPercentage >= 85) {
    issues.push({ id: 'high-capacity', title: 'Capacité élevée', count: 1, detail: `${health.capacityPercentage.toFixed(0)}% utilisé`, severity: 'warning' });
  }

  push('unpaid', 'Paiements à vérifier', goodsList.filter(isUnpaid).length, 'Marchandises non payées ou partielles', 'warning');
  push('unknown', 'Clients inconnus', goodsList.filter((goods) => isUnidentified(goods, directory)).length, 'Client manquant ou marchandise non identifiée', 'error');
  push('damaged', 'Exceptions réception', goodsList.filter(isDamaged).length, 'Colis endommagés ou en file exception', 'warning');
  push('location', 'Emplacement manquant', goodsList.filter(missingLocation).length, 'Marchandises sans localisation entrepôt', 'warning');
  push('phone', 'Téléphone client manquant', goodsList.filter((goods) => missingPhone(goods, directory)).length, 'Communication client limitée', 'info');
  push('qr-photo', 'Preuves incomplètes', goodsList.filter((goods) => missingQr(goods) || missingPhoto(goods)).length, 'QR ou photo manquant', 'info');

  if (container && goodsList.length === 0 && ADVANCED_EMPTY_STATUSES.has(container.status)) {
    issues.push({ id: 'empty-advanced', title: 'Container vide', count: 1, detail: 'Statut avancé sans marchandise assignée', severity: 'warning' });
  }

  return issues;
};
