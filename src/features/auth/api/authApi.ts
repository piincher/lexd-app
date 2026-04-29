/**
 * Auth API - Feature-based API layer
 * Re-exports auth API functions from the legacy src/api/auth.tsx
 */
export {
	refreshAccessToken,
	register,
	sendPhoneOtp,
	verifyPhoneOtp,
	getCurrentUser,
	fetchAllUsers,
	blockUnblockUser,
	getUser,
	loginPhoneOtpApple,
	getBalance,
	createUser,
} from "@src/api/auth";
