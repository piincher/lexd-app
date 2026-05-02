import type {
  DemoBenefit,
  DemoClientStep,
  DemoDocument,
  DemoFaq,
  DemoNotification,
} from '../types';

export const DEMO_BENEFITS: DemoBenefit[] = [
  {
    id: 'tracking',
    title: 'Suivi clair',
    detail: 'Le client voit où se trouve son expédition et la prochaine étape.',
    icon: 'route',
  },
  {
    id: 'notifications',
    title: 'Alertes utiles',
    detail: 'Les changements importants sont envoyés par notification.',
    icon: 'bell',
  },
  {
    id: 'documents',
    title: 'Documents',
    detail: 'Les listes et détails restent accessibles depuis le compte client.',
    icon: 'file-alt',
  },
  {
    id: 'support',
    title: 'Support local',
    detail: 'Besoin d’aide ? Le client peut contacter l’équipe ChinaLink.',
    icon: 'headset',
  },
];

export const DEMO_DOCUMENTS: DemoDocument[] = [
  {
    id: 'packing-list',
    title: 'Packing list',
    detail: 'Liste des marchandises, quantités, volumes et détails utiles pour le suivi.',
    availability: 'Disponible pour les clients connectés',
    icon: 'clipboard-list',
  },
  {
    id: 'loading-list',
    title: 'Loading list',
    detail: 'Informations de chargement, consignataire, téléphone et destination.',
    availability: 'Disponible après préparation du conteneur',
    icon: 'file-invoice',
  },
  {
    id: 'invoice',
    title: 'Factures',
    detail: 'Montants, paiements, reste à payer et historique lié aux marchandises.',
    availability: 'Protégé par connexion client',
    icon: 'receipt',
  },
];

export const DEMO_NOTIFICATIONS: DemoNotification[] = [
  {
    id: 'goods-received',
    title: 'Marchandise reçue',
    detail: 'Votre colis a été reçu à l’entrepôt ChinaLink Guangzhou.',
    channel: 'Application + WhatsApp + Push',
    time: 'Exemple',
    icon: 'box-open',
  },
  {
    id: 'container-departed',
    title: 'Conteneur en route',
    detail: 'Vos 5 marchandises dans le conteneur CLX-2408 sont en transit.',
    channel: 'Notification groupée',
    time: 'Exemple',
    icon: 'ship',
  },
  {
    id: 'ready-pickup',
    title: 'Prêt pour retrait',
    detail: 'Vos marchandises sont disponibles à Bamako. Contact : +8618851725957.',
    channel: 'Application + WhatsApp + Push',
    time: 'Exemple',
    icon: 'warehouse',
  },
];

export const DEMO_CLIENT_STEPS: DemoClientStep[] = [
  {
    id: 'contact',
    title: '1. Contacter ChinaLink',
    detail: 'Un nouveau client échange avec l’équipe avant d’envoyer ses marchandises.',
    icon: 'phone-alt',
  },
  {
    id: 'register',
    title: '2. Enregistrement du numéro',
    detail: 'L’équipe crée le compte client avec le bon numéro de téléphone.',
    icon: 'user-check',
  },
  {
    id: 'receive',
    title: '3. Réception des colis',
    detail: 'Quand les colis arrivent à l’entrepôt, le client commence à les suivre.',
    icon: 'boxes',
  },
  {
    id: 'track',
    title: '4. Suivi jusqu’à Bamako',
    detail: 'Le client suit les étapes, reçoit les alertes et consulte ses documents.',
    icon: 'route',
  },
];

export const DEMO_FAQS: DemoFaq[] = [
  {
    id: 'login',
    question: 'Pourquoi je ne peux pas me connecter ?',
    answer: 'La connexion est réservée aux clients déjà enregistrés par ChinaLink. Si votre numéro n’est pas connu, contactez l’équipe.',
  },
  {
    id: 'demo-data',
    question: 'Les informations de la démo sont-elles réelles ?',
    answer: 'Non. La démo montre le fonctionnement de l’application avec des exemples, sans données client.',
  },
  {
    id: 'tracking',
    question: 'Puis-je suivre une vraie marchandise en mode démo ?',
    answer: 'Non. Le suivi réel demande une connexion sécurisée avec le numéro enregistré sur votre compte client.',
  },
];

export const GUEST_SUPPORT_PHONE = '+8618851725957';
