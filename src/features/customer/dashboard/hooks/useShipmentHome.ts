import { useMemo } from 'react';
import type { DashboardStats } from '../types';
import type { DashboardContainer } from '../api/types';

const STATUS_RANK: Record<string, number> = {
  READY_FOR_PICKUP: 0,
  DISCHARGED: 1,
  ARRIVED: 2,
  IN_TRANSIT: 3,
  LOADED_ON_VESSEL: 4,
  GATE_IN_FULL: 5,
  LOADED: 6,
  LOADING: 7,
};

const STATUS_COPY: Record<string, { label: string; detail: string; action: string }> = {
  LOADING: {
    label: 'Chargement en cours',
    detail: 'Vos marchandises sont en cours de chargement.',
    action: 'Suivre le chargement',
  },
  LOADED: {
    label: 'Container chargé',
    detail: 'Le container est chargé et part vers le port.',
    action: 'Voir les marchandises',
  },
  AIR_LOADED: {
    label: 'Prêt pour le vol',
    detail: 'Votre expédition aérienne est prête pour embarquement.',
    action: 'Suivre le vol',
  },
  GATE_IN_FULL: {
    label: 'Container au port',
    detail: 'Le container est au port et attend le bateau.',
    action: 'Voir le trajet',
  },
  LOADED_ON_VESSEL: {
    label: 'Container sur le bateau',
    detail: 'Le container est chargé à bord du navire.',
    action: 'Voir le trajet',
  },
  IN_TRANSIT: {
    label: 'En route vers Bamako',
    detail: 'Votre expédition avance vers la destination.',
    action: 'Suivre maintenant',
  },
  AIR_IN_TRANSIT: {
    label: 'Vol en cours',
    detail: "Votre expédition aérienne avance vers Bamako.",
    action: 'Suivre le vol',
  },
  ARRIVED: {
    label: 'Arrivé à destination',
    detail: 'Le container est arrivé, le retrait sera bientôt confirmé.',
    action: 'Préparer le retrait',
  },
  DISCHARGED: {
    label: 'Déchargement terminé',
    detail: 'La marchandise se prépare pour le retrait.',
    action: 'Vérifier le retrait',
  },
  READY_FOR_PICKUP: {
    label: 'Prêt pour retrait',
    detail: 'Vos marchandises peuvent être récupérées à Bamako.',
    action: 'Voir les infos retrait',
  },
};

const getRank = (container: DashboardContainer) => STATUS_RANK[container.status] ?? 99;
const getCopyKey = (shipment: DashboardContainer) => {
  const isAir = shipment.trackingType === 'AIRWAY_BILL' || shipment.shippingMode === 'AIR';
  if (isAir && shipment.status === 'LOADED') return 'AIR_LOADED';
  if (isAir && shipment.status === 'IN_TRANSIT') return 'AIR_IN_TRANSIT';
  return shipment.status;
};

export const useShipmentHome = (containers: DashboardContainer[], stats: DashboardStats) => {
  return useMemo(() => {
    const activeContainers = containers
      .filter((item) => !['DELIVERED', 'COMPLETED'].includes(item.status))
      .sort((a, b) => getRank(a) - getRank(b));

    const primary = activeContainers[0];
    const copy = primary ? STATUS_COPY[getCopyKey(primary)] || STATUS_COPY.LOADING : null;
    const goodsCount = primary?.goodsCount ?? stats.totalGoods;
    const readyCount = primary?.readyGoodsCount ?? stats.goodsByStatus.ready ?? 0;
    const goodsPreview = primary?.goodsPreview || [];

    return {
      primary,
      copy,
      activeCount: activeContainers.length,
      goodsCount,
      readyCount,
      goodsPreview,
      balanceDue: stats.balanceDue || 0,
      hasShipments: stats.totalGoods > 0 || activeContainers.length > 0,
    };
  }, [containers, stats]);
};
