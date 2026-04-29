/**
 * User Entity API
 * Re-exports user-related API functions from feature layers.
 * TODO: Move API implementations here during full FSD migration.
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

export { searchUsers } from "@src/features/users/api/searchUsers";

export {
  fetchAllUsers as adminFetchAllUsers,
  blockUnblockUser as adminBlockUnblockUser,
  deleteUser,
  getUser as adminGetUser,
  createUser as adminCreateUser,
} from "@src/features/admin/users/api/userApi";
