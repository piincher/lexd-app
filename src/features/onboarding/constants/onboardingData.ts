import { IMAGES } from "@src/constants/Images";
import { OnboardingSlide } from "../types/onboarding.types";

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    title: "Envoyez vos colis en toute simplicité",
    description:
      "Expédiez vos marchandises vers l'Afrique de l'Ouest (Mali) par voie aérienne ou maritime en quelques clics.",
    image: IMAGES.onboarding2,
  },
  {
    id: "2",
    title: "Suivi en temps réel",
    description:
      "Suivez l'emplacement et l'état de vos colis à chaque étape de leur voyage, en temps réel.",
    image: IMAGES.onboarding1,
  },
  {
    id: "3",
    title: "Notifications instantanées",
    description:
      "Recevez des alertes à chaque étape importante : expédition, arrivée, douane, livraison.",
    image: IMAGES.onboarding3,
  },
  {
    id: "4",
    title: "Livraison sécurisée",
    description:
      "Récupérez vos colis en toute sécurité grâce à notre réseau de distribution fiable.",
    image: IMAGES.onboarding4,
  },
];
