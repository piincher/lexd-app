import type {
  DemoBenefit,
  DemoClientStep,
  DemoDocument,
  DemoFaq,
  DemoNotification,
  DemoQuickAction,
} from '../types';

export const DEMO_BENEFITS: DemoBenefit[] = [
  {
    id: 'tracking',
    title: 'Suivi précis',
    detail: 'Chaque étape de votre expédition est enregistrée et visible en temps réel.',
    icon: 'map-location-dot',
    color: '#3B82F6',
  },
  {
    id: 'notifications',
    title: 'Alertes intelligentes',
    detail: 'Recevez une notification à chaque changement important de statut.',
    icon: 'bell',
    color: '#8B5CF6',
  },
  {
    id: 'documents',
    title: 'Documents sécurisés',
    detail: 'Packing lists, loading lists et factures accessibles 24h/24.',
    icon: 'folder-open',
    color: '#10B981',
  },
  {
    id: 'support',
    title: 'Support humain',
    detail: 'Une équipe réactive à Guangzhou, Dakar et Bamako pour vous accompagner.',
    icon: 'headset',
    color: '#F59E0B',
  },
];

export const DEMO_DOCUMENTS: DemoDocument[] = [
  {
    id: 'packing-list',
    title: 'Packing list',
    detail: 'Liste détaillée des marchandises avec quantités, poids et volumes.',
    availability: 'Disponible pour les clients',
    icon: 'clipboard-list',
    pages: 2,
    size: '145 KB',
  },
  {
    id: 'loading-list',
    title: 'Loading list',
    detail: 'Plan de chargement du conteneur avec positions et consignataire.',
    availability: 'Après validation du chargement',
    icon: 'file-invoice',
    pages: 1,
    size: '89 KB',
  },
  {
    id: 'invoice',
    title: 'Facture détaillée',
    detail: 'Montants, paiements reçus, reste à payer et historique complet.',
    availability: 'Protégé par connexion',
    icon: 'receipt',
    pages: 3,
    size: '210 KB',
  },
];

export const DEMO_NOTIFICATIONS: DemoNotification[] = [
  {
    id: 'goods-received',
    title: 'Marchandises reçues',
    detail: 'Vos 5 colis ont été reçus et inspectés à l\'entrepôt Guangzhou.',
    channel: 'App + WhatsApp + Push',
    time: '12 avr., 09:30',
    icon: 'box-open',
    color: '#10B981',
    read: false,
  },
  {
    id: 'container-departed',
    title: 'Conteneur en route',
    detail: 'Le conteneur CLX-2408 a quitté Shenzhen. Trajet estimé : 28 jours.',
    channel: 'Notification groupée',
    time: '22 avr., 16:45',
    icon: 'ship',
    color: '#3B82F6',
    read: false,
  },
  {
    id: 'air-departed',
    title: 'Vol décollé',
    detail: 'Le vol Ethiopian Airlines ET0607 a décollé de Hong Kong.',
    channel: 'App + Push',
    time: '30 avr., 14:30',
    icon: 'plane-departure',
    color: '#8B5CF6',
    read: true,
  },
  {
    id: 'ready-pickup',
    title: 'Prêt pour retrait',
    detail: 'Vos marchandises sont disponibles au dépôt Bamako. Contact : +223 76 69 61 77.',
    channel: 'App + WhatsApp + Push',
    time: 'Exemple futur',
    icon: 'warehouse',
    color: '#F59E0B',
    read: true,
  },
];

export const DEMO_CLIENT_STEPS: DemoClientStep[] = [
  {
    id: 'contact',
    title: 'Contactez-nous',
    detail: 'Échangez avec l\'équipe ChinaLink pour définir vos besoins d\'expédition.',
    icon: 'phone',
  },
  {
    id: 'register',
    title: 'Création compte',
    detail: 'Nous créons votre compte client avec votre numéro de téléphone.',
    icon: 'user-plus',
  },
  {
    id: 'receive',
    title: 'Envoyez vos colis',
    detail: 'Faites livrer vos marchandises à notre entrepôt à Guangzhou.',
    icon: 'boxes-stacked',
  },
  {
    id: 'track',
    title: 'Suivez en direct',
    detail: 'Consultez l\'avancement, recevez les alertes et récupérez à Bamako.',
    icon: 'mobile-screen-button',
  },
];

export const DEMO_FAQS: DemoFaq[] = [
  {
    id: 'login',
    question: 'Pourquoi je ne peux pas me connecter ?',
    answer: 'La connexion est réservée aux clients enregistrés par ChinaLink. Si vous n\'avez pas encore de compte, contactez-nous via WhatsApp au +86 188 5172 5957 et nous créerons votre accès.',
  },
  {
    id: 'demo-data',
    question: 'Les informations de la démo sont-elles réelles ?',
    answer: 'Non, il s\'agit d\'exemples illustratifs. Une fois connecté, vous verrez vos vraies marchandises, conteneurs et documents avec des données actualisées en temps réel.',
  },
  {
    id: 'tracking',
    question: 'Puis-je suivre une vraie marchandise sans compte ?',
    answer: 'Non. Le suivi réel nécessite une connexion sécurisée avec le numéro enregistré sur votre compte client. Cela protège la confidentialité de vos données.',
  },
  {
    id: 'payment',
    question: 'Comment payer mes marchandises ?',
    answer: 'Les clients connectés peuvent consulter leur solde et payer par Orange Money, Wave ou carte bancaire directement dans l\'application.',
  },
];

export const DEMO_QUICK_ACTIONS: DemoQuickAction[] = [
  {
    id: 'track',
    title: 'Suivre',
    icon: 'location-arrow',
    color: '#3B82F6',
    description: 'Vos expéditions',
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: 'folder-open',
    color: '#10B981',
    description: 'Listes et factures',
  },
  {
    id: 'support',
    title: 'Support',
    icon: 'headset',
    color: '#F59E0B',
    description: 'Contactez-nous',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    icon: 'whatsapp',
    color: '#22C55E',
    description: 'Devenir client',
  },
];

export const GUEST_SUPPORT_PHONE = '+8618851725957';
