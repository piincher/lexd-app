import React from 'react';
import { render, screen } from '@src/shared/test/utils/render';
import { ShipmentTimeline } from '../ShipmentTimeline';

describe('ShipmentTimeline', () => {
  describe('detail variant', () => {
    it('renders all nine stages', () => {
      render(<ShipmentTimeline stage="IN_TRANSIT" mode="SEA" />);
      expect(screen.getByText('Enregistré')).toBeTruthy();
      expect(screen.getByText("Reçu à l'entrepôt")).toBeTruthy();
      expect(screen.getByText('En transit')).toBeTruthy();
      expect(screen.getByText('Livré')).toBeTruthy();
    });

    it('explains only the current stage, so the live one is not buried', () => {
      render(<ShipmentTimeline stage="IN_TRANSIT" mode="SEA" />);
      expect(screen.getByText('Étape actuelle')).toBeTruthy();
      expect(screen.getByText('Votre envoi est en route vers sa destination.')).toBeTruthy();
      // A stage the shipment has already passed does not also show its hint.
      expect(
        screen.queryByText('Vos colis sont arrivés à notre entrepôt en Chine.'),
      ).toBeNull();
    });

    it('renders dates when supplied', () => {
      render(
        <ShipmentTimeline
          stage="IN_TRANSIT"
          mode="SEA"
          dates={{ IN_TRANSIT: '2026-03-14T00:00:00Z' }}
          formatDate={() => '14 MARS'}
        />,
      );
      expect(screen.getByText('14 MARS')).toBeTruthy();
    });

    it('renders with an unknown stage without crashing', () => {
      render(<ShipmentTimeline stage={null} />);
      expect(screen.getByText('Enregistré')).toBeTruthy();
      // Nothing is current, so no active marker is shown.
      expect(screen.queryByText('Étape actuelle')).toBeNull();
    });
  });

  describe('compact variant', () => {
    it('renders only the five milestones', () => {
      render(<ShipmentTimeline stage="ARRIVED" mode="AIR" variant="compact" />);
      expect(screen.getByText('Reçu')).toBeTruthy();
      expect(screen.getByText('Chargé')).toBeTruthy();
      expect(screen.getByText('Transit')).toBeTruthy();
      expect(screen.getByText('Arrivé')).toBeTruthy();
      expect(screen.getByText('Livré')).toBeTruthy();
      // Non-milestone stages are omitted at this density.
      expect(screen.queryByText('Départ')).toBeNull();
      expect(screen.queryByText('Retrait')).toBeNull();
    });

    it('does not render stage hints in compact form', () => {
      render(<ShipmentTimeline stage="IN_TRANSIT" variant="compact" />);
      expect(screen.queryByText('Étape actuelle')).toBeNull();
    });
  });

  describe('mode handling', () => {
    it('renders the same stage labels for sea and air', () => {
      // The point of unifying: mode changes iconography, not the journey.
      const sea = render(<ShipmentTimeline stage="DEPARTED" mode="SEA" />);
      const seaText = screen.getByText('Départ effectué');
      expect(seaText).toBeTruthy();
      sea.unmount();

      render(<ShipmentTimeline stage="DEPARTED" mode="AIR" />);
      expect(screen.getByText('Départ effectué')).toBeTruthy();
    });

    it('renders when mode is unknown', () => {
      render(<ShipmentTimeline stage="PREPARING" />);
      expect(screen.getByText('En préparation')).toBeTruthy();
    });
  });
});
