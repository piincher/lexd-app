import React from 'react';
import { render, screen } from '@src/shared/test/utils/render';
import { NotificationTrackingPreview } from '../NotificationTrackingPreview';

describe('NotificationTrackingPreview', () => {
  it('renders next waypoint location when available', () => {
    render(
      <NotificationTrackingPreview
        data={{
          nextWaypoint: {
            location: 'Bamako',
            status: 'PENDING',
            segmentType: 'ROAD',
          },
        }}
      />
    );

    expect(screen.getByText('→ Bamako')).toBeTruthy();
  });

  it('renders final destination badge when isFinalWaypoint is true', () => {
    render(
      <NotificationTrackingPreview
        data={{
          isFinalWaypoint: true,
        }}
      />
    );

    expect(screen.getByText('🏁 Destination finale')).toBeTruthy();
  });

  it('prefers next waypoint over final destination', () => {
    render(
      <NotificationTrackingPreview
        data={{
          nextWaypoint: {
            location: 'Bamako',
            status: 'PENDING',
            segmentType: 'ROAD',
          },
          isFinalWaypoint: true,
        }}
      />
    );

    expect(screen.getByText('→ Bamako')).toBeTruthy();
    expect(screen.queryByText('🏁 Destination finale')).toBeNull();
  });

  it('returns null when no tracking data', () => {
    const { container } = render(<NotificationTrackingPreview data={{}} />);
    expect(container.children.length).toBe(0);
  });

  it('returns null when data is undefined', () => {
    const { container } = render(<NotificationTrackingPreview data={undefined} />);
    expect(container.children.length).toBe(0);
  });
});
