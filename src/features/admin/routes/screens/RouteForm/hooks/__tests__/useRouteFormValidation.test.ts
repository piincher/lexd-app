import { act, renderHook } from '@testing-library/react-native';
import type { RouteFormData } from '@src/features/admin/routes/types';
import { useRouteFormValidation } from '../useRouteFormValidation';

const form = (countryCode: string): RouteFormData => ({
  name: 'Route personnalisée',
  shippingMode: 'SEA',
  origin: 'Chine (Guangzhou)',
  destination: 'Mali (Bamako)',
  shippingLine: 'MSC',
  estimatedTransitDays: '75',
  description: '',
  isActive: true,
  waypoints: [{
    order: 1,
    location: { city: 'Nouakchott', country: 'Mauritanie', countryCode },
    estimatedDaysFromStart: 30,
    description: 'Transit - Nouakchott',
    type: 'PORT',
    segmentType: 'SEA',
  }],
});

describe('useRouteFormValidation', () => {
  it('blocks a custom waypoint without an ISO country code', () => {
    const { result } = renderHook(() => useRouteFormValidation());
    let valid = true;
    act(() => { valid = result.current.validateForm(form('')); });
    expect(valid).toBe(false);
    expect(result.current.errors.waypoints).toContain("L'escale 1");
  });

  it('accepts a complete custom waypoint', () => {
    const { result } = renderHook(() => useRouteFormValidation());
    let valid = false;
    act(() => { valid = result.current.validateForm(form('MR')); });
    expect(valid).toBe(true);
    expect(result.current.errors.waypoints).toBeUndefined();
  });
});
