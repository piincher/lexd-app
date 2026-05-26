import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface CardPreviewProps {
  cardNumber: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  cardNumber,
  holderName,
  expiryMonth,
  expiryYear,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={[styles.background, { backgroundColor: colors.primary.main }]}>
        <View style={[styles.chip, { backgroundColor: colors.accent.gold + '80' }]}>
          <MaterialCommunityIcons name="chip" size={32} color={colors.accent.gold} />
        </View>
        <Text
          style={[
            styles.number,
            { fontFamily: (Fonts as any).mono || Fonts.medium, color: colors.text.inverse },
          ]}
        >
          {cardNumber || '•••• •••• •••• ••••'}
        </Text>
        <View style={styles.bottom}>
          <View>
            <Text style={[styles.label, { color: colors.text.inverse + '80' }]}>Card Holder</Text>
            <Text style={[styles.value, { color: colors.text.inverse }]}>
              {holderName || 'YOUR NAME'}
            </Text>
          </View>
          <View>
            <Text style={[styles.label, { color: colors.text.inverse + '80' }]}>Expires</Text>
            <Text style={[styles.value, { color: colors.text.inverse }]}>
              {expiryMonth || 'MM'}/{expiryYear || 'YY'}
            </Text>
          </View>
          <View style={styles.brandContainer}>
            <MaterialCommunityIcons name="credit-card" size={32} color={colors.text.inverse} />
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  background: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 1.586,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  chip: {
    width: 50,
    height: 35,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 22,
    letterSpacing: 2,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginTop: 4,
  },
  brandContainer: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
