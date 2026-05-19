import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { LocationDropdown } from './LocationDropdown';
import { COMMON_ORIGINS, COMMON_DESTINATIONS } from '@src/features/admin/routes/types';

interface LocationSelectProps {
  origin: string;
  destination: string;
  onSelectOrigin: (origin: string) => void;
  onSelectDestination: (destination: string) => void;
  originError?: string;
  destinationError?: string;
  originMenuVisible: boolean;
  setOriginMenuVisible: (visible: boolean) => void;
  destinationMenuVisible: boolean;
  setDestinationMenuVisible: (visible: boolean) => void;
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
  origin,
  destination,
  onSelectOrigin,
  onSelectDestination,
  originError,
  destinationError,
  originMenuVisible,
  setOriginMenuVisible,
  destinationMenuVisible,
  setDestinationMenuVisible,
}) => {
  return (
    <>
      <LocationDropdown
        label="Origine"
        icon="location"
        value={origin}
        options={COMMON_ORIGINS}
        onSelect={onSelectOrigin}
        error={originError}
        menuVisible={originMenuVisible}
        setMenuVisible={setOriginMenuVisible}
        placeholder="Sélectionner une origine"
      />
      <LocationDropdown
        label="Destination"
        icon="flag"
        value={destination}
        options={COMMON_DESTINATIONS}
        onSelect={onSelectDestination}
        error={destinationError}
        menuVisible={destinationMenuVisible}
        setMenuVisible={setDestinationMenuVisible}
        placeholder="Sélectionner une destination"
      />
    </>
  );
};
