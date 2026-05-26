/**
 * SessionGuard - Listens for terminal auth events and runs the logout flow.
 *
 * Subscribes to the `SESSION_EXPIRED` event emitted by the axios refresh interceptor
 * when the backend returns a code that means the session is dead (INVALID_REFRESH_TOKEN,
 * TOKEN_REUSE_DETECTED, NEW_DEVICE_DETECTED, ACCOUNT_BLOCKED). Shows a native dialog
 * with a reason-aware message, then calls `useAuth().logOut()` which clears the local
 * auth state — AppShell will redirect to login automatically.
 *
 * Renders nothing. Mount once near the root, inside the Paper provider so Alert's
 * native dialog works.
 *
 * Form drafts that have been saved by hooks like useReceiveDraftPersistence live in
 * AsyncStorage (not EncryptedStorage), so they survive `logOut`'s storage clear and
 * the operator gets their work back on the next login.
 */

import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import {
  addSessionExpiredListener,
  resetSessionEventFlag,
  type SessionExpiredData,
  type SessionExpiredReason,
} from '@src/shared/lib/sessionEvents';
import { useAuth } from '@src/store/Auth';

const REASON_MESSAGES: Record<SessionExpiredReason, { title: string; body: string }> = {
  INVALID_REFRESH_TOKEN: {
    title: 'Session expirée',
    body: 'Veuillez vous reconnecter pour continuer.',
  },
  TOKEN_REUSE_DETECTED: {
    title: 'Session compromise',
    body: 'Pour votre sécurité, reconnectez-vous.',
  },
  NEW_DEVICE_DETECTED: {
    title: 'Nouvel appareil détecté',
    body: "Reconnectez-vous pour confirmer l'accès depuis cet appareil.",
  },
  ACCOUNT_BLOCKED: {
    title: 'Compte bloqué',
    body: 'Votre compte est bloqué. Contactez votre administrateur.',
  },
};

export const SessionGuard: React.FC = () => {
  const logOut = useAuth((s) => s.logOut);
  // Ref-based re-entry guard — if a second emit somehow slips through, the dialog
  // won't be re-shown until the current handler completes + resets.
  const handlingRef = useRef(false);

  useEffect(() => {
    const subscription = addSessionExpiredListener((data: SessionExpiredData) => {
      if (handlingRef.current) return;
      handlingRef.current = true;

      const { reason } = data;
      const msg = REASON_MESSAGES[reason] || REASON_MESSAGES.INVALID_REFRESH_TOKEN;
      console.log(`[SessionGuard] Session expired — reason=${reason}`);

      Alert.alert(
        msg.title,
        msg.body,
        [
          {
            text: 'OK',
            onPress: async () => {
              try {
                await logOut();
              } catch (err) {
                console.warn('[SessionGuard] logOut error:', err);
              } finally {
                // Allow future expiries (e.g. user re-logs in and that session also dies)
                // to fire fresh events.
                resetSessionEventFlag();
                handlingRef.current = false;
              }
            },
          },
        ],
        { cancelable: false },
      );
    });

    return () => subscription.remove();
  }, [logOut]);

  return null;
};
