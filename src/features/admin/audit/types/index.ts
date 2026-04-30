export type AuditStatus = 'SUCCESS' | 'FAILED' | 'DENIED';
export type AuditSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AuditActor {
  id?: string;
  role?: string;
  name?: string;
}

export interface AuditResource {
  type?: string;
  id?: string;
  display?: string;
}

export interface AuditChange {
  before: unknown;
  after: unknown;
}

export interface AuditLog {
  _id: string;
  actor?: AuditActor;
  resource?: AuditResource;
  action: string;
  description?: string;
  reason?: string;
  status: AuditStatus;
  severity?: AuditSeverity;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  changeSet?: Record<string, AuditChange>;
  requestMetadata?: {
    ip?: string;
    userAgent?: string;
  };
  metadata?: Record<string, unknown>;
  errorMessage?: string;
  adminName?: string;
  targetType?: string;
  targetDisplay?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface AuditLogFilters {
  q?: string;
  action?: string;
  status?: AuditStatus | 'ALL';
  severity?: AuditSeverity | 'ALL';
  resourceType?: string;
  page?: number;
  limit?: number;
}

export interface AuditLogListResult {
  items: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
