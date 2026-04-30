import type { NotificationEventLog, NotificationEventUser } from '../types';

export const formatNotificationEventDate = (value?: string) => {
  if (!value) return 'Non disponible';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Non disponible';
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getNotificationEventUserLabel = (event: NotificationEventLog) => {
  const user = event.userId;
  if (!user) return 'Utilisateur inconnu';
  if (typeof user === 'string') return user;

  const typedUser = user as NotificationEventUser;
  const name = `${typedUser.firstName || ''} ${typedUser.lastName || ''}`.trim();
  return name || typedUser.phoneNumber || typedUser._id;
};
