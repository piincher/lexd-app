import { useCallback } from 'react';
import { Linking } from 'react-native';
import Constants from 'expo-constants';
import { Theme } from '@src/constants/Theme';

export const APP_VERSION = Constants.expoConfig?.version ?? 'unknown';

export const VALUES = [
   {
      icon: 'shield-checkmark-outline' as const,
      title: 'Fiabilite',
      desc: 'Livraison securisee et ponctuelle de vos marchandises',
      get color() { return Theme.status.info; },
   },
   {
      icon: 'heart-outline' as const,
      title: 'Integrite',
      desc: 'Transparence totale dans chaque etape du processus',
      get color() { return Theme.status.error; },
   },
   {
      icon: 'flash-outline' as const,
      title: 'Efficacite',
      desc: 'Solutions logistiques optimisees pour votre business',
      get color() { return Theme.status.warning; },
   },
   {
      icon: 'people-outline' as const,
      title: 'Satisfaction',
      desc: 'Votre reussite est notre priorite absolue',
      get color() { return Theme.status.success; },
   },
];

export const STATS = [
   { value: '5+', label: "Annees d'experience" },
   { value: '3K+', label: 'Clients satisfaits' },
   { value: '50K+', label: 'Colis livres' },
   { value: '2', label: 'Pays desservis' },
];

export const SERVICES = [
   { icon: 'airplane-outline' as const, text: 'Fret aerien express' },
   { icon: 'boat-outline' as const, text: 'Fret maritime economique' },
   { icon: 'business-outline' as const, text: 'Entreposage en Chine' },
   { icon: 'document-text-outline' as const, text: 'Dedouanement' },
   { icon: 'navigate-outline' as const, text: 'Suivi en temps reel' },
   { icon: 'shield-checkmark-outline' as const, text: 'Assurance marchandises' },
];

export const useAboutUs = () => {
   const handleCall = useCallback(() => {
      Linking.openURL('tel:+8617865673053');
   }, []);

   const handleWebsite = useCallback(() => {
      Linking.openURL('https://nuvotech.tech');
   }, []);

   return { handleCall, handleWebsite };
};
