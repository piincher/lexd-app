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
	blocked: boolean;
};

export interface userType {
	user: userData;
	token: string;
	streamToken?: string;
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
