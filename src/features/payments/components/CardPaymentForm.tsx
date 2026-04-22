import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { CardPaymentFormProps, CardDetails, SavedCard } from '../types';

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  onCardChange,
  disabled = false,
  showSavedCards = false,
  savedCards = [],
  onUseSavedCard,
}) => {
  const { colors } = useAppTheme();
  const [card, setCard] = useState<CardDetails>({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CardDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CardDetails, boolean>>>({});
  const [cardBrand, setCardBrand] = useState<string>('default');
  const [showCvv, setShowCvv] = useState(false);
  const [selectedSavedCard, setSelectedSavedCard] = useState<string | null>(null);
  const [saveCard, setSaveCard] = useState(false);

  // Card brand configuration with icons
  const CARD_BRAND_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
    visa: { icon: 'credit-card', color: '#1A1F71', label: 'Visa' },
    mastercard: { icon: 'credit-card', color: '#EB001B', label: 'Mastercard' },
    amex: { icon: 'credit-card', color: '#006FCF', label: 'American Express' },
    discover: { icon: 'credit-card', color: '#FF6000', label: 'Discover' },
    default: { icon: 'credit-card', color: colors.text.secondary, label: 'Card' },
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
        },
        title: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 20,
        },
        savedCardsSection: {
          marginBottom: 20,
        },
        savedCardsTitle: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
          marginBottom: 12,
        },
        savedCardItem: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.default,
          borderRadius: 12,
          padding: 12,
          marginBottom: 8,
          borderWidth: 2,
          borderColor: 'transparent',
        },
        savedCardItemSelected: {
          borderColor: colors.primary.main,
          backgroundColor: colors.primary.main + '08',
        },
        savedCardIconContainer: {
          width: 44,
          height: 44,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        savedCardInfo: {
          flex: 1,
        },
        savedCardNumber: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        savedCardExpiry: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
        useNewCardButton: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
        },
        useNewCardText: {
          marginLeft: 8,
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.primary.main,
        },
        cardPreview: {
          marginBottom: 24,
          alignItems: 'center',
        },
        cardBackground: {
          width: '100%',
          maxWidth: 320,
          aspectRatio: 1.586,
          backgroundColor: colors.primary.main,
          borderRadius: 16,
          padding: 20,
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        },
        cardChip: {
          width: 50,
          height: 35,
          backgroundColor: colors.accent.gold + '80',
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        },
        cardNumber: {
          fontSize: 22,
          fontFamily: Fonts.mono || Fonts.medium,
          color: colors.text.inverse,
          letterSpacing: 2,
        },
        cardBottom: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        },
        cardLabel: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.inverse + '80',
          textTransform: 'uppercase',
        },
        cardValue: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.inverse,
          marginTop: 4,
        },
        cardBrandIconContainer: {
          width: 50,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        },
        inputGroup: {
          marginBottom: 16,
        },
        label: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
          marginBottom: 8,
        },
        inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.default,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.neutral[200],
          paddingHorizontal: 12,
        },
        inputContainerError: {
          borderColor: colors.status.error,
        },
        input: {
          flex: 1,
          paddingVertical: 14,
          paddingHorizontal: 10,
          fontSize: 16,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        errorText: {
          marginTop: 4,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.error,
        },
        row: {
          flexDirection: 'row',
        },
        flex1: {
          flex: 1,
        },
        marginRight: {
          marginRight: 12,
        },
        expiryInput: {
          width: 50,
          textAlign: 'center',
        },
        expirySeparator: {
          fontSize: 16,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
          marginHorizontal: 8,
          alignSelf: 'center',
        },
        cvvInput: {
          textAlign: 'center',
        },
        saveCardContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 16,
        },
        checkbox: {
          width: 20,
          height: 20,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: colors.text.secondary,
          marginRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        checkboxChecked: {
          backgroundColor: colors.primary.main,
          borderColor: colors.primary.main,
        },
        saveCardText: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.primary,
        },
        securityContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.status.success + '08',
          borderRadius: 8,
          padding: 12,
        },
        securityText: {
          flex: 1,
          marginLeft: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.success,
        },
      }),
    [colors]
  );

  // Detect card brand from number
  const detectCardBrand = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return 'default';
  };

  // Validate card number using Luhn algorithm
  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleaned)) return false;

    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  // Validate expiry date
  const validateExpiry = (month: string, year: string): boolean => {
    if (!month || !year) return false;
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth < 1 || expMonth > 12) return false;
    return true;
  };

  // Validate CVV
  const validateCvv = (cvv: string, brand: string): boolean => {
    const length = brand === 'amex' ? 4 : 3;
    return new RegExp(`^\\d{${length}}$`).test(cvv);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substring(0, 19) : cleaned;
  };

  // Handle card number change
  const handleNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    const brand = detectCardBrand(formatted);
    setCardBrand(brand);
    
    const newCard = { ...card, number: formatted };
    setCard(newCard);
    validateField('number', formatted);
  };

  // Handle expiry month change
  const handleMonthChange = (value: string) => {
    let month = value.replace(/\D/g, '').substring(0, 2);
    if (month.length === 1 && parseInt(month) > 1) {
      month = '0' + month;
    }
    const newCard = { ...card, expiryMonth: month };
    setCard(newCard);
    validateField('expiryMonth', month);
  };

  // Handle expiry year change
  const handleYearChange = (value: string) => {
    const year = value.replace(/\D/g, '').substring(0, 2);
    const newCard = { ...card, expiryYear: year };
    setCard(newCard);
    validateField('expiryYear', year);
  };

  // Handle CVV change
  const handleCvvChange = (value: string) => {
    const maxLength = cardBrand === 'amex' ? 4 : 3;
    const cvv = value.replace(/\D/g, '').substring(0, maxLength);
    const newCard = { ...card, cvv };
    setCard(newCard);
    validateField('cvv', cvv);
  };

  // Handle holder name change
  const handleNameChange = (value: string) => {
    const newCard = { ...card, holderName: value.toUpperCase() };
    setCard(newCard);
    validateField('holderName', value);
  };

  // Validate single field
  const validateField = (field: keyof CardDetails, value: string) => {
    let error = '';
    switch (field) {
      case 'number':
        if (value && !validateCardNumber(value)) {
          error = 'Invalid card number';
        }
        break;
      case 'expiryMonth':
        if (value && (parseInt(value) < 1 || parseInt(value) > 12)) {
          error = 'Invalid month';
        }
        break;
      case 'expiryYear':
        if (value && !validateExpiry(card.expiryMonth, value)) {
          error = 'Card expired';
        }
        break;
      case 'cvv':
        if (value && !validateCvv(value, cardBrand)) {
          error = `CVV must be ${cardBrand === 'amex' ? 4 : 3} digits`;
        }
        break;
      case 'holderName':
        if (value && value.length < 3) {
          error = 'Name is too short';
        }
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  // Validate all fields
  const validateAll = (): boolean => {
    const validations = {
      number: validateCardNumber(card.number),
      expiryMonth: !!card.expiryMonth,
      expiryYear: validateExpiry(card.expiryMonth, card.expiryYear),
      cvv: validateCvv(card.cvv, cardBrand),
      holderName: card.holderName.length >= 3,
    };
    return Object.values(validations).every(Boolean);
  };

  // Notify parent of changes
  useEffect(() => {
    const isValid = validateAll();
    onCardChange(card, isValid);
  }, [card]);

  // Handle saved card selection
  const handleSavedCardSelect = (cardId: string) => {
    setSelectedSavedCard(cardId);
    onUseSavedCard?.(cardId);
  };

  // Render saved cards section
  const renderSavedCards = () => {
    if (!showSavedCards || savedCards.length === 0) return null;

    return (
      <View style={styles.savedCardsSection}>
        <Text style={styles.savedCardsTitle}>Saved Cards</Text>
        {savedCards.map(savedCard => (
          <TouchableOpacity
            key={savedCard.id}
            style={[
              styles.savedCardItem,
              selectedSavedCard === savedCard.id && styles.savedCardItemSelected,
            ]}
            onPress={() => handleSavedCardSelect(savedCard.id)}
          >
            <View style={[styles.savedCardIconContainer, { backgroundColor: CARD_BRAND_CONFIG[savedCard.brand]?.color || CARD_BRAND_CONFIG.default.color + '20' }]}>
              <MaterialCommunityIcons
                name="credit-card"
                size={24}
                color={CARD_BRAND_CONFIG[savedCard.brand]?.color || CARD_BRAND_CONFIG.default.color}
              />
            </View>
            <View style={styles.savedCardInfo}>
              <Text style={styles.savedCardNumber}>
                •••• •••• •••• {savedCard.last4}
              </Text>
              <Text style={styles.savedCardExpiry}>
                Expires {savedCard.expMonth.toString().padStart(2, '0')}/{savedCard.expYear}
              </Text>
            </View>
            {selectedSavedCard === savedCard.id && (
              <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary.main} />
            )}
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          style={styles.useNewCardButton}
          onPress={() => setSelectedSavedCard(null)}
        >
          <MaterialCommunityIcons name="plus-circle" size={20} color={colors.primary.main} />
          <Text style={styles.useNewCardText}>Use a different card</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // If a saved card is selected, hide the form
  if (selectedSavedCard) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Card Payment</Text>
        {renderSavedCards()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Payment</Text>
      
      {renderSavedCards()}
      
      {/* Card Preview */}
      <View style={styles.cardPreview}>
        <View style={styles.cardBackground}>
          <View style={styles.cardChip}>
            <MaterialCommunityIcons name="chip" size={32} color={colors.accent.gold} />
          </View>
          <Text style={styles.cardNumber}>
            {card.number || '•••• •••• •••• ••••'}
          </Text>
          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>
                {card.holderName || 'YOUR NAME'}
              </Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>
                {card.expiryMonth || 'MM'}/{card.expiryYear || 'YY'}
              </Text>
            </View>
            <View style={styles.cardBrandIconContainer}>
              <MaterialCommunityIcons
                name="credit-card"
                size={32}
                color={colors.text.inverse}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Card Number Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Card Number</Text>
        <View style={[
          styles.inputContainer,
          errors.number && touched.number && styles.inputContainerError,
        ]}>
          <MaterialCommunityIcons name="credit-card" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.input}
            value={card.number}
            onChangeText={handleNumberChange}
            onBlur={() => setTouched(prev => ({ ...prev, number: true }))}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={colors.text.disabled}
            keyboardType="number-pad"
            maxLength={19}
            editable={!disabled}
          />
          {card.number.length > 0 && !errors.number && (
            <MaterialCommunityIcons name="check-circle" size={20} color={colors.status.success} />
          )}
        </View>
        {errors.number && touched.number && (
          <Text style={styles.errorText}>{errors.number}</Text>
        )}
      </View>

      {/* Expiry and CVV */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.flex1, styles.marginRight]}>
          <Text style={styles.label}>Expiry Date</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.expiryInput]}
              value={card.expiryMonth}
              onChangeText={handleMonthChange}
              placeholder="MM"
              placeholderTextColor={colors.text.disabled}
              keyboardType="number-pad"
              maxLength={2}
              editable={!disabled}
            />
            <Text style={styles.expirySeparator}>/</Text>
            <TextInput
              style={[styles.input, styles.expiryInput]}
              value={card.expiryYear}
              onChangeText={handleYearChange}
              placeholder="YY"
              placeholderTextColor={colors.text.disabled}
              keyboardType="number-pad"
              maxLength={2}
              editable={!disabled}
            />
          </View>
          {errors.expiryYear && (
            <Text style={styles.errorText}>{errors.expiryYear}</Text>
          )}
        </View>

        <View style={[styles.inputGroup, styles.flex1]}>
          <Text style={styles.label}>CVV</Text>
          <View style={[
            styles.inputContainer,
            errors.cvv && touched.cvv && styles.inputContainerError,
          ]}>
            <TextInput
              style={[styles.input, styles.cvvInput]}
              value={card.cvv}
              onChangeText={handleCvvChange}
              onBlur={() => setTouched(prev => ({ ...prev, cvv: true }))}
              placeholder={cardBrand === 'amex' ? '1234' : '123'}
              placeholderTextColor={colors.text.disabled}
              keyboardType="number-pad"
              maxLength={cardBrand === 'amex' ? 4 : 3}
              secureTextEntry={!showCvv}
              editable={!disabled}
            />
            <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
              <MaterialCommunityIcons
                name={showCvv ? 'eye-off' : 'eye'}
                size={20}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          </View>
          {errors.cvv && touched.cvv && (
            <Text style={styles.errorText}>{errors.cvv}</Text>
          )}
        </View>
      </View>

      {/* Card Holder Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Card Holder Name</Text>
        <View style={[
          styles.inputContainer,
          errors.holderName && touched.holderName && styles.inputContainerError,
        ]}>
          <MaterialCommunityIcons name="account" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.input}
            value={card.holderName}
            onChangeText={handleNameChange}
            onBlur={() => setTouched(prev => ({ ...prev, holderName: true }))}
            placeholder="JOHN DOE"
            placeholderTextColor={colors.text.disabled}
            autoCapitalize="characters"
            editable={!disabled}
          />
        </View>
        {errors.holderName && touched.holderName && (
          <Text style={styles.errorText}>{errors.holderName}</Text>
        )}
      </View>

      {/* Save Card Checkbox */}
      <TouchableOpacity
        style={styles.saveCardContainer}
        onPress={() => setSaveCard(!saveCard)}
        disabled={disabled}
      >
        <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
          {saveCard && (
            <MaterialCommunityIcons name="check" size={14} color={colors.text.inverse} />
          )}
        </View>
        <Text style={styles.saveCardText}>Save card for future payments</Text>
      </TouchableOpacity>

      {/* Security Note */}
      <View style={styles.securityContainer}>
        <MaterialCommunityIcons name="shield-check" size={16} color={colors.status.success} />
        <Text style={styles.securityText}>
          Your card details are encrypted and secure. We use 256-bit SSL encryption.
        </Text>
      </View>
    </View>
  );
};

export default CardPaymentForm;
