/**
 * TestimonialCard - Customer review display
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from '../TestimonialsSection.styles';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Surface style={styles.card}>
      <View style={styles.quoteIcon}>
        <MaterialCommunityIcons name="format-quote-open" size={24} color={COLORS.blue} />
      </View>
      <Text style={[styles.content, { fontFamily: Fonts.regular }]}>
        "{testimonial.content}"
      </Text>
      <View style={styles.rating}>
        {Array.from({ length: 5 }).map((_, i) => (
          <MaterialCommunityIcons
            key={i}
            name={i < testimonial.rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
      <View style={styles.author}>
        <View style={styles.avatar}>
          <Text style={[styles.avatarText, { fontFamily: Fonts.bold }]}>
            {testimonial.name.charAt(0)}
          </Text>
        </View>
        <View>
          <Text style={[styles.name, { fontFamily: Fonts.bold }]}>{testimonial.name}</Text>
          <Text style={[styles.role, { fontFamily: Fonts.regular }]}>{testimonial.role}</Text>
        </View>
      </View>
    </Surface>
  );
};

export default TestimonialCard;
