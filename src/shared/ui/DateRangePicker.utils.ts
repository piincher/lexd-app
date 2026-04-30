import { DateRange, DateRangePreset, PresetOption } from './DateRangePicker.types';

export const PRESETS: PresetOption[] = [
  { key: 'today', label: "Aujourd'hui", icon: 'calendar-today' },
  { key: 'week', label: 'Cette semaine', icon: 'calendar-week' },
  { key: 'month', label: 'Ce mois', icon: 'calendar-month' },
  { key: 'quarter', label: 'Ce trimestre', icon: 'calendar-range' },
  { key: 'year', label: 'Cette année', icon: 'calendar' },
  { key: 'custom', label: 'Personnalisé', icon: 'calendar-edit' },
];

export const getPresetRange = (preset: DateRangePreset): DateRange => {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  switch (preset) {
    case 'today':
      break;
    case 'week': {
      const dayOfWeek = startDate.getDay();
      const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      startDate.setDate(diff);
      break;
    }
    case 'month':
      startDate.setDate(1);
      break;
    case 'quarter': {
      const currentQuarter = Math.floor(startDate.getMonth() / 3);
      startDate.setMonth(currentQuarter * 3, 1);
      break;
    }
    case 'year':
      startDate.setMonth(0, 1);
      break;
    case 'custom':
    default:
      startDate.setDate(startDate.getDate() - 30);
      break;
  }

  return { startDate, endDate };
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
