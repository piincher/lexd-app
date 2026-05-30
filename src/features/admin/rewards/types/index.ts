import type { RewardItem, ProductRedemption, RewardSettingsV2 } from '../api/adminRewardApi';

export type { RewardItem, ProductRedemption, RewardSettingsV2 };

export type RedemptionStatusFilter =
  | 'all'
  | 'PENDING'
  | 'APPROVED'
  | 'READY_FOR_PICKUP'
  | 'COLLECTED'
  | 'REJECTED'
  | 'CANCELLED';

export interface RewardItemFormData {
  name: string;
  description: string;
  pointsRequired: string;
  stock: string;
  pickupMethod: 'PICKUP' | 'DELIVERY';
  status: 'ACTIVE' | 'INACTIVE';
  imageUrl: string;
  category: string;
}

export interface PointsAdjustFormData {
  pointsDelta: string;
  reason: string;
}

export interface RewardSettingsFormData {
  enabled: boolean;
  cbmPointsRate: string;
  kgPointsRate: string;
  autoAwardEnabled: boolean;
  autoAwardTriggerStatus: string;
  pointExpiryMonths: string;
}

export interface UserSearchResult {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  rewardPoints?: number;
}
