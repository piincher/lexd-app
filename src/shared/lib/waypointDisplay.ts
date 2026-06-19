/**
 * waypointDisplay
 *
 * Centralised display helpers for waypoints so the customer and admin timelines
 * show the same human-readable labels (e.g. "En route vers Diboli",
 * "Dédouanement - Frontière Sénégal-Mali") while the underlying location data
 * stays unchanged.
 */

interface WaypointLike {
  location?:
    | string
    | { city?: string; name?: string; portCode?: string; warehouse?: string }
    | null;
  segmentType?: string;
  description?: string;
  shortName?: string;
  roadDetails?: { routeDetails?: string; borderCrossing?: string } | null;
}

export const getWaypointDisplayTitle = (waypoint: WaypointLike): string => {
  if (!waypoint) return 'Inconnu';

  const rawDescription = waypoint.description || '';
  const description = rawDescription.toLowerCase();
  const routeDetails = waypoint.roadDetails?.routeDetails;

  // Customs / border clearance — show the operation and the border name.
  if (description.includes('dédouanement') || description.includes('customs')) {
    const borderMatch = rawDescription.match(/\(([^)]+)\)/);
    const border = borderMatch?.[1] || waypoint.roadDetails?.borderCrossing;
    return border ? `Dédouanement - ${border}` : 'Dédouanement';
  }

  // Road leg — show movement toward the destination so two consecutive
  // waypoints in the same city (e.g. Dakar → Diboli then Diboli customs)
  // do not look identical.
  if (waypoint.segmentType === 'ROAD' && routeDetails) {
    const stops = routeDetails.split('→').map((stop) => stop.trim());
    const destination = stops[stops.length - 1];
    const origin = stops[0];
    if (destination && origin && destination !== origin) {
      return `En route vers ${destination}`;
    }
  }

  // Fallback: preserve previous behaviour.
  const loc = waypoint.location;
  if (typeof loc === 'string') {
    return waypoint.shortName || loc || 'Inconnu';
  }
  return (
    waypoint.shortName || loc?.city || loc?.name || loc?.portCode || 'Inconnu'
  );
};
