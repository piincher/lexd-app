export const SMS_CHAR_LIMIT = 160;
export const SMS_LONG_LIMIT = 320;

export type TemplateCategory = 'all' | 'expedition' | 'finance' | 'client' | 'alertes' | 'infos';

export interface Template {
  label: string;
  icon: string;
  message: string;
  category: TemplateCategory;
}

export interface CategoryTab {
  key: TemplateCategory;
  label: string;
  icon: string;
}

export const CATEGORY_TABS: CategoryTab[] = [
  { key: 'all', label: 'Tous', icon: 'grid' },
  { key: 'expedition', label: 'Expedition', icon: 'boat' },
  { key: 'finance', label: 'Finance', icon: 'wallet' },
  { key: 'client', label: 'Client', icon: 'people' },
  { key: 'alertes', label: 'Alertes', icon: 'warning' },
  { key: 'infos', label: 'Infos', icon: 'information-circle' },
];

export const TEMPLATES: Template[] = [
  // --- Expedition ---
  {
    label: 'Stockage',
    icon: 'home',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est bien arrivee dans notre entrepot en Chine. Elle sera consolidee pour le prochain envoi. Merci. ChinaLink Express',
  },
  {
    label: 'Pesage',
    icon: 'scale',
    category: 'expedition',
    message:
      'Bonjour, le pesage de votre marchandise est termine. Contactez-nous pour connaitre le poids, le volume et le montant exact. ChinaLink',
  },
  {
    label: 'Conteneur',
    icon: 'cube',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise a ete chargee dans le conteneur. Le depart est prevu prochainement. Nous vous tiendrons informe. ChinaLink',
  },
  {
    label: 'Embarquement',
    icon: 'log-in',
    category: 'expedition',
    message:
      "Bonjour, votre marchandise a ete embarquee et est en route. L'arrivee est prevue dans les prochains jours. Merci. ChinaLink Express",
  },
  {
    label: 'Depart',
    icon: 'airplane',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est en cours d\'expedition. Elle partira bientot. Preparez-vous pour la reception. Merci de votre confiance. ChinaLink',
  },
  {
    label: 'Transit',
    icon: 'swap-horizontal',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est actuellement en transit. Nous vous informerons des son arrivee a destination. Merci. ChinaLink Express',
  },
  {
    label: 'Douane',
    icon: 'shield-checkmark',
    category: 'expedition',
    message:
      "Bonjour, votre colis est en cours de dedouanement. Nous vous tiendrons informe de l'avancement. Merci de votre patience. ChinaLink",
  },
  {
    label: 'Arrivee',
    icon: 'location',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est arrivee a destination. Veuillez passer a notre entrepot pour la recuperer. Merci. ChinaLink Express',
  },
  {
    label: 'Livraison',
    icon: 'bicycle',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est en cours de livraison. Merci de rester disponible pour la reception. A bientot! ChinaLink Express',
  },
  {
    label: 'Collecte',
    icon: 'archive',
    category: 'expedition',
    message:
      'Bonjour, la collecte de votre marchandise est programmee. Notre equipe viendra recuperer vos colis. Merci de les preparer. ChinaLink',
  },
  {
    label: 'Inspection',
    icon: 'search',
    category: 'expedition',
    message:
      "Bonjour, l'inspection de votre marchandise est terminee. Tout est conforme. Elle sera expediee selon le calendrier prevu. ChinaLink",
  },
  {
    label: 'Conteneur vide',
    icon: 'cube-outline',
    category: 'expedition',
    message:
      'Bonjour, un conteneur vide a ete envoye vers l\'expediteur pour le chargement de votre marchandise. Nous vous tiendrons informe de son arrivee. ChinaLink',
  },
  {
    label: 'Conteneur recu',
    icon: 'checkmark-done-circle',
    category: 'expedition',
    message:
      'Bonjour, le conteneur vide a ete recu par l\'expediteur. Le chargement de votre marchandise va debuter prochainement. ChinaLink',
  },

  // --- Finance ---
  {
    label: 'Confirmation',
    icon: 'checkmark-circle',
    category: 'finance',
    message:
      'Bonjour, votre commande a ete confirmee et enregistree avec succes. Nous vous tiendrons informe de chaque etape. Merci. ChinaLink Express',
  },
  {
    label: 'Paiement',
    icon: 'card',
    category: 'finance',
    message:
      "Bonjour, un rappel concernant le solde de votre commande. Merci d'effectuer le paiement dans les plus brefs delais. ChinaLink Express",
  },
  {
    label: 'Tarif',
    icon: 'list',
    category: 'finance',
    message:
      'Info ChinaLink: nos tarifs ont ete mis a jour. Contactez-nous ou visitez notre bureau pour consulter la nouvelle grille tarifaire. Merci!',
  },
  {
    label: 'Document',
    icon: 'document-text',
    category: 'finance',
    message:
      'Bonjour, vos documents sont prets. Veuillez passer les recuperer a notre bureau ou contactez-nous pour plus de details. ChinaLink',
  },
  {
    label: 'Assurance',
    icon: 'umbrella',
    category: 'finance',
    message:
      'Conseil ChinaLink: protegez votre marchandise avec notre assurance transport. Contactez-nous pour les details et les tarifs. Merci!',
  },

  // --- Client ---
  {
    label: 'Bienvenue',
    icon: 'heart',
    category: 'client',
    message:
      'Bienvenue chez ChinaLink Express! Nous sommes ravis de vous compter parmi nos clients. Contactez-nous pour toute assistance. Merci!',
  },
  {
    label: 'Remerciement',
    icon: 'thumbs-up',
    category: 'client',
    message:
      "Merci d'avoir choisi ChinaLink Express! Votre satisfaction est notre priorite. N'hesitez pas a nous recommander. A bientot!",
  },
  {
    label: 'Fidelite',
    icon: 'star',
    category: 'client',
    message:
      "Cher client fidele, profitez d'une remise speciale sur votre prochain envoi avec ChinaLink Express. Contactez-nous pour en beneficier!",
  },
  {
    label: 'Promo',
    icon: 'pricetag',
    category: 'client',
    message:
      'Offre speciale ChinaLink! Profitez d\'une reduction sur vos envois ce mois-ci. Contactez-nous pour en savoir plus. Offre limitee!',
  },
  {
    label: 'Nouveau service',
    icon: 'sparkles',
    category: 'client',
    message:
      'Decouvrez notre nouveau service chez ChinaLink Express! Contactez-nous pour en savoir plus et profiter de nos offres de lancement.',
  },

  // --- Alertes ---
  {
    label: 'Retard',
    icon: 'time',
    category: 'alertes',
    message:
      "Bonjour, nous vous informons d'un retard sur votre livraison. Nous faisons le necessaire pour accelerer le processus. Merci. ChinaLink",
  },
  {
    label: 'Excuse conteneur',
    icon: 'sad',
    category: 'alertes',
    message:
      'Bonjour, nous vous prions de nous excuser pour le retard concernant votre conteneur. Nous faisons tout notre possible pour resoudre la situation au plus vite. Merci de votre comprehension. ChinaLink',
  },
  {
    label: 'Urgence',
    icon: 'alert-circle',
    category: 'alertes',
    message:
      'URGENT: Veuillez nous contacter au plus vite concernant votre commande. Un probleme necessite votre attention. Merci. ChinaLink',
  },
  {
    label: 'Reclamation',
    icon: 'chatbox-ellipses',
    category: 'alertes',
    message:
      'Bonjour, nous avons bien recu votre reclamation. Notre equipe la traite en priorite. Nous reviendrons vers vous rapidement. ChinaLink',
  },

  // --- Infos ---
  {
    label: 'Fermeture',
    icon: 'lock-closed',
    category: 'infos',
    message:
      'Info ChinaLink: nos bureaux seront fermes le jour ferie. Nous reprendrons nos activites normalement le jour suivant. Merci!',
  },
  {
    label: 'Fete',
    icon: 'gift',
    category: 'infos',
    message:
      'ChinaLink Express vous souhaite de joyeuses fetes! Que cette periode soit remplie de bonheur. Merci pour votre confiance. A bientot!',
  },
];
