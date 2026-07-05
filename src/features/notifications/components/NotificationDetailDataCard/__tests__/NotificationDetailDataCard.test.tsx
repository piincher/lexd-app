import React from 'react';
import { render, screen } from '@src/shared/test/utils/render';
import { NotificationDetailDataCard } from '../NotificationDetailDataCard';

describe('NotificationDetailDataCard', () => {
  it('renders tracking section when tracking data is present', () => {
    render(
      <NotificationDetailDataCard
        data={{
          containerId: 'container-123',
          currentStatus: 'IN_TRANSIT',
          currentLocation: 'Dakar',
          progressPercentage: 75,
          completedWaypoints: 3,
          totalWaypoints: 4,
          nextWaypoint: {
            location: 'Bamako',
            status: 'PENDING',
            estimatedArrival: '2026-05-10T08:00:00Z',
            segmentType: 'ROAD',
            transportInfo: 'Transporteur: TransAfrica | Camion: AB-123-CD',
          },
          completedWaypoint: {
            location: 'Dakar',
            status: 'COMPLETED',
            segmentType: 'SEA',
            vesselName: 'MAERSK SELETAR',
            transportInfo: 'Navire: MAERSK SELETAR',
          },
        }}
      />
    );

    expect(screen.getByText('📍 Suivi du conteneur')).toBeTruthy();
    expect(screen.getByText(/Progression : 3 \/ 4 \(75%\)/)).toBeTruthy();
    expect(screen.getByText('Statut actuel : IN_TRANSIT')).toBeTruthy();
    expect(screen.getAllByText(/Dakar/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Prochaine étape : Bamako/)).toBeTruthy();
    expect(screen.getByText(/Transporteur: TransAfrica/)).toBeTruthy();
  });

  it('does not render tracking section for non-tracking notifications', () => {
    render(
      <NotificationDetailDataCard
        data={{
          orderId: 'order-123',
        }}
      />
    );

    expect(screen.queryByText('📍 Suivi du conteneur')).toBeNull();
    expect(screen.getByText('Informations associées')).toBeTruthy();
    expect(screen.getByText('Commande')).toBeTruthy();
  });

  it('shows progress bar correctly', () => {
    render(
      <NotificationDetailDataCard
        data={{
          progressPercentage: 50,
          totalWaypoints: 4,
          completedWaypoints: 2,
        }}
      />
    );

    expect(screen.getByText(/Progression : 2 \/ 4 \(50%\)/)).toBeTruthy();
  });

  it('shows next waypoint info when available', () => {
    render(
      <NotificationDetailDataCard
        data={{
          nextWaypoint: {
            location: 'Bamako',
            status: 'PENDING',
            estimatedArrival: '2026-05-10T08:00:00Z',
            segmentType: 'ROAD',
            transportInfo: 'Transporteur: TransAfrica',
          },
        }}
      />
    );

    expect(screen.getByText(/Prochaine étape : Bamako/)).toBeTruthy();
    expect(screen.getByText(/Arrivée estimée/)).toBeTruthy();
    expect(screen.getByText(/Transporteur: TransAfrica/)).toBeTruthy();
  });

  it('hides transport details when not available', () => {
    render(
      <NotificationDetailDataCard
        data={{
          nextWaypoint: {
            location: 'Bamako',
            status: 'PENDING',
            segmentType: 'ROAD',
          },
        }}
      />
    );

    expect(screen.getByText(/Prochaine étape : Bamako/)).toBeTruthy();
    expect(screen.queryByText(/Transporteur/)).toBeNull();
  });

  it('shows final destination badge for final waypoint', () => {
    render(
      <NotificationDetailDataCard
        data={{
          isFinalWaypoint: true,
          currentStatus: 'DELIVERED',
          currentLocation: 'Bamako',
        }}
      />
    );

    expect(screen.getByText(/Destination finale atteinte/)).toBeTruthy();
  });

  it('returns null when no data is provided', () => {
    const { toJSON } = render(<NotificationDetailDataCard data={undefined} />);
    expect(toJSON()).toBeNull();
  });

  it('returns null when data has no relevant fields', () => {
    const { toJSON } = render(<NotificationDetailDataCard data={{ someRandomField: 'value' }} />);
    expect(toJSON()).toBeNull();
  });
});
