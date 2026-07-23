/**
 * useReceiveDraftPersistence - Auto-save the receive-goods form to AsyncStorage so a
 * forced logout (session expiry, app kill, etc.) doesn't lose 12+ fields of warehouse
 * intake work.
 *
 * Design:
 *  - Saves on every meaningful change (debounced 500 ms) — only if the form has at
 *    least one user-supplied field, so an empty form doesn't overwrite a real draft.
 *  - On mount, if a draft exists AND it's < 24h old AND the form is currently empty,
 *    auto-restores silently. The "form currently empty" guard prevents the restore
 *    from clobbering a user who just opened the screen to enter a NEW parcel.
 *  - The idempotency key is preserved across restores, so a retry of a partially-sent
 *    parcel still hits the backend dedupe and won't create a duplicate.
 *  - On successful save (or explicit operator clear), `clearDraft()` wipes the slot.
 *
 * Storage: plain AsyncStorage (NOT EncryptedStorage) so it survives `useAuth.logOut()`
 * which clears encrypted storage on session expiry.
 */

import { useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UseFormSetValue } from 'react-hook-form';
import type { userData } from '@src/shared/types/user';
import type { ReceiveGoodsFormData } from '../types';

const DRAFT_KEY = '@lexd/receive_draft';
const DRAFT_TTL_MS = 24 * 60 * 60 * 1000;
const SAVE_DEBOUNCE_MS = 500;

interface DraftPayload {
  savedAt: number;
  form: Partial<ReceiveGoodsFormData>;
  client: userData | null;
  photoUris: string[];
  useDimensions: boolean;
  idempotencyKey: string;
}

interface UseReceiveDraftOptions {
  watchedValues: ReceiveGoodsFormData;
  selectedClient: userData | null;
  photoUris: string[];
  useDimensions: boolean;
  idempotencyKey: string;
  setValue: UseFormSetValue<ReceiveGoodsFormData>;
  setSelectedClient: (client: userData | null) => void;
  setPhotoUris: (uris: string[]) => void;
  setUseDimensions: (use: boolean) => void;
  setIdempotencyKey: (key: string) => void;
}

const hasMeaningfulContent = (opts: UseReceiveDraftOptions): boolean => {
  const f = opts.watchedValues;
  return Boolean(
    opts.selectedClient ||
    opts.photoUris.length > 0 ||
    f.description?.trim() ||
    f.weight?.trim() ||
    f.unitPrice?.trim() ||
    f.length?.trim() ||
    f.width?.trim() ||
    f.height?.trim() ||
    f.cbm?.trim() ||
    f.expressTrackingNumber?.trim() ||
    f.exceptionNotes?.trim(),
  );
};

export const useReceiveDraftPersistence = (opts: UseReceiveDraftOptions) => {
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoredRef = useRef(false);

  // ── Auto-restore on mount ─────────────────────────────────────────────────
  useEffect(() => {
    if (restoredRef.current) return;
    // If the form is already populated when this mounts, the user is actively typing
    // something new — don't overwrite their work.
    if (hasMeaningfulContent(opts)) {
      restoredRef.current = true;
      return;
    }
    restoredRef.current = true;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(DRAFT_KEY);
        if (!raw) return;
        const draft = JSON.parse(raw) as DraftPayload;
        const age = Date.now() - (draft.savedAt || 0);
        if (age > DRAFT_TTL_MS) {
          await AsyncStorage.removeItem(DRAFT_KEY).catch(() => {});
          return;
        }
        // Restore form fields via RHF setValue (per-field, so onChange listeners fire).
        if (draft.form) {
          for (const [key, value] of Object.entries(draft.form)) {
            if (value !== undefined && value !== null) {
              opts.setValue(key as keyof ReceiveGoodsFormData, value as never, {
                shouldDirty: false,
                shouldValidate: false,
              });
            }
          }
        }
        if (draft.client) opts.setSelectedClient(draft.client);
        if (Array.isArray(draft.photoUris)) opts.setPhotoUris(draft.photoUris);
        if (typeof draft.useDimensions === 'boolean') opts.setUseDimensions(draft.useDimensions);
        // Restoring the idempotency key is critical — if the original submit reached the
        // backend but the response was lost, the retry with this same key will resolve to
        // the already-saved goods instead of creating a duplicate.
        if (draft.idempotencyKey) opts.setIdempotencyKey(draft.idempotencyKey);
        console.log('[ReceiveDraft] Draft restored');
      } catch (err) {
        console.warn('[ReceiveDraft] Restore failed:', err);
      }
    })();
    // Intentional: run once on mount. Deps would cause repeated restores.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-save on change ───────────────────────────────────────────────────
  useEffect(() => {
    // Avoid saving an empty placeholder over a real draft.
    if (!hasMeaningfulContent(opts)) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const payload: DraftPayload = {
        savedAt: Date.now(),
        form: opts.watchedValues,
        client: opts.selectedClient,
        photoUris: opts.photoUris,
        useDimensions: opts.useDimensions,
        idempotencyKey: opts.idempotencyKey,
      };
      AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(payload)).catch((err) => {
        console.warn('[ReceiveDraft] Save failed:', err);
      });
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [
    opts.watchedValues,
    opts.selectedClient,
    opts.photoUris,
    opts.useDimensions,
    opts.idempotencyKey,
    // hasMeaningfulContent reads from opts; deps above cover its inputs.
    opts, // keep stable; harmless re-run
  ]);

  // ── Clear (post-save) ─────────────────────────────────────────────────────
  const clearDraft = useCallback(async () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    await AsyncStorage.removeItem(DRAFT_KEY).catch(() => {});
  }, []);

  return { clearDraft };
};
