/**
 * Export Analytics Types
 */

export interface ExportOptions {
  type: 'revenue' | 'customers' | 'containers' | 'goods' | 'payments';
  format: 'json' | 'csv' | 'xlsx' | 'pdf';
  from?: string;
  to?: string;
}
