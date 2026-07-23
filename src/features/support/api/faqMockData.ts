/**
 * FAQ Mock Data - 17 FAQ items for testing
 * Categorized following the FAQCategory enum
 */

import { FAQItem, FAQCategory } from '../types';
import { LEXD_CONTACTS } from '@src/shared/constants/contact';

export const fetchMockFAQs = async (): Promise<FAQItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_FAQS;
};

export const MOCK_FAQS: FAQItem[] = [
  // General (3 items)
  {
    id: '1',
    question: "Quels services proposons-nous ?",
    answer: "Nous optimisons vos expéditions en prenant en charge la réception de vos colis en Chine, où nous gérons intégralement vos envois, puis leur expédition vers Bamako, assurant ainsi un acheminement rapide et sécurisé de vos marchandises.",
    category: FAQCategory.GENERAL,
    order: 1,
    isPopular: true,
  },
  {
    id: '2',
    question: "Comment puis-je contacter le service client ?",
    answer: `Vous pouvez nous contacter sur WhatsApp au ${LEXD_CONTACTS.main.displayPhone} ou utiliser la fonction de chat dans l'application en allant dans 'Centre d'assistance'.`,
    category: FAQCategory.GENERAL,
    order: 2,
    isPopular: true,
  },
  {
    id: '3',
    question: "Quels sont vos horaires d'ouverture ?",
    answer: "Nos bureaux sont ouverts du lundi au vendredi de 9h00 à 18h00, et le samedi de 9h00 à 13h00. Nous sommes fermés le dimanche et les jours fériés.",
    category: FAQCategory.GENERAL,
    order: 3,
  },

  // Shipping (4 items)
  {
    id: '4',
    question: "Quels sont nos délais de livraison ?",
    answer: "Pour les envois maritimes, le délai d'expédition est généralement compris entre 6 et 8 semaines. Pour les envois aériens, le délai d'expédition est de 2 à 3 semaines. Ces délais peuvent varier en fonction des conditions météorologiques.",
    category: FAQCategory.SHIPPING,
    order: 4,
    isPopular: true,
  },
  {
    id: '5',
    question: "Comment sont calculés les frais d'expédition ?",
    answer: "Les frais sont basés sur le poids et le volume des colis. Nous appliquons un volume minimum de 0.1 CBM, facturé même si le volume réel est inférieur. Ce minimum inclut jusqu'à 10 kg de marchandise. Si le poids dépasse 10 kg, un supplément est ajouté tous les 5 kg supplémentaires.",
    category: FAQCategory.SHIPPING,
    order: 5,
    isPopular: true,
  },
  {
    id: '6',
    question: "Quelle est la différence entre l'expédition maritime et aérienne ?",
    answer: "L'expédition maritime est plus économique mais prend plus de temps (6-8 semaines), idéale pour les gros volumes. L'expédition aérienne est plus rapide (2-3 semaines) mais plus coûteuse, recommandée pour les articles urgents ou de petite taille.",
    category: FAQCategory.SHIPPING,
    order: 6,
  },
  {
    id: '7',
    question: "Puis-je regrouper plusieurs colis en une seule expédition ?",
    answer: "Oui, nous offrons un service de consolidation qui vous permet de regrouper plusieurs colis en un seul envoi. Cela peut réduire vos coûts d'expédition. Contactez-nous pour plus de détails sur ce service.",
    category: FAQCategory.SHIPPING,
    order: 7,
  },

  // Tracking (2 items)
  {
    id: '8',
    question: "Comment puis-je suivre mes envois ?",
    answer: "Vous pouvez suivre vos envois en utilisant notre application mobile. Il vous suffit de vous connecter à votre compte pour obtenir des informations en temps réel sur l'état de votre colis.",
    category: FAQCategory.TRACKING,
    order: 8,
    isPopular: true,
  },
  {
    id: '9',
    question: "Que signifient les différents statuts de suivi ?",
    answer: "Les statuts courants incluent: 'Reçu en Chine' (nous avons votre colis), 'En transit' (votre colis est en route), 'Arrivé à destination' (votre colis est arrivé à Bamako), et 'Prêt pour retrait' (vous pouvez récupérer votre colis).",
    category: FAQCategory.TRACKING,
    order: 9,
  },

  // Payment (3 items)
  {
    id: '10',
    question: "Comment puis-je payer mes frais d'expédition ?",
    answer: "Nous acceptons actuellement les paiements en espèces et via mobile money. De plus, un moyen de paiement intégré dans notre application sera bientôt disponible, incluant Wave, Orange Money et MobiCash.",
    category: FAQCategory.PAYMENT,
    order: 10,
    isPopular: true,
  },
  {
    id: '11',
    question: "Quand dois-je payer mes frais d'expédition ?",
    answer: "Les frais d'expédition doivent être payés une fois que votre colis arrive à notre entrepôt en Chine et que nous avons calculé le poids/volume final. Vous recevrez une notification avec le montant exact à payer.",
    category: FAQCategory.PAYMENT,
    order: 11,
  },
  {
    id: '12',
    question: "Proposez-vous des remises pour les envois fréquents ?",
    answer: "Oui, nous avons un programme de fidélité pour nos clients réguliers. Plus vous expédiez avec nous, plus vous bénéficiez de tarifs préférentiels. Contactez-nous pour connaître les détails de notre programme.",
    category: FAQCategory.PAYMENT,
    order: 12,
  },

  // Customs (3 items)
  {
    id: '13',
    question: "Les prix incluent-ils les frais de douane ?",
    answer: "Oui, les frais de douane sont pris en charge par nous.",
    category: FAQCategory.CUSTOMS,
    order: 13,
    isPopular: true,
  },
  {
    id: '14',
    question: "Quels sont les objets interdits à l'expédition ?",
    answer: "Nous n'acceptons pas les produits illégaux, explosifs, batteries lithium, parfums, animaux vivants, et autres objets interdits par les lois internationales. Contactez-nous pour plus d'informations.",
    category: FAQCategory.CUSTOMS,
    order: 14,
  },
  {
    id: '15',
    question: "Y a-t-il des limites de valeur pour les importations ?",
    answer: "Oui, il existe des limites de valeur pour les importations en franchise de droits. Au-delà de ces limites, des droits de douane peuvent s'appliquer. Nous vous informerons des éventuels frais supplémentaires avant l'expédition.",
    category: FAQCategory.CUSTOMS,
    order: 15,
  },

  // Account (2 items)
  {
    id: '16',
    question: "Comment puis-je créer un compte ?",
    answer: "Vous pouvez créer un compte en téléchargeant notre application mobile et en suivant le processus d'inscription. Vous aurez besoin d'un numéro de téléphone valide pour recevoir le code de vérification.",
    category: FAQCategory.ACCOUNT,
    order: 16,
  },
  {
    id: '17',
    question: "Comment puis-je modifier mes informations personnelles ?",
    answer: "Vous pouvez modifier vos informations personnelles dans la section 'Profil' de l'application. Cliquez sur l'icône d'édition à côté des informations que vous souhaitez modifier.",
    category: FAQCategory.ACCOUNT,
    order: 17,
  },
];
