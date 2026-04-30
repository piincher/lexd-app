export type DateRangePreset = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DateRangePickerProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (range: DateRange, preset: DateRangePreset) => void;
  initialRange?: DateRange;
  initialPreset?: DateRangePreset;
  minDate?: Date;
  maxDate?: Date;
}

export interface PresetOption {
  key: DateRangePreset;
  label: string;
  icon: string;
}
