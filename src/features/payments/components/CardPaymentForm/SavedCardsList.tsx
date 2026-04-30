import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { SavedCard } from '../../types';
import { CARD_BRAND_CONFIG } from '../../hooks/useCardPaymentValidation';

interface SavedCardsListProps {
  savedCards: SavedCard[];
  selectedSavedCard: string | null;
  onSelectSavedCard: (cardId: string) => void;
  onUseNewCard: () => void;
}

export const SavedCardsList: React.FC<SavedCardsListProps> = ({
  savedCards,
  selectedSavedCard,
  onSelectSavedCard,
  onUseNewCard,
}) => {
  const { colors } = useAppTheme();

  if (savedCards.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: colors.text.secondary }]}>Saved Cards</Text>
      {savedCards.map(savedCard => (
        <TouchableOpacity
          key={savedCard.id}
          style={[
            styles.item,
            {
              backgroundColor: colors.background.default,
              borderColor: selectedSavedCard === savedCard.id ? colors.primary.main : 'transparent',
            },
            selectedSavedCard === savedCard.id && { backgroundColor: colors.primary.main + '08' },
          ]}
          onPress={() => onSelectSavedCard(savedCard.id)}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  (CARD_BRAND_CONFIG[savedCard.brand]?.color || colors.text.secondary) + '20',
              },
            ]}
          >
            <MaterialCommunityIcons
              name="credit-card"
              size={24}
              color={CARD_BRAND_CONFIG[savedCard.brand]?.color || colors.text.secondary}
            />
          </View>
          <View style={styles.info}>
            <Text style={[styles.number, { color: colors.text.primary }]}>
              •••• •••• •••• {savedCard.last4}
            </Text>
            <Text style={[styles.expiry, { color: colors.text.secondary }]}>
              Expires {savedCard.expMonth.toString().padStart(2, '0')}/{savedCard.expYear}
            </Text>
          </View>
          {selectedSavedCard === savedCard.id && (
            <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary.main} />
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.useNewButton} onPress={onUseNewCard}>
        <MaterialCommunityIcons name="plus-circle" size={20} color={colors.primary.main} />
        <Text style={[styles.useNewText, { color: colors.primary.main }]}>Use a different card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  number: {
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
  expiry: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  useNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  useNewText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
});
