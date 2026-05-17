import { useEffect } from "react";
import { useMyBadges, useCheckBadges } from "./useBadges";

export const useProfileBadges = () => {
  const badgesQuery = useMyBadges();
  const checkBadges = useCheckBadges();

  useEffect(() => {
    checkBadges.mutate();
  }, []);

  return badgesQuery;
};
