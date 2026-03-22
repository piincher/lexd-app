import { IMAGES } from "@src/constants/Images";
import { OnboardingSlide } from "../types/onboarding.types";

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    title: "Envoyez des colis à vos proches par voie aérienne",
    description:
      "Nous vous aidons à envoyer des colis à vos proches en Afrique de l'ouest (Mali)!",
    image: IMAGES.onboarding2,
    bgColor: "#A5BBFF",
  },
  {
    id: "2",
    title: "Suivez vos colis en temps réel",
    description:
      "Nous vous permettons de suivre vos colis en temps réel et de savoir où ils se trouvent!",
    image: IMAGES.onboarding1,
    bgColor: "#DDBEFE",
  },
  {
    id: "3",
    title: "Soyez informé de l'état de vos colis en temps réel",
    description:
      "Nous vous informons de l'état de vos colis en temps réel et vous notifions de chaque étape!",
    image: IMAGES.onboarding3,
    bgColor: "#FF63ED",
  },
  {
    id: "4",
    title: "Recuperez vos colis en toute sécurité",
    description:
      "Nous vous permettons de récupérer vos colis en toute sécurité et en toute confiance!",
    image: IMAGES.onboarding4,
    bgColor: "#B98EFF",
  },
];

export const BACKGROUND_COLORS = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
