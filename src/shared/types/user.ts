/**
 * Shared User Types
 * Centralized re-exports from @src/constants/types.ts
 */

import type { userData } from "@src/constants/types";

export type RegisteredUserSummary = Pick<
  userData,
  "_id" | "firstName" | "lastName" | "phoneNumber" | "shippingClientId" | "role"
> & {
  referralCode?: string;
  referredBy?: string | null;
};

export interface UserRegistrationResponse {
  success: boolean;
  message?: string;
  user: RegisteredUserSummary;
}

export type { userData, userType, SmsService } from "@src/constants/types";
