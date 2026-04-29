/**
 * normalizePhotos - Safely extract photo URLs from goods data
 *
 * Handles backward compatibility for legacy data formats:
 * - `photos` as string[] (current format)
 * - `photos` as string (corrupted data)
 * - `images` as string[] (legacy format)
 * - `images` as string (legacy format)
 * - `images` as Array<{url: string}> (v1 Order format)
 *
 * Always returns a clean string[] of valid URLs.
 */

export interface PhotoNormalizeInput {
	photos?: string | string[] | unknown;
	images?: string | string[] | Array<{ url?: string; uri?: string; src?: string }> | unknown;
}

export const normalizePhotos = (input?: PhotoNormalizeInput | null): string[] => {
	if (!input) return [];

	// Handle current photos field
	if (input.photos !== undefined && input.photos !== null) {
		if (Array.isArray(input.photos)) {
			return input.photos.filter((p): p is string => typeof p === 'string' && p.length > 0);
		}
		if (typeof input.photos === 'string' && input.photos.length > 0) {
			return [input.photos];
		}
	}

	// Fallback to legacy images field
	if (input.images !== undefined && input.images !== null) {
		if (Array.isArray(input.images)) {
			return input.images
				.map((img): string | null => {
					if (typeof img === 'string') return img;
					if (img && typeof img === 'object') {
						const cast = img as { url?: string; uri?: string; src?: string };
						return cast.url || cast.uri || cast.src || null;
					}
					return null;
				})
				.filter((url): url is string => url !== null && url.length > 0);
		}
		if (typeof input.images === 'string' && input.images.length > 0) {
			return [input.images];
		}
	}

	return [];
};
