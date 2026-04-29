import React from "react";
import { Input } from "@src/shared/ui/Input";

interface Props {
  shippingModes: string;
  goodsStatuses: string;
  destinationCountries: string;
  destinationCities: string;
  onShippingModesChange: (value: string) => void;
  onGoodsStatusesChange: (value: string) => void;
  onDestinationCountriesChange: (value: string) => void;
  onDestinationCitiesChange: (value: string) => void;
}

export const AnnouncementTargetingFields: React.FC<Props> = ({
  shippingModes,
  goodsStatuses,
  destinationCountries,
  destinationCities,
  onShippingModesChange,
  onGoodsStatusesChange,
  onDestinationCountriesChange,
  onDestinationCitiesChange,
}) => (
  <>
    <Input
      label="Modes ciblés (AIR, SEA)"
      value={shippingModes}
      onChangeText={onShippingModesChange}
      autoCapitalize="characters"
      fullWidth
    />
    <Input
      label="Statuts marchandises ciblés"
      value={goodsStatuses}
      onChangeText={onGoodsStatusesChange}
      autoCapitalize="characters"
      fullWidth
    />
    <Input
      label="Pays destination ciblés (codes, ex: ML, SN)"
      value={destinationCountries}
      onChangeText={onDestinationCountriesChange}
      autoCapitalize="characters"
      fullWidth
    />
    <Input
      label="Villes destination ciblées"
      value={destinationCities}
      onChangeText={onDestinationCitiesChange}
      fullWidth
    />
  </>
);
