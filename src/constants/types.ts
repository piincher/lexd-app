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
};

export interface userType {
	user: userData;
	token: string;
	streamToken?: string;
}
