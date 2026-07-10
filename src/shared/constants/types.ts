export type userData = {
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	shippingClientId?: string;
	role: string;
	_id: string;
	avatar: {
		url: string;
		public_id: string;
	};
	blocked?: {
		isBlocked: boolean;
		blockedAt?: string;
		blockedBy?: string;
		blockedReason?: string;
		blockedType?: "MANUAL" | "AUTO_BRUTE_FORCE" | null;
		unblockInstructions?: string;
	};
	isActive?: boolean;
	deletedAt?: string | null;
	email?: string;
	balance?: number;
	rewardPoints?: number;
	rewardPointValueFCFA?: number;
	rewardValueFCFA?: number;
	pendingRedemptionPoints?: number;
	pendingRedemptionValueFCFA?: number;
	staffType?: string | null;
	pushTokens?: string[];
};

export interface userType {
	user: userData;
	token: string;
	accessToken?: string;
	refreshToken?: string;
	expiresIn?: number;
}

export interface SmsService {
	id: string;
	type: string;
	developerId: string;
	applicationId: string;
	country: string;
	offerName: string;
	availableUnits: number;
	requestedUnits: number;
	status: string;
	expirationDate: string;
	creationDate: string;
	lastUpdateDate: string;
	// Enriched fields from backend
	countryName: string;
	countryFlag: string;
	daysRemaining: number;
	totalDays: number;
	daysElapsed: number;
	progressPercentage: number;
	isExpired: boolean;
	isExpiringSoon: boolean;
	isPending: boolean;
	isActive: boolean;
	expirationDateFormatted: string;
	expirationDateShort: string;
}
