/**
 * TicketRatingSection Component
 * Star rating UI for resolved/closed tickets
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

const staticStyles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  starButton: {
    margin: 0,
  },
});

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, disabled }) => {
  const { colors } = useAppTheme();

  return (
    <View style={staticStyles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          icon={star <= rating ? 'star' : 'star-outline'}
          size={32}
          iconColor={star <= rating ? '#FFB800' : colors.text.disabled}
          onPress={() => !disabled && onRatingChange(star)}
          disabled={disabled}
          style={staticStyles.starButton}
        />
      ))}
    </View>
  );
};

interface TicketRatingSectionProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
  hasRated: boolean;
  isPending: boolean;
}

export const TicketRatingSection: React.FC<TicketRatingSectionProps> = ({
  rating,
  onRatingChange,
  onSubmit,
  hasRated,
  isPending,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      marginTop: 16,
      borderRadius: 12,
    },
    title: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: colors.text.primary,
      textAlign: 'center',
    },
    subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 8,
    },
    starContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 8,
    },
    starButton: {
      margin: 0,
    },
    button: {
      marginTop: 8,
      borderRadius: 8,
    },
    thanksText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: colors.status.success,
      textAlign: 'center',
      marginTop: 8,
    },
  }), [colors]);

  if (hasRated) {
    return (
      <Card style={styles.container} mode="elevated">
        <Card.Content>
          <Text style={styles.title}>Votre évaluation</Text>
          <StarRating rating={rating} onRatingChange={() => {}} disabled />
          <Text style={styles.thanksText}>Merci pour votre retour !</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.container} mode="elevated">
      <Card.Content>
        <Text style={styles.title}>Comment s'est passée votre expérience ?</Text>
        <Text style={styles.subtitle}>Évaluez la résolution de votre problème</Text>
        <StarRating rating={rating} onRatingChange={onRatingChange} />
        <Button
          mode="contained"
          onPress={onSubmit}
          loading={isPending}
          disabled={rating === 0 || isPending}
          style={styles.button}
        >
          Envoyer l'évaluation
        </Button>
      </Card.Content>
    </Card>
  );
};
