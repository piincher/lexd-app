/**
 * usePromoAdmin - Barrel re-export for backward compatibility.
 * Hooks have been split into focused query and mutation modules.
 */

export {
  useAdminPromos,
  useAdminBanners,
  usePromoStats,
} from "./usePromoQueries";

export {
  useCreatePromo,
  useUpdatePromo,
  useDeactivatePromo,
  useClonePromo,
  useCreateBanner,
  useUpdateBanner,
  useDeactivateBanner,
} from "./usePromoMutations";
