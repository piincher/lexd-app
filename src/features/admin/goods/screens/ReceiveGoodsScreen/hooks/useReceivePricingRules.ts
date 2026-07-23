import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ShippingMode = 'AIR' | 'SEA';
type PriceMap = Partial<Record<ShippingMode, number>>;

const PRICE_KEY = '@lexd/receive_unit_prices';

const parseAmount = (value?: string) => {
  const amount = Number((value || '').replace(',', '.'));
  return Number.isFinite(amount) ? amount : 0;
};

export const useReceivePricingRules = () => {
  const [prices, setPrices] = useState<PriceMap>({});

  useEffect(() => {
    AsyncStorage.getItem(PRICE_KEY)
      .then((raw) => {
        if (raw) setPrices(JSON.parse(raw));
      })
      .catch(() => {});
  }, []);

  const rememberPrice = useCallback((mode: ShippingMode, unitPrice: number) => {
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) return;
    setPrices((current) => {
      const next = { ...current, [mode]: unitPrice };
      AsyncStorage.setItem(PRICE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const getSuggestedPrice = useCallback(
    (mode: ShippingMode) => prices[mode],
    [prices],
  );

  const getPriceWarning = useCallback((mode: ShippingMode, value?: string) => {
    const baseline = prices[mode];
    const amount = parseAmount(value);
    if (!baseline || !amount) return null;
    const delta = Math.abs(amount - baseline) / baseline;
    if (delta < 0.35) return null;
    return `Prix inhabituel: dernier ${mode === 'AIR' ? 'aérien' : 'maritime'} ${baseline.toLocaleString('fr-FR')} FCFA`;
  }, [prices]);

  const hasSuggestions = useMemo(() => Object.keys(prices).length > 0, [prices]);

  return { hasSuggestions, getSuggestedPrice, rememberPrice, getPriceWarning };
};
