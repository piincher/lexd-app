import { useState } from "react";

export type EntityType = "goods" | "containers" | "clients";

export const useGlobalSearchEntity = () => {
  const [selectedEntity, setSelectedEntityState] = useState<EntityType>("goods");

  return { selectedEntity, setSelectedEntityState };
};
