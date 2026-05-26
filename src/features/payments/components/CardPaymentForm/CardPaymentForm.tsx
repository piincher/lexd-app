import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { CardPaymentFormProps } from '../../types';
import { useCardPaymentForm } from '../../hooks/useCardPaymentForm';
import { SavedCardsList } from './SavedCardsList';
import { CardPreview } from './CardPreview';
import { CardNumberInputField } from './CardNumberInputField';
import { ExpiryField } from './ExpiryField';
import { CvvField } from './CvvField';
import { CardHolderField } from './CardHolderField';
import { SaveCardCheckbox } from './SaveCardCheckbox';
import { SecurityNote } from './SecurityNote';

export const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  onCardChange,
  disabled = false,
  showSavedCards = false,
  savedCards = [],
  onUseSavedCard,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    card,
    errors,
    touched,
    cardBrand,
    showCvv,
    selectedSavedCard,
    saveCard,
    setShowCvv,
    setSaveCard,
    setTouched,
    setSelectedSavedCard,
    handleNumberChange,
    handleMonthChange,
    handleYearChange,
    handleCvvChange,
    handleNameChange,
    handleSavedCardSelect,
  } = useCardPaymentForm(onCardChange, onUseSavedCard);

  const createStyles = (colors: any) => StyleSheet.create({
    container: {
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginBottom: 20,
    },
  });

  if (selectedSavedCard) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Card Payment</Text>
        {showSavedCards && (
          <SavedCardsList
            savedCards={savedCards}
            selectedSavedCard={selectedSavedCard}
            onSelectSavedCard={handleSavedCardSelect}
            onUseNewCard={() => setSelectedSavedCard(null)}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Payment</Text>

      {showSavedCards && (
        <SavedCardsList
          savedCards={savedCards}
          selectedSavedCard={selectedSavedCard}
          onSelectSavedCard={handleSavedCardSelect}
          onUseNewCard={() => setSelectedSavedCard(null)}
        />
      )}

      <CardPreview
        cardNumber={card.number}
        holderName={card.holderName}
        expiryMonth={card.expiryMonth}
        expiryYear={card.expiryYear}
      />

      <CardNumberInputField
        value={card.number}
        onChangeText={handleNumberChange}
        onBlur={() => setTouched(prev => ({ ...prev, number: true }))}
        error={errors.number}
        touched={touched.number}
        disabled={disabled}
      />

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <ExpiryField
            expiryMonth={card.expiryMonth}
            expiryYear={card.expiryYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            error={errors.expiryYear}
            disabled={disabled}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CvvField
            cvv={card.cvv}
            onChangeText={handleCvvChange}
            onBlur={() => setTouched(prev => ({ ...prev, cvv: true }))}
            error={errors.cvv}
            touched={touched.cvv}
            disabled={disabled}
            cardBrand={cardBrand}
            showCvv={showCvv}
            onToggleShowCvv={() => setShowCvv(!showCvv)}
          />
        </View>
      </View>

      <CardHolderField
        value={card.holderName}
        onChangeText={handleNameChange}
        onBlur={() => setTouched(prev => ({ ...prev, holderName: true }))}
        error={errors.holderName}
        touched={touched.holderName}
        disabled={disabled}
      />

      <SaveCardCheckbox
        checked={saveCard}
        onToggle={() => setSaveCard(!saveCard)}
        disabled={disabled}
      />

      <SecurityNote />
    </View>
  );
};

export default CardPaymentForm;
