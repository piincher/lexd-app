/**
 * shareLink — one place to build shareable links and open the OS share sheet.
 *
 * Every "share" surface should route through here so links are consistent with
 * the deep-link config (see deepLinking.ts / parseDeepLink.ts). We emit
 * **universal links** (https://chinalinkexpress.com/…) rather than the custom
 * scheme: a universal link opens the app when installed and falls back to the
 * web/app-store when not, so it survives being sent to anyone.
 *
 * Two kinds of links (keep them straight):
 *  - INTERNAL  → opens an authenticated screen; only works for a logged-in,
 *    authorized user (the owning customer or an admin). Fine for team/owner shares.
 *  - PUBLIC    → an opaque, tokenized, read-only link (e.g. the shipment `s/:token`
 *    flow). Required for anyone who may not have the app or own the data.
 *    Public links are NOT built here ad-hoc — they must come from a server-minted
 *    token, so they live behind their own helper/service.
 */
import { Share, type ShareContent } from 'react-native';

/** Canonical universal-link host (matches app.json associatedDomains + .well-known). */
export const SHARE_BASE_URL = 'https://chinalinkexpress.com';

const encode = (v: string | number) => encodeURIComponent(String(v));

const toQuery = (params?: Record<string, string | number | undefined>): string => {
  if (!params) return '';
  const pairs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encode(k)}=${encode(v as string | number)}`);
  return pairs.length ? `?${pairs.join('&')}` : '';
};

/**
 * Build a universal share link from a deep-link path (no leading slash).
 * `path` mirrors the patterns in deepLinking.ts, e.g. `goods/ABC123`,
 * `admin-containers/<id>`, `order/<id>`, `tracking/<id>`.
 */
export const buildShareLink = (
  path: string,
  params?: Record<string, string | number | undefined>,
): string => {
  const clean = path.replace(/^\/+/, '');
  return `${SHARE_BASE_URL}/${clean}${toQuery(params)}`;
};

// ── Named builders, mirroring the deep-link routes ──────────────────────────

/** Customer goods detail (auth-gated to the owning customer / admin). */
export const goodsDetailLink = (goodsId: string) => buildShareLink(`goods/${goodsId}`);

/** Admin goods detail (admin-gated). */
export const adminGoodsDetailLink = (goodsId: string) => buildShareLink(`admin-goods/${goodsId}`);

/** Admin container detail (admin-gated). */
export const containerDetailLink = (containerId: string) =>
  buildShareLink(`admin-containers/${containerId}`);

/** Customer order detail (auth-gated to the owner / admin). */
export const orderDetailLink = (orderId: string) => buildShareLink(`order/${orderId}`);

/** Container tracking (auth-gated). For an external/public share use the token link. */
export const trackingLink = (containerId: string) => buildShareLink(`tracking/${containerId}`);

/** Public, no-auth shipment tracking via a server-minted token (`s/:token`). */
export const publicShipmentLink = (token: string) => buildShareLink(`s/${token}`);

// ── Share sheet ─────────────────────────────────────────────────────────────

interface ShareLinkOptions {
  /** Friendly text shown above the link. */
  message: string;
  /** The universal link to share. */
  url: string;
  /** iOS share-sheet title. */
  title?: string;
}

/**
 * Open the OS share sheet with a message + link. The link is appended to the
 * message body so it survives plain-text targets (WhatsApp, SMS) where iOS
 * would otherwise drop the separate `url` field.
 */
export const shareLink = async ({ message, url, title }: ShareLinkOptions): Promise<void> => {
  const content: ShareContent = {
    message: `${message}\n\n${url}`,
    // iOS also surfaces `url` natively for link-aware targets.
    url,
    ...(title ? { title } : {}),
  };
  await Share.share(content, title ? { dialogTitle: title } : undefined);
};
