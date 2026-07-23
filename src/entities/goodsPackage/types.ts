export type ShippingMode = 'AIR' | 'SEA';
export type PackageTargetType = 'SEA_CONTAINER' | 'AIR_CARGO_BAG' | 'AIR_AWB';

export interface PackageLabel {
  labelId: string;
  version: number;
  status: 'ACTIVE' | 'REVOKED';
  printCount: number;
  qrPayload: string;
}

export interface GoodsPackage {
  _id: string;
  goodsId: string;
  packageCode: string;
  sequence: number;
  packageCount: number;
  shippingMode: ShippingMode;
  weight: number;
  actualCBM: number;
  measurementSource: 'MEASURED' | 'EQUAL_SPLIT' | 'GOODS_TOTAL';
  status: string;
  containerId?: string | null;
  airwayBillId?: string | null;
  cargoBagId?: string | null;
  label: PackageLabel | null;
}

export interface WarehousePrinter {
  _id: string;
  code: string;
  name: string;
  warehouseLocation: string;
  protocol: 'NETWORK_ZPL';
  host: string;
  port: number;
  dpi: 203 | 300;
  labelWidthMm: number;
  labelHeightMm: number;
  isDefault: boolean;
  isActive: boolean;
  status: 'UNKNOWN' | 'ONLINE' | 'OFFLINE' | 'ERROR';
  lastSeenAt?: string | null;
  lastError?: string;
}

export interface LabelPrintDocument {
  labelId: string;
  checksum: string;
  zpl: string;
  qrSvg: string;
  preview: {
    goodsCode: string;
    packageCode: string;
    packageSequence: number;
    packageCount: number;
    shippingMode: ShippingMode;
    clientMark: string;
    description: string;
    quantity: number;
    weightText: string;
    warehouseLocation: string;
    labelVersion: number;
  };
}

export interface LabelPrintJob {
  jobId: string;
  labelIds: string[];
  printerId: WarehousePrinter;
  copies: number;
  documents: LabelPrintDocument[];
  status: 'QUEUED' | 'READY' | 'SENDING' | 'PRINTED' | 'FAILED' | 'CANCELLED';
  isReprint: boolean;
  reprintReason?: string;
  attempts: number;
  lastError?: { code?: string; message?: string; at?: string | null };
  createdAt?: string;
  sentAt?: string | null;
  printedAt?: string | null;
  cancelledAt?: string | null;
}

export interface LabelPrintJobSummary extends Omit<LabelPrintJob, 'documents' | 'printerId'> {
  printerId: Pick<WarehousePrinter, '_id' | 'code' | 'name' | 'host' | 'port' | 'status' | 'isActive'> | null;
  requestedBy?: { firstName?: string; lastName?: string; email?: string; phoneNumber?: string } | null;
}

export interface PrintJobPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PackageScanResult {
  package: Omit<GoodsPackage, 'goodsId'> & {
    goodsId: {
      _id: string;
      goodsId: string;
      description: string;
      quantity: number;
      packageCount: number;
      shippingMode: ShippingMode;
      warehouseLocation: string;
      clientId?: {
        firstName?: string;
        lastName?: string;
        shippingClientId?: string;
      } | null;
    };
  };
  label: PackageLabel;
  event?: {
    eventId: string;
    result: 'ASSIGNED' | 'ALREADY_ASSIGNED';
    targetType: PackageTargetType;
    targetId: string;
    targetDisplay: string;
  };
  idempotent?: boolean;
}

export interface CreatePrintJobInput {
  labelIds: string[];
  printerId: string;
  copies?: number;
  idempotencyKey: string;
  reprintReason?: string;
  device?: { deviceId?: string; platform?: 'android' | 'ios' | 'unknown'; appVersion?: string };
}

export interface AssignPackageScanInput {
  code: string;
  targetType: PackageTargetType;
  targetId: string;
  idempotencyKey: string;
}
