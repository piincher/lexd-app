import type { AuditLog } from '../types';

export const formatAuditDate = (value?: string) => {
  if (!value) return '';

  try {
    return new Date(value).toLocaleString('fr-FR', {
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
    });
  } catch {
    return value;
  }
};

export const getAuditActorName = (log: AuditLog) => {
  if (log.actor?.name) return log.actor.name;
  if (log.adminName) return log.adminName;

  if (typeof log.adminId === 'object') {
    const name = [log.adminId.firstName, log.adminId.lastName].filter(Boolean).join(' ');
    return name || log.adminId.role || 'Admin';
  }

  return 'Admin';
};

export const getAuditResourceLabel = (log: AuditLog) => {
  if (log.resource?.display) return log.resource.display;
  if (log.targetDisplay) return log.targetDisplay;
  if (log.resource?.type && log.resource?.id) return `${log.resource.type} ${log.resource.id}`;
  if (log.targetType) return log.targetType;
  return 'System resource';
};

export const formatValue = (value: unknown) => {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};
