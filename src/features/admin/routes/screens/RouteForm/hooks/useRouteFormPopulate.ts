import { useEffect } from 'react';
import {
  ShippingLine,
  RouteFormData,
  RouteWaypointDraft,
  Route,
} from '@src/features/admin/routes/types';

interface UseRouteFormPopulateParams {
  isEditMode: boolean;
  routeData?: { data?: Route };
  setFormData: React.Dispatch<React.SetStateAction<RouteFormData>>;
}

export const useRouteFormPopulate = ({ isEditMode, routeData, setFormData }: UseRouteFormPopulateParams) => {
  useEffect(() => {
    if (isEditMode && routeData?.data) {
      const route = routeData.data;
      setFormData({
        name: route.name || '',
        shippingMode: route.shippingMode || '',
        origin: typeof route.origin === 'string' ? route.origin : route.origin?.city || '',
        destination: typeof route.destination === 'string' ? route.destination : route.destination?.city || '',
        shippingLine: (route.shippingLine as ShippingLine) || '',
        estimatedTransitDays: route.estimatedTransitDays?.toString() || '',
        waypoints: route.waypoints?.map((waypoint, index): RouteWaypointDraft => ({
          order: waypoint.order || index + 1,
          location: {
            city: waypoint.location?.city || '',
            country: waypoint.location?.country || '',
            countryCode: waypoint.location?.countryCode,
            portCode: waypoint.location?.portCode,
            coordinates: waypoint.location?.coordinates,
          },
          estimatedDaysFromStart: waypoint.estimatedDaysFromStart || 0,
          description: waypoint.description || '',
          type: waypoint.type || 'PORT',
          segmentType: waypoint.segmentType,
          terminal: waypoint.terminal,
          carrier: waypoint.carrier,
          notifyOnArrival: waypoint.notifyOnArrival ?? true,
          notifyOnDeparture: waypoint.notifyOnDeparture ?? false,
        })) || [],
        description: route.description || '',
        isActive: route.status ? route.status === 'ACTIVE' : true,
      });
    }
  }, [isEditMode, routeData, setFormData]);
};
