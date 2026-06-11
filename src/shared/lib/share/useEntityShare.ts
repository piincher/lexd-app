/**
 * useEntityShare — one reusable share entry point for every admin/detail screen.
 *
 * Reconciles the two link kinds (see shareLink.ts):
 *   - INTERNAL  universal link → opens the real in-app screen for an authorized
 *     user (owning customer or admin). Works for any entity type.
 *   - PUBLIC    tokenized, read-only link (`s/:token`) minted by the backend.
 *     Only shipment entities (order / goods / container) have a safe public,
 *     unauthenticated view, so the public option is offered ONLY for those.
 *
 * Behaviour of `share()`:
 *   - Public-capable entity (shipment + a publicRef supplied) → shares the PUBLIC
 *     read-only tracking link (`s/:token`) by default. Sharing is customer-facing:
 *     the recipient (a client, or a third party tracking on their behalf) lands on
 *     the public tracking page with NO login required.
 *   - Everything else (admin-only entities) → shares the internal in-app link,
 *     which is staff/owner-gated by design.
 *
 * Staff who specifically need the internal in-app link can call `shareInternal()`.
 * The button never dead-ends: if minting a public token fails (offline / perms),
 * it falls back to the internal link.
 */
import { useCallback, useMemo } from 'react';
import { buildShareLink, shareLink } from '@src/shared/lib/shareLink';
import { useCreateShareToken } from '@src/shared/hooks/useCreateShareToken';

export type ShareEntityType =
  | 'order'
  | 'goods'
  | 'container'
  | 'invoice'
  | 'payment'
  | 'ticket'
  | 'certificate'
  | 'route'
  | 'campaign'
  | 'client';

/** Entity types the backend can mint a safe, public, read-only view for. */
const PUBLIC_CAPABLE: ReadonlySet<ShareEntityType> = new Set([
  'order',
  'goods',
  'container',
]);

export interface ShareEntityConfig {
  type: ShareEntityType;
  /** Deep-link path for the INTERNAL link (no leading slash), e.g. `admin-containers/<id>`. */
  internalPath: string;
  /** Title shown in the OS share sheet. */
  title: string;
  /** Friendly message placed above the link (defaults to `title`). */
  message?: string;
  /**
   * Public reference used to mint a public token: goodsId / order `code` /
   * `virtualContainerNumber`. Required to enable the public-link option; ignored
   * for non-shipment types.
   */
  publicRef?: string;
  /** Optional label stored on the minted share token. */
  label?: string;
  /** Days until the public link expires (omit = never). */
  publicExpiresInDays?: number;
}

export interface UseEntityShareResult {
  /** Smart entry point — chooser for shipment entities, direct internal share otherwise. */
  share: () => void;
  shareInternal: () => Promise<void>;
  sharePublic: () => Promise<void>;
  /** True while a public token is being minted (disable the button). */
  isMintingPublic: boolean;
  /** Whether a public link can be offered for this entity. */
  canPublic: boolean;
}

export const useEntityShare = (config: ShareEntityConfig): UseEntityShareResult => {
  const { mutateAsync: createShareToken, isPending } = useCreateShareToken();

  const canPublic = useMemo(
    () => PUBLIC_CAPABLE.has(config.type) && Boolean(config.publicRef),
    [config.type, config.publicRef],
  );

  const shareInternal = useCallback(async () => {
    const url = buildShareLink(config.internalPath);
    await shareLink({ message: config.message ?? config.title, url, title: config.title });
  }, [config.internalPath, config.message, config.title]);

  const sharePublic = useCallback(async () => {
    if (!canPublic) return shareInternal();
    try {
      const res = await createShareToken({
        type: config.type as 'order' | 'goods' | 'container',
        resourceReference: config.publicRef as string,
        label: config.label,
        expiresInDays: config.publicExpiresInDays,
      });
      await shareLink({ message: config.message ?? config.title, url: res.url, title: config.title });
    } catch {
      // Public mint failed — fall back so the share action never dead-ends.
      await shareInternal();
    }
  }, [canPublic, config.type, config.publicRef, config.label, config.publicExpiresInDays, config.message, config.title, createShareToken, shareInternal]);

  const share = useCallback(() => {
    // Customer-facing by default: shipments share the public no-login tracking
    // link so the recipient lands on the public tracking page. Admin-only entities
    // fall back to the internal (staff-gated) link.
    if (canPublic) {
      void sharePublic();
    } else {
      void shareInternal();
    }
  }, [canPublic, sharePublic, shareInternal]);

  return { share, shareInternal, sharePublic, isMintingPublic: isPending, canPublic };
};
