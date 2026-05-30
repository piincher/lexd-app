export interface ReferralPerson {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  joinedAt: string;
  rewardAwarded: boolean;
}

export interface ReferralReward {
  id: string;
  pointsEarned: number;
  type: 'referral';
  dateEarned: string;
  order: {
    id: string;
    code: string;
  } | null;
}

export type RewardRedemptionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface RewardRedemptionUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  name: string;
  rewardPoints: number;
}

export interface RewardRedemption {
  id: string;
  userId: string;
  user: RewardRedemptionUser | null;
  status: RewardRedemptionStatus;
  requestedPoints: number;
  pointValueFCFA: number;
  requestedValueFCFA: number;
  approvedPoints: number;
  approvedValueFCFA: number;
  restoredPoints: number;
  goodsIds: string[];
  paymentId: string | null;
  requestNote: string;
  adminNote: string;
  rejectionReason: string;
  reviewedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  idempotencyKey: string | null;
}

export type RewardLedgerType = 'EARN' | 'REDEEM' | 'REVERSAL' | 'ADMIN_ADJUSTMENT';

export interface RewardSettings {
  enabled: boolean;
  cbmUnit: number;
  pointsPerCbmUnit: number;
  kgUnit: number;
  pointsPerKgUnit: number;
  pointValueFCFA: number;
  maxInvoiceDiscountPercent: number;
  minRedemptionPoints: number;
}

export interface RewardLedgerEntry {
  id: string;
  userId: string;
  user?: RewardRedemptionUser | null;
  type: RewardLedgerType;
  pointsDelta: number;
  pointValueFCFA: number;
  valueFCFA: number;
  balanceAfter: number;
  shipmentUnit: 'CBM' | 'KG' | null;
  shipmentQuantity: number | null;
  earningUnit?: number | null;
  source?: {
    type: string;
    id: string;
    reference?: string;
  };
  note: string;
  createdAt: string;
}

export interface RewardSummary {
  rewardPoints: number;
  pointValueFCFA: number;
  rewardValueFCFA: number;
  settings: RewardSettings;
  ledger: RewardLedgerEntry[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface RewardLedgerList {
  items: RewardLedgerEntry[];
  pagination: PaginationInfo;
}

export interface EligibleRedemptionGoods {
  id: string;
  goodsId: string;
  description: string;
  totalCost: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: 'UNPAID' | 'PARTIAL';
  shippingMode?: 'AIR' | 'SEA';
  receivedAt: string;
}

export interface AdminRedemptionList {
  items: RewardRedemption[];
  pagination: PaginationInfo;
}

export interface UserRedemptionList {
  items: RewardRedemption[];
  pagination: PaginationInfo;
}

export interface EligibleGoodsResult {
  redemption: RewardRedemption;
  items: EligibleRedemptionGoods[];
  outstandingBalanceFCFA: number;
  maxRedeemableValueFCFA: number;
  maxRedeemablePoints: number;
}

export interface ApproveRedemptionPayload {
  approvedPoints: number;
  goodsIds: string[];
  note?: string;
}

export interface RedemptionStatusCount {
  count: number;
  totalPoints: number;
}

export interface RedemptionAnalyticsTotals {
  totalRequests: number;
  totalRequestedPoints: number;
  totalApprovedPoints: number;
  totalApprovedValueFCFA: number;
  averageApprovalTimeMinutes: number;
}

export interface TopRedeemer {
  userId: string;
  name: string;
  phoneNumber: string;
  totalApprovedPoints: number;
  redemptionCount: number;
}

export interface RedemptionAnalytics {
  totals: RedemptionAnalyticsTotals;
  byStatus: {
    PENDING: RedemptionStatusCount;
    APPROVED: RedemptionStatusCount;
    REJECTED: RedemptionStatusCount;
    CANCELLED: RedemptionStatusCount;
  };
  topRedeemers: TopRedeemer[];
}

export interface ReferralStats {
  referredCount: number;
  rewardedCount: number;
  pendingCount: number;
  totalReferralPoints: number;
}

export interface ReferralSummary {
  referralCode: string;
  rewardPoints: number;
  pointValueFCFA: number;
  rewardValueFCFA: number;
  pendingRedemptionPoints: number;
  pendingRedemptionValueFCFA: number;
  bonusPoints: number;
  stats: ReferralStats;
  referrals: ReferralPerson[];
  rewards: ReferralReward[];
  ledger?: RewardLedgerEntry[];
  redemptions: RewardRedemption[];
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pointsRequired: number;
  stock: number;
  pickupMethod: 'PICKUP' | 'DELIVERY';
  status: 'ACTIVE' | 'INACTIVE';
  category: string;
  createdAt: string;
}

export type ProductRedemptionStatus = 'PENDING' | 'APPROVED' | 'READY_FOR_PICKUP' | 'COLLECTED' | 'REJECTED' | 'CANCELLED';

/** Populated reward item summary returned alongside a product redemption. */
export interface ProductRedemptionItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pointsRequired: number;
  stock: number;
  pickupMethod: 'PICKUP' | 'DELIVERY';
  status: 'ACTIVE' | 'INACTIVE';
  category: string;
}

export interface ProductRedemptionUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  name: string;
  rewardPoints: number;
}

export interface ProductRedemption {
  id: string;
  userId: string;
  user?: ProductRedemptionUser | null;
  status: ProductRedemptionStatus;
  requestedPoints: number;
  pointValueFCFA: number;
  requestedValueFCFA: number;
  approvedPoints: number;
  approvedValueFCFA: number;
  restoredPoints: number;
  rewardItemId: string | null;
  /** Populated item details (name, image…) when the backend joins them. */
  rewardItem?: ProductRedemptionItem | null;
  quantity: number;
  pickupMethod: string | null;
  /** Secure code minted on approval; the client presents it at pickup. */
  pickupCode: string | null;
  phoneVerification: string;
  customerRemarks: string;
  adminRemarks: string;
  rejectionReason: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
}

export interface RewardSummaryV2 {
  rewardPoints: number;
  pointValueFCFA: number;
  rewardValueFCFA: number;
  settings: {
    enabled: boolean;
    cbmPointsRate: number;
    kgPointsRate: number;
    autoAwardEnabled: boolean;
    autoAwardTriggerStatus: string;
    pointExpiryMonths: number | null;
  };
  recentLedger: RewardLedgerEntry[];
}

export interface RewardLedgerEntryV2 {
  id: string;
  userId: string;
  type: RewardLedgerType;
  pointsDelta: number;
  pointValueFCFA: number;
  valueFCFA: number;
  balanceAfter: number;
  shipmentUnit: 'CBM' | 'KG' | null;
  shipmentQuantity: number | null;
  source?: {
    type: string;
    id: string;
    reference?: string;
  };
  note: string;
  createdAt: string;
}

export interface CreateProductRedemptionPayload {
  rewardItemId: string;
  quantity: number;
  phoneVerification: string;
  customerRemarks?: string;
  idempotencyKey?: string;
}

export interface ProductRedemptionList {
  items: ProductRedemption[];
  pagination: PaginationInfo;
}

export interface RewardLedgerListV2 {
  items: RewardLedgerEntryV2[];
  pagination: PaginationInfo;
}

export interface ReferralValidation {
  valid: boolean;
  referralCode?: string;
  referrer?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
