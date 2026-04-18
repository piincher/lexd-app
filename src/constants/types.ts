export type userData = {
	firstName: string;
	lastName: string;
	phoneNumber?: string;
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
}
