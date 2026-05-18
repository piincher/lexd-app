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

export interface ReferralStats {
  referredCount: number;
  rewardedCount: number;
  pendingCount: number;
  totalReferralPoints: number;
}

export interface ReferralSummary {
  referralCode: string;
  rewardPoints: number;
  bonusPoints: number;
  stats: ReferralStats;
  referrals: ReferralPerson[];
  rewards: ReferralReward[];
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
