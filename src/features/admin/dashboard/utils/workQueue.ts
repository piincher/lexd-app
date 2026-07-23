import type { Goods } from '@src/features/admin/shared/types';
import type {
  AdminWorkQueueItem,
  OutstandingPaymentItem,
  WorkQueueSeverity,
} from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;
const severityRank: Record<WorkQueueSeverity, number> = { critical: 3, warning: 2, info: 1 };

const ageInDays = (date: string | undefined, now: number) => {
  const timestamp = date ? new Date(date).getTime() : now;
  return Number.isFinite(timestamp) ? Math.max(0, Math.floor((now - timestamp) / DAY_MS)) : 0;
};

const clientName = (goods: Goods) => {
  if (goods.clientName) return goods.clientName;
  if (typeof goods.clientId === 'object' && goods.clientId) {
    return `${goods.clientId.firstName || ''} ${goods.clientId.lastName || ''}`.trim();
  }
  return undefined;
};

const assignmentSeverity = (days: number): WorkQueueSeverity =>
  days >= 8 ? 'critical' : days >= 4 ? 'warning' : 'info';

const buildGoodsTasks = (goods: Goods, now: number): AdminWorkQueueItem[] => {
  const ageDays = ageInDays(goods.receivedAt || goods.createdAt, now);
  const common = { goodsId: goods.goodsId, ageDays, clientName: clientName(goods) };
  const tasks: AdminWorkQueueItem[] = [];

  if (goods.ownerStatus === 'UNIDENTIFIED' || !goods.clientId) {
    tasks.push({ ...common, id: `owner:${goods._id}`, kind: 'owner', severity: 'critical', title: 'Client à identifier', description: goods.description || 'Marchandise sans propriétaire' });
  }
  if (goods.intakeException?.isException && !goods.intakeException.resolvedAt) {
    tasks.push({ ...common, id: `intake:${goods._id}`, kind: 'intake', severity: 'critical', title: 'Exception de réception', description: goods.intakeException.notes || goods.intakeException.reasons.join(', ') || goods.description || 'Exception à vérifier' });
  }
  tasks.push({ ...common, id: `assignment:${goods._id}`, kind: 'assignment', severity: assignmentSeverity(ageDays), title: 'Affectation logistique', description: goods.description || 'À affecter à un départ' });
  return tasks;
};

export const buildAdminWorkQueue = (
  goods: Goods[],
  payments: OutstandingPaymentItem[],
  now = Date.now(),
): AdminWorkQueueItem[] => {
  const goodsTasks = goods.flatMap((item) => buildGoodsTasks(item, now));
  const paymentTasks: AdminWorkQueueItem[] = payments.map((item) => {
    const ageDays = ageInDays(item.receivedAt || item.createdAt, now);
    return {
      id: `payment:${item._id}`,
      goodsId: item.goodsId,
      kind: 'payment',
      severity: ageDays >= 60 ? 'critical' : 'warning',
      title: 'Paiement en attente',
      description: item.description || 'Solde restant à encaisser',
      clientName: item.clientName,
      ageDays,
      amountDue: item.balanceDue,
    };
  });

  return [...goodsTasks, ...paymentTasks].sort((a, b) =>
    severityRank[b.severity] - severityRank[a.severity]
      || b.ageDays - a.ageDays
      || (b.amountDue || 0) - (a.amountDue || 0),
  );
};
