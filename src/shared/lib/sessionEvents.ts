/**
 * sessionEvents - Event bus for terminal auth failures.
 *
 * Fires when the refresh endpoint returns a code that means "this session is dead and
 * cannot be revived" — INVALID_REFRESH_TOKEN, TOKEN_REUSE_DETECTED, NEW_DEVICE_DETECTED,
 * or ACCOUNT_BLOCKED. The SessionGuard provider listens and runs the logout flow.
 *
 * A module-level `fired` flag debounces concurrent emits (e.g. many parallel API calls
 * all 401ing at once would otherwise each trigger their own logout). The flag resets
 * after a successful login OR after the SessionGuard handles the event (via
 * resetSessionEventFlag).
 */

import { DeviceEventEmitter } from 'react-native';

export const SESSION_EVENT = 'SESSION_EXPIRED';

export type SessionExpiredReason =
  | 'INVALID_REFRESH_TOKEN'
  | 'TOKEN_REUSE_DETECTED'
  | 'NEW_DEVICE_DETECTED'
  | 'ACCOUNT_BLOCKED';

export interface SessionExpiredData {
  reason: SessionExpiredReason;
}

let fired = false;

export const emitSessionExpired = (data: SessionExpiredData): void => {
  if (fired) return;
  fired = true;
  DeviceEventEmitter.emit(SESSION_EVENT, data);
};

/**
 * Reset the dedupe flag — call from SessionGuard after the logout flow completes, and
 * from the auth store after a successful login, so a future expiry can fire again.
 */
export const resetSessionEventFlag = (): void => {
  fired = false;
};

export const addSessionExpiredListener = (
  callback: (data: SessionExpiredData) => void,
) => {
  return DeviceEventEmitter.addListener(SESSION_EVENT, callback);
};
