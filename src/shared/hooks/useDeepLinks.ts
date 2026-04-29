/**
 * useDeepLinks Hook
 *
 * Handles deep links that require authentication when the user is not logged in.
 * Stores pending deep links in AsyncStorage and processes them after login.
 *
 * @deprecated Prefer composing the individual sub-hooks directly.
 */

import { useDeepLinkUrlHandler } from "./deepLinks/useDeepLinkUrlHandler";
import { useDeepLinkLoginProcessor } from "./deepLinks/useDeepLinkLoginProcessor";

// Re-export parser and helpers for backward compatibility
export { parseDeepLink, type ParsedLink } from "@src/shared/lib/parseDeepLink";
export { storePendingDeepLink, getPendingDeepLink } from "./deepLinks/useDeepLinkState";
export { navigateToDeepLink } from "./deepLinks/useDeepLinkRouting";

/**
 * Hook that handles deep links requiring authentication.
 * Captures URLs when logged out, navigates when logged in.
 */
export function useDeepLinks() {
  useDeepLinkUrlHandler();
  useDeepLinkLoginProcessor();
}
