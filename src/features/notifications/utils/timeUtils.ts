/**
 * Time Utilities for Notifications
 * French locale relative time formatting
 */

const UNITS = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: 24 * 60 * 60 * 1000 * 30,
  week: 24 * 60 * 60 * 1000 * 7,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
} as const;

/**
 * Format a date to relative time in French
 * Example: "il y a 5 minutes", "il y a 2 heures", "hier"
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();

  // Future date
  if (diff < 0) {
    const absDiff = Math.abs(diff);
    
    if (absDiff < UNITS.minute) {
      return "à l'instant";
    }
    if (absDiff < UNITS.hour) {
      const minutes = Math.floor(absDiff / UNITS.minute);
      return `dans ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    if (absDiff < UNITS.day) {
      const hours = Math.floor(absDiff / UNITS.hour);
      return `dans ${hours} heure${hours > 1 ? 's' : ''}`;
    }
    if (absDiff < UNITS.week) {
      const days = Math.floor(absDiff / UNITS.day);
      return `dans ${days} jour${days > 1 ? 's' : ''}`;
    }
    if (absDiff < UNITS.month) {
      const weeks = Math.floor(absDiff / UNITS.week);
      return `dans ${weeks} semaine${weeks > 1 ? 's' : ''}`;
    }
    if (absDiff < UNITS.year) {
      const months = Math.floor(absDiff / UNITS.month);
      return `dans ${months} mois`;
    }
    const years = Math.floor(absDiff / UNITS.year);
    return `dans ${years} an${years > 1 ? 's' : ''}`;
  }

  // Past date
  if (diff < UNITS.second * 10) {
    return "à l'instant";
  }
  if (diff < UNITS.minute) {
    const seconds = Math.floor(diff / UNITS.second);
    return `il y a ${seconds} seconde${seconds > 1 ? 's' : ''}`;
  }
  if (diff < UNITS.hour) {
    const minutes = Math.floor(diff / UNITS.minute);
    return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  if (diff < UNITS.day) {
    const hours = Math.floor(diff / UNITS.hour);
    if (hours === 1) return 'il y a 1 heure';
    return `il y a ${hours} heures`;
  }
  if (diff < UNITS.week) {
    const days = Math.floor(diff / UNITS.day);
    if (days === 1) return 'hier';
    return `il y a ${days} jours`;
  }
  if (diff < UNITS.month) {
    const weeks = Math.floor(diff / UNITS.week);
    if (weeks === 1) return 'il y a 1 semaine';
    return `il y a ${weeks} semaines`;
  }
  if (diff < UNITS.year) {
    const months = Math.floor(diff / UNITS.month);
    if (months === 1) return 'il y a 1 mois';
    return `il y a ${months} mois`;
  }
  
  const years = Math.floor(diff / UNITS.year);
  if (years === 1) return 'il y a 1 an';
  return `il y a ${years} ans`;
}

/**
 * Format a date to a full French date string
 * Example: "15 janvier 2024 à 14:30"
 */
export function formatFullDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  return `${day} ${month} ${year} à ${hours}:${minutes}`;
}

/**
 * Format a date to a short French date string
 * Example: "15/01/2024"
 */
export function formatShortDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
}
