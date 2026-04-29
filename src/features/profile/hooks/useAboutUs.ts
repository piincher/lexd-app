import { useCallback } from 'react';
import { Linking } from 'react-native';

export const APP_VERSION = '2.0.0';

export const VALUES = [
   {
      icon: 'shield-checkmark-outline' as const,
      title: 'Fiabilite',
      desc: 'Livraison securisee et ponctuelle de vos marchandises',
      color: '#3B82F6',
   },
   {
      icon: 'heart-outline' as const,
      title: 'Integrite',
      desc: 'Transparence totale dans chaque etape du processus',
      color: '#EF4444',
   },
   {
      icon: 'flash-outline' as const,
      title: 'Efficacite',
      desc: 'Solutions logistiques optimisees pour votre business',
      color: '#F59E0B',
   },
   {
      icon: 'people-outline' as const,
      title: 'Satisfaction',
      desc: 'Votre reussite est notre priorite absolue',
      color: '#10B981',
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
