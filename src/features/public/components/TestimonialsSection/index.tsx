/**
 * TestimonialsSection - Customer testimonials carousel
 * 
 * Displays customer reviews with ratings
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import { Fonts } from '@src/constants/Fonts';
import { TestimonialCard, Testimonial } from './components/TestimonialCard';
import { styles } from './TestimonialsSection.styles';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Amadou K.',
    role: 'Commerçant',
    content: 'Service impeccable ! Mes marchandises arrivent toujours à temps. Le suivi en temps réel est très pratique.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Fatima D.',
    role: 'Entrepreneuse',
    content: 'Je recommande vivement. Équipe professionnelle et tarifs compétitifs pour le fret maritime.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Moussa T.',
    role: 'Importateur',
    content: 'Excellent rapport qualité-prix. Le service client est réactif et toujours disponible.',
    rating: 4,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: Fonts.bold }]}>Ce Que Disent Nos Clients</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TestimonialsSection;
