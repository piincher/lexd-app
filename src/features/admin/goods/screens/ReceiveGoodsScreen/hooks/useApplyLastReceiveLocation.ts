import { useEffect, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ReceiveGoodsFormData } from '../types';

interface Options {
  locationLoaded: boolean;
  lastLocation: string | null;
  currentLocation: string;
  setValue: UseFormSetValue<ReceiveGoodsFormData>;
}

export const useApplyLastReceiveLocation = ({
  locationLoaded,
  lastLocation,
  currentLocation,
  setValue,
}: Options) => {
  const appliedLastLocation = useRef(false);

  useEffect(() => {
    if (appliedLastLocation.current || !locationLoaded) return;
    appliedLastLocation.current = true;
    if (lastLocation && !currentLocation) {
      setValue('location', lastLocation);
    }
  }, [locationLoaded, lastLocation, currentLocation, setValue]);
};
