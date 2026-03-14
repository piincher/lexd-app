/**
 * FAQSection - Expandable FAQ accordion
 * 
 * Common questions and answers
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { Fonts } from '@src/constants/Fonts';
import { FAQItem, FAQ } from './components/FAQItem';
import { styles } from './FAQSection.styles';

const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'Combien de temps prend la livraison ?',
    answer: 'Le fret aérien prend généralement 2-3 semaines, tandis que le fret maritime prend 45-60 jours selon la destination.',
  },
  {
    id: '2',
    question: 'Comment puis-je suivre mon colis ?',
    answer: 'Vous pouvez suivre votre envoi en temps réel avec votre numéro de suivi sur notre site web ou via notre application mobile.',
  },
  {
    id: '3',
    question: 'Quels sont les tarifs ?',
    answer: 'Nos tarifs dépendent du mode de transport, du poids et du volume. Contactez-nous pour un devis personnalisé.',
  },
  {
    id: '4',
    question: 'Mes marchandises sont-elles assurées ?',
    answer: 'Oui, toutes les marchandises sont assurées pendant le transport. Nous offrons une protection complète.',
  },
];

export const FAQSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: Fonts.bold }]}>Questions Fréquentes</Text>
      <View style={styles.list}>
        {FAQS.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isExpanded={expandedId === faq.id}
            onToggle={() => handleToggle(faq.id)}
          />
        ))}
      </View>
    </View>
  );
};

export default FAQSection;
